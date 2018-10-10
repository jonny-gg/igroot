'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var defaultCollector = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(nextProps) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', nextProps);

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function defaultCollector(_x) {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var chain = require('ramda/src/chain');
var toReactElement = require('jsonml-to-react-element');
var exist = require('exist.js');
var NProgress = require('nprogress');
var NotFound = require('{{ themePath }}/template/NotFound');
var themeConfig = JSON.parse('{{ themeConfig | safe }}');

function calcPropsPath(dataPath, params) {
  return typeof dataPath === 'function' ? dataPath(params) : Object.keys(params).reduce(function (path, param) {
    return path.replace(':' + param, params[param]);
  }, dataPath);
}

function generateUtils(data, props) {
  var plugins = data.plugins.map(function (pluginTupple) {
    return pluginTupple[0](pluginTupple[1], props);
  });
  var converters = chain(function (plugin) {
    return plugin.converters || [];
  }, plugins);
  var utils = {
    get: exist.get,
    toReactComponent: function toReactComponent(jsonml) {
      return toReactElement(jsonml, converters);
    }
  };
  plugins.map(function (plugin) {
    return plugin.utils || {};
  }).forEach(function (u) {
    return Object.assign(utils, u);
  });
  return utils;
}

module.exports = function getRoutes(data) {
  function templateWrapper(template) {
    var dataPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var Template = require('{{ themePath }}/template' + template.replace(/^\.\/template/, ''));

    return function (nextState, callback) {
      var propsPath = calcPropsPath(dataPath, nextState.params);
      var pageData = exist.get(data.markdown, propsPath.replace(/^\//, '').split('/'));
      var utils = generateUtils(data, nextState);

      var collector = (Template.default || Template).collector || defaultCollector;
      var dynamicPropsKey = nextState.location.pathname;
      var nextProps = _extends({}, nextState, {
        themeConfig: themeConfig,
        data: data.markdown,
        picked: data.picked,
        pageData: pageData,
        utils: utils
      });
      collector(nextProps).then(function (collectedValue) {
        try {
          var Comp = Template.default || Template;
          Comp[dynamicPropsKey] = _extends({}, nextProps, collectedValue);
          callback(null, Comp);
        } catch (e) {
          console.error(e);
        }
      }).catch(function (err) {
        var Comp = NotFound.default || NotFound;
        Comp[dynamicPropsKey] = nextProps;
        callback(err === 404 ? null : err, Comp);
      });
    };
  }

  var theme = require('{{ themePath }}');
  var routes = Array.isArray(theme.routes) ? theme.routes : [theme.routes];

  function processRoutes(route) {
    if (Array.isArray(route)) {
      return route.map(processRoutes);
    }

    return Object.assign({}, route, {
      onEnter: function onEnter() {
        if (typeof document !== 'undefined') {
          NProgress.start();
        }
      },
      component: undefined,
      getComponent: templateWrapper(route.component, route.dataPath || route.path),
      indexRoute: route.indexRoute && Object.assign({}, route.indexRoute, {
        component: undefined,
        getComponent: templateWrapper(route.indexRoute.component, route.indexRoute.dataPath || route.indexRoute.path)
      }),
      childRoutes: route.childRoutes && route.childRoutes.map(processRoutes)
    });
  }

  var processedRoutes = processRoutes(routes);
  processedRoutes.push({
    path: '*',
    getComponents: templateWrapper('./template/NotFound')
  });

  return processedRoutes;
};