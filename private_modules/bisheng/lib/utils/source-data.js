'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var fs = require('fs');
var path = require('path');
var R = require('ramda');
var context = require('../context');

var _require = require('./escape-win-path'),
    escapeWinPath = _require.escapeWinPath,
    toUriPath = _require.toUriPath;

var sourceLoaderPath = path.join(__dirname, '..', 'loaders', 'source-loader');

function ensureToBeArray(maybeArray) {
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}

function shouldBeIgnore(filename) {
  var exclude = context.bishengConfig.exclude;
  return exclude && exclude.test(filename);
}

function isDirectory(filename) {
  return fs.statSync(filename).isDirectory();
}

var isValidFile = function isValidFile(transformers) {
  return function (filename) {
    return transformers.some(function (_ref) {
      var test = _ref.test;
      return eval(test).test(filename);
    });
  };
}; // eslint-disable-line no-eval

function findValidFiles(source, transformers) {
  return R.pipe(R.reject(shouldBeIgnore), R.filter(R.either(isDirectory, isValidFile(transformers))), R.chain(function (filename) {
    if (isDirectory(filename)) {
      var subFiles = fs.readdirSync(filename).map(function (subFile) {
        return path.join(filename, subFile);
      });
      return findValidFiles(subFiles, transformers);
    }
    return [filename];
  }))(source);
}

var rxSep = new RegExp('[' + escapeWinPath(path.sep) + '.]');
function getPropPath(filename, sources) {
  return sources.reduce(function (f, source) {
    return f.replace(source, '');
  }, filename.replace(new RegExp(path.extname(filename) + '$'), '')).replace(/^\.?(?:\\|\/)+/, '').split(rxSep);
}

function filesToTreeStructure(files, sources) {
  var cleanedSources = sources.map(function (source) {
    return source.replace(/^\.?(?:\\|\/)/, '');
  });
  var filesTree = files.reduce(function (filesTree, filename) {
    var propLens = R.lensPath(getPropPath(filename, cleanedSources));
    return R.set(propLens, filename, filesTree);
  }, {});
  return filesTree;
}

function stringifyObject(_ref2) {
  var nodePath = _ref2.nodePath,
      nodeValue = _ref2.nodeValue,
      depth = _ref2.depth,
      rest = _objectWithoutProperties(_ref2, ['nodePath', 'nodeValue', 'depth']);

  var indent = '  '.repeat(depth);
  var kvStrings = R.pipe(R.toPairs,
  /* eslint-disable no-use-before-define */
  R.map(function (kv) {
    var valueString = stringify(_extends({}, rest, {
      nodePath: nodePath + '/' + kv[0],
      nodeValue: kv[1],
      depth: depth + 1
    }));
    return indent + '  \'' + kv[0] + '\': ' + valueString + ',';
  })
  /* eslint-enable no-use-before-define */
  )(nodeValue);
  return kvStrings.join('\n');
}

function lazyLoadWrapper(_ref3) {
  var filePath = _ref3.filePath,
      filename = _ref3.filename,
      isLazyLoadWrapper = _ref3.isLazyLoadWrapper;

  var isSSR = context.isSSR;
  var loaderString = isLazyLoadWrapper ? '' : sourceLoaderPath + '!';
  return '' + ('function () {\n' + '  return new Promise(function (resolve) {\n') + (isSSR ? '' : '    require.ensure([], function (require) {\n') + '      resolve(require(\'' + escapeWinPath(loaderString) + escapeWinPath(filePath) + '\'));\n' + (isSSR ? '' : '    }, \'' + toUriPath(filename) + '\');\n') + '  });\n' + '}';
}

function shouldLazyLoad(nodePath, nodeValue, lazyLoad) {
  if (typeof lazyLoad === 'function') {
    return lazyLoad(nodePath, nodeValue);
  }

  return (typeof nodeValue === 'undefined' ? 'undefined' : _typeof(nodeValue)) === 'object' ? false : lazyLoad;
}

function stringify(params) {
  var _params$nodePath = params.nodePath,
      nodePath = _params$nodePath === undefined ? '/' : _params$nodePath,
      nodeValue = params.nodeValue,
      lazyLoad = params.lazyLoad,
      _params$depth = params.depth,
      depth = _params$depth === undefined ? 0 : _params$depth;

  var indent = '  '.repeat(depth);
  var shouldBeLazy = shouldLazyLoad(nodePath, nodeValue, lazyLoad);
  return R.cond([[function (n) {
    return (typeof n === 'undefined' ? 'undefined' : _typeof(n)) === 'object';
  }, function (obj) {
    if (shouldBeLazy) {
      var filePath = path.join(__dirname, '..', '..', 'tmp', nodePath.replace(/^\/+/, '').replace(/\//g, '-')) + '.' + context.bishengConfig.entryName + '.js';
      var fileInnerContent = stringifyObject(_extends({}, params, {
        nodeValue: obj,
        lazyLoad: false,
        depth: 1
      }));
      var fileContent = 'module.exports = {\n' + fileInnerContent + '\n}';
      fs.writeFileSync(filePath, fileContent);
      return lazyLoadWrapper({
        filePath: filePath,
        filename: nodePath.replace(/^\/+/, ''),
        isLazyLoadWrapper: true
      });
    }
    var objectKVString = stringifyObject(_extends({}, params, {
      nodePath: nodePath, // fix: generated file name
      depth: depth, // fix: indentation
      nodeValue: obj
    }));
    return '{\n' + objectKVString + '\n' + indent + '}';
  }], [R.T, function (filename) {
    var filePath = path.isAbsolute(filename) ? filename : path.join(process.cwd(), filename);
    if (shouldBeLazy) {
      return lazyLoadWrapper({ filePath: filePath, filename: filename });
    }
    return 'require(\'' + escapeWinPath(sourceLoaderPath) + '!' + escapeWinPath(filePath) + '\')';
  }]])(nodeValue);
}

exports.generate = function generate(source) {
  var transformers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (source === null || source === undefined) {
    return {}; // For motion.ant.design, it doesn't need source sometimes.
  }
  if (R.is(Object, source) && !Array.isArray(source)) {
    return R.mapObjIndexed(function (value) {
      return generate(value, transformers);
    }, source);
  }
  var sources = ensureToBeArray(source);
  var validFiles = findValidFiles(sources, transformers);
  var filesTree = filesToTreeStructure(validFiles, sources);
  return filesTree;
};

exports.stringify = function (filesTree) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (/* { lazyLoad } */
    stringify(_extends({ nodeValue: filesTree }, options))
  );
};

exports.traverse = function traverse(filesTree, fn) {
  Object.keys(filesTree).forEach(function (key) {
    var value = filesTree[key];
    if (typeof value === 'string') {
      fn(value);
      return;
    }

    traverse(value, fn);
  });
};

// `.process` will be use in child process, so it cannot use `context`
exports.process = function (filename, fileContent, plugins) /* 'undefined' | true */
{
  var transformers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isBuild = arguments[4];

  // Mock Array.prototype.find(fn)
  var transformerIndex = -1;
  transformers.some(function (_ref4, index) {
    var test = _ref4.test;

    transformerIndex = index;
    return eval(test).test(filename); // eslint-disable-line no-eval
  });
  var transformer = transformers[transformerIndex];

  var markdown = require(transformer.use)(filename, fileContent);
  var parsedMarkdown = plugins.reduce(function (markdownData, plugin) {
    return require(plugin[0])(markdownData, plugin[1], isBuild === true);
  }, markdown);
  return parsedMarkdown;
};