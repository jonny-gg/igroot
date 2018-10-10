'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('babel-polyfill');

var React = require('react');
var ReactDOMServer = require('react-dom/server');
var ReactRouter = require('react-router');
var createElement = require('../lib/utils/create-element');
var data = require('../lib/utils/ssr-data.js');
var routes = require('{{ routesPath }}')(data);

module.exports = function ssr(url, callback) {
  ReactRouter.match({ routes: routes, location: url }, function (error, redirectLocation, renderProps) {
    if (error) {
      callback('');
    } else if (redirectLocation) {
      callback(''); // TODO
    } else if (renderProps) {
      var content = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, _extends({}, renderProps, { createElement: createElement })));
      callback(content);
    } else {
      callback(''); // TODO
    }
  });
};