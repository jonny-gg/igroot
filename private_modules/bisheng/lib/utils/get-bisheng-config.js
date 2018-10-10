'use strict';

var fs = require('fs');
var path = require('path');
var resolve = require('resolve');

var markdownTransformer = path.join(__dirname, '..', 'transformers', 'markdown');

var defaultConfig = {
  port: 8000,
  source: './posts',
  output: './_site',
  theme: './_theme',
  htmlTemplate: path.join(__dirname, '../template.html'),
  transformers: [],
  doraConfig: {},
  webpackConfig: function webpackConfig(config) {
    return config;
  },


  entryName: 'index',
  root: '/',
  filePathMapper: function filePathMapper(filePath) {
    return filePath;
  }
};

module.exports = function getBishengConfig(configFile) {
  var customizedConfig = fs.existsSync(configFile) ? require(configFile) : {};
  var config = Object.assign({}, defaultConfig, customizedConfig);
  config.theme = resolve.sync(config.theme, { basedir: process.cwd() });
  config.transformers = config.transformers.concat({
    test: /\.md$/,
    use: markdownTransformer
  }).map(function (_ref) {
    var test = _ref.test,
        use = _ref.use;
    return {
      test: test.toString(), // Hack, for we cannot send RegExp to child process
      use: use
    };
  });
  return config;
};