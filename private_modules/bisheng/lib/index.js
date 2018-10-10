'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fs = require('fs');
var path = require('path');

var _require = require('./utils/escape-win-path'),
    escapeWinPath = _require.escapeWinPath;

var mkdirp = require('mkdirp');
var nunjucks = require('nunjucks');
var dora = require('dora');
var webpack = require('atool-build/lib/webpack');
var getWebpackCommonConfig = require('atool-build/lib/getWebpackCommonConfig');
var R = require('ramda');
var ghPages = require('gh-pages');
var getBishengConfig = require('./utils/get-bisheng-config');
var sourceData = require('./utils/source-data');
var generateFilesPath = require('./utils/generate-files-path');
var updateWebpackConfig = require('./utils/update-webpack-config');
var context = require('./context');

var entryTemplate = fs.readFileSync(path.join(__dirname, 'entry.nunjucks.js')).toString();
var routesTemplate = fs.readFileSync(path.join(__dirname, 'routes.nunjucks.js')).toString();
var tmpDirPath = path.join(__dirname, '..', 'tmp');
mkdirp.sync(tmpDirPath);

function getRoutesPath(configPath, themePath, configEntryName) {
  var routesPath = path.join(tmpDirPath, 'routes.' + configEntryName + '.js');
  var themeConfig = require(escapeWinPath(configPath)).themeConfig || {};
  fs.writeFileSync(routesPath, nunjucks.renderString(routesTemplate, {
    themeConfig: JSON.stringify(themeConfig),
    themePath: escapeWinPath(themePath)
  }));
  return routesPath;
}

function generateEntryFile(configPath, configTheme, configEntryName, root) {
  var entryPath = path.join(tmpDirPath, 'entry.' + configEntryName + '.js');
  var routesPath = getRoutesPath(configPath, path.dirname(configTheme), configEntryName);
  fs.writeFileSync(entryPath, nunjucks.renderString(entryTemplate, {
    routesPath: escapeWinPath(routesPath),
    root: escapeWinPath(root)
  }));
}

exports.start = function start(program) {
  var configFile = path.join(process.cwd(), program.config || 'bisheng.config.js');
  var bishengConfig = getBishengConfig(configFile);
  context.initialize({ bishengConfig: bishengConfig });
  mkdirp.sync(bishengConfig.output);

  var template = fs.readFileSync(bishengConfig.htmlTemplate).toString();
  var templateData = Object.assign({ root: '/' }, bishengConfig.htmlTemplateExtraData || {});
  var templatePath = path.join(process.cwd(), bishengConfig.output, 'index.html');
  fs.writeFileSync(templatePath, nunjucks.renderString(template, templateData));

  generateEntryFile(configFile, bishengConfig.theme, bishengConfig.entryName, '/');

  var doraConfig = Object.assign({}, {
    cwd: path.join(process.cwd(), bishengConfig.output),
    port: bishengConfig.port
  }, bishengConfig.doraConfig);
  doraConfig.plugins = [[require.resolve('dora-plugin-webpack'), {
    disableNpmInstall: true,
    cwd: process.cwd(),
    config: 'bisheng-inexistent.config.js'
  }], path.join(__dirname, 'dora-plugin-bisheng'), require.resolve('dora-plugin-browser-history')];
  var usersDoraPlugin = bishengConfig.doraConfig.plugins || [];
  doraConfig.plugins = doraConfig.plugins.concat(usersDoraPlugin);

  if (program.livereload) {
    doraConfig.plugins.push(require.resolve('dora-plugin-livereload'));
  }
  dora(doraConfig);
};

var ssrTemplate = fs.readFileSync(path.join(__dirname, 'ssr.nunjucks.js')).toString();

function filenameToUrl(filename) {
  if (filename.endsWith('index.html')) {
    return filename.replace(/index\.html$/, '');
  }
  return filename.replace(/\.html$/, '');
}
exports.build = function build(program, callback) {
  var configFile = path.join(process.cwd(), program.config || 'bisheng.config.js');
  var bishengConfig = getBishengConfig(configFile);
  context.initialize({
    bishengConfig: bishengConfig,
    isBuild: true
  });
  mkdirp.sync(bishengConfig.output);

  var entryName = bishengConfig.entryName;
  generateEntryFile(configFile, bishengConfig.theme, entryName, bishengConfig.root);
  var webpackConfig = updateWebpackConfig(getWebpackCommonConfig({ cwd: process.cwd() }));
  webpackConfig.UglifyJsPluginConfig = {
    output: {
      ascii_only: true
    },
    compress: {
      warnings: false
    }
  };
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin(webpackConfig.UglifyJsPluginConfig));
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  }));

  var ssrWebpackConfig = Object.assign({}, webpackConfig);
  var ssrPath = path.join(tmpDirPath, 'ssr.' + entryName + '.js');
  var routesPath = getRoutesPath(configFile, path.dirname(bishengConfig.theme), entryName);
  fs.writeFileSync(ssrPath, nunjucks.renderString(ssrTemplate, { routesPath: routesPath }));

  ssrWebpackConfig.entry = _defineProperty({}, entryName + '-ssr', ssrPath);
  ssrWebpackConfig.target = 'node';
  ssrWebpackConfig.output = Object.assign({}, ssrWebpackConfig.output, {
    path: tmpDirPath,
    library: 'ssr',
    libraryTarget: 'commonjs'
  });
  ssrWebpackConfig.plugins = ssrWebpackConfig.plugins.filter(function (plugin) {
    return !(plugin instanceof webpack.optimize.CommonsChunkPlugin);
  });

  webpack(webpackConfig, function (err, stats) {
    if (err !== null) {
      return console.error(err);
    }

    if (stats.hasErrors()) {
      console.log(stats.toString('errors-only'));
      return;
    }

    var markdown = sourceData.generate(bishengConfig.source, bishengConfig.transformers);
    var themeConfig = require(bishengConfig.theme);
    var filesNeedCreated = generateFilesPath(themeConfig.routes, markdown).map(bishengConfig.filePathMapper);
    filesNeedCreated = R.unnest(filesNeedCreated);

    var template = fs.readFileSync(bishengConfig.htmlTemplate).toString();

    if (!program.ssr) {
      require('./loaders/common/boss').jobDone();
      var templateData = Object.assign({ root: bishengConfig.root }, bishengConfig.htmlTemplateExtraData || {});
      var fileContent = nunjucks.renderString(template, templateData);
      filesNeedCreated.forEach(function (file) {
        var output = path.join(bishengConfig.output, file);
        mkdirp.sync(path.dirname(output));
        fs.writeFileSync(output, fileContent);
        console.log('Created: ', output);
      });

      if (callback) {
        callback();
      }
      return;
    }

    context.turnOnSSRFlag();
    // If we can build webpackConfig without errors, we can build ssrWebpackConfig without errors.
    // Because ssrWebpackConfig are just part of webpackConfig.
    webpack(ssrWebpackConfig, function () {
      require('./loaders/common/boss').jobDone();

      var ssr = require(path.join(tmpDirPath, entryName + '-ssr')).ssr;
      var fileCreatedPromises = filesNeedCreated.map(function (file) {
        var output = path.join(bishengConfig.output, file);
        mkdirp.sync(path.dirname(output));
        return new Promise(function (resolve) {
          ssr(filenameToUrl(file), function (content) {
            var templateData = Object.assign({ root: bishengConfig.root, content: content }, bishengConfig.htmlTemplateExtraData || {});
            var fileContent = nunjucks.renderString(template, templateData);
            fs.writeFileSync(output, fileContent);
            console.log('Created: ', output);
            resolve();
          });
        });
      });
      Promise.all(fileCreatedPromises).then(function () {
        if (callback) {
          callback();
        }
      });
    });
  });
};

function pushToGhPages(basePath, config) {
  var options = _extends({}, config, {
    depth: 1,
    logger: function logger(message) {
      console.log(message);
    }
  });
  if (process.env.RUN_ENV_USER) {
    options.user = {
      name: process.env.RUN_ENV_USER,
      email: process.env.RUN_ENV_EMAIL
    };
  }
  ghPages.publish(basePath, options, function (err) {
    if (err) {
      throw err;
    }
    console.log('Site has been published!');
  });
}
exports.deploy = function deploy(program) {
  var config = {
    remote: program.remote,
    branch: program.branch
  };
  if (program.pushOnly) {
    var output = typeof program.pushOnly === 'string' ? program.pushOnly : './_site';
    var basePath = path.join(process.cwd(), output);
    pushToGhPages(basePath, config);
  } else {
    var configFile = path.join(process.cwd(), program.config || 'bisheng.config.js');
    var bishengConfig = getBishengConfig(configFile);
    var _basePath = path.join(process.cwd(), bishengConfig.output);
    exports.build(program, function () {
      return pushToGhPages(_basePath, config);
    });
  }
};