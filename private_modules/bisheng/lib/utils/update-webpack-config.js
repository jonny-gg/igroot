'use strict';

var path = require('path');
var webpack = require('atool-build/lib/webpack');
var context = require('../context');

var bishengLib = path.join(__dirname, '..');
var bishengLibLoaders = path.join(bishengLib, 'loaders');

module.exports = function updateWebpackConfig(webpackConfig) {
  var bishengConfig = context.bishengConfig;

  /* eslint-disable no-param-reassign */
  webpackConfig.entry = {};
  if (context.isBuild) {
    webpackConfig.output.path = bishengConfig.output;
  }
  webpackConfig.output.publicPath = context.isBuild ? bishengConfig.root : '/';
  webpackConfig.module.loaders.push({
    test: function test(filename) {
      return filename === path.join(bishengLib, 'utils', 'data.js') || filename === path.join(bishengLib, 'utils', 'ssr-data.js');
    },

    loader: path.join(bishengLibLoaders, 'bisheng-data-loader')
  });
  /* eslint-enable no-param-reassign */

  var customizedWebpackConfig = bishengConfig.webpackConfig(webpackConfig, webpack);

  var entryPath = path.join(bishengLib, '..', 'tmp', 'entry.' + bishengConfig.entryName + '.js');
  if (customizedWebpackConfig.entry[bishengConfig.entryName]) {
    throw new Error('Should not set `webpackConfig.entry.' + bishengConfig.entryName + '`!');
  }
  customizedWebpackConfig.entry[bishengConfig.entryName] = entryPath;
  return customizedWebpackConfig;
};