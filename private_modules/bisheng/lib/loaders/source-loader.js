'use strict';

var path = require('path');
var loaderUtils = require('loader-utils');
var getThemeConfig = require('../utils/get-theme-config');
var resolvePlugins = require('../utils/resolve-plugins');
var context = require('../context');
var boss = require('./common/boss');

module.exports = function sourceLoader(content) {
  if (this.cacheable) {
    this.cacheable();
  }
  var webpackRemainingChain = loaderUtils.getRemainingRequest(this).split('!');
  var fullPath = webpackRemainingChain[webpackRemainingChain.length - 1];
  var filename = path.relative(process.cwd(), fullPath);

  var bishengConfig = context.bishengConfig;
  var themeConfig = getThemeConfig(bishengConfig.theme);
  var plugins = resolvePlugins(themeConfig.plugins, 'node');

  var _callback = this.async();
  boss.queue({
    filename: filename,
    content: content,
    plugins: plugins,
    transformers: bishengConfig.transformers,
    isBuild: context.isBuild,
    callback: function callback(err, result) {
      _callback(err, 'module.exports = ' + result + ';');
    }
  });
};