const path = require('path');
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;

const isDev = process.env.NODE_ENV === 'development';
const usePreact = process.env.REACT_ENV === 'preact';

module.exports = {
  port: 8001,
  source: {
    components: './components',
    docs: './docs',
    // businessComps: './business_components'
  },
  theme: './site/theme',
  htmlTemplate: './site/theme/static/template.html',
  themeConfig: {
    categoryOrder: {
      设计原则: 2,
      Principles: 2,
    },
    typeOrder: {
      General: 0,
      Layout: 1,
      Navigation: 2,
      'Data Entry': 3,
      'Data Display': 4,
      Feedback: 5,
      Localization: 6,
      Other: 7,
    },
    docVersions: {
      
    },
  },
  filePathMapper(filePath) {
    if (filePath === '/index.html') {
      return ['/index.html', '/index-cn.html'];
    }
    if (filePath.endsWith('/index.html')) {
      return [filePath, filePath.replace(/\/index\.html$/, '-cn/index.html')];
    }
    if (filePath !== '/404.html' && filePath !== '/index-cn.html') {
      return [filePath, filePath.replace(/\.html$/, '-cn.html')];
    }
    return filePath;
  },
  doraConfig: {
    verbose: true,
    plugins: ['dora-plugin-upload'],
  },
  webpackConfig(config) {
    config.resolve.alias = {
      'igroot/lib': path.join(process.cwd(), 'components'),
      igroot: path.join(process.cwd(), 'index'),
      site: path.join(process.cwd(), 'site'),
      'react-router': 'react-router/umd/ReactRouter',
    };

    config.externals = {
      'react-router-dom': 'ReactRouterDOM',
    };

    if (usePreact) {
      config.resolve.alias = Object.assign({}, config.resolve.alias, {
        react: 'preact-compat',
        'react-dom': 'preact-compat',
        'create-react-class': 'preact-compat/lib/create-react-class',
        'react-router': 'react-router',
      });
    } else if (isDev) {
      config.externals = Object.assign({}, config.externals, {
        react: 'React',
        'react-dom': 'ReactDOM',
      });
    }

    config.babel.plugins.push([
      require.resolve('babel-plugin-transform-runtime'),
      {
        polyfill: false,
        regenerator: true,
      },
    ]);

    config.plugins.push(new CSSSplitWebpackPlugin({ size: 4000 }));

    return config;
  },

  htmlTemplateExtraData: {
    isDev,
    usePreact,
  },
};
