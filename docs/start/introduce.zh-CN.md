---
order: 4
title: 快速上手
---
> 天下武功唯快不破

我们的环境已经准备ok，我们就可以快速开始一个项目。

### 1. 创建一个项目

使用命令行进行初始化。

```bash
$ mkdir groot-demo && cd groot-demo
$ sl init
$ npm install 
```

sl-core 会自动安装 npm 依赖，若有问题则可自行安装。

若安装缓慢报错，可尝试用 `cnpm` 或别的镜像源自行安装：`rm -rf node_modules && cnpm install`。

### 2. 使用组件

脚手架会生成一个 Todo 应用实例（一个很有参考价值的 React 上手示例），先不管它，我们用来测试组件。

直接用下面的代码替换 `index.js` 的内容，用 React 的方式直接使用 igroot 组件。

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, message } from 'igroot';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
  }
  handleChange(date) {
    message.info('您选择的日期是: ' + date.toString());
    this.setState({ date });
  }
  render() {
    return (
      <div style={{ width: 400, margin: '100px auto' }}>
        <DatePicker onChange={value => this.handleChange(value)} />
        <div style={{ marginTop: 20 }}>当前日期：{this.state.date.toString()}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
```

> 你可以在左侧菜单选用更多组件。

### 3. 开发调试

一键启动调试，访问 http://127.0.0.1:8080 查看效果。

```bash
$ sl dev
```

### 5. 构建和部署

```bash
$ sl build
```

入口文件会构建到 `dist` 目录中，你可以自由部署到不同环境中进行引用。

> 上述例子用于帮助你理解 iGroot React 的使用流程，并非真实的开发过程，你可以根据自己的项目开发流程进行接入。

## 兼容性

iGroot React 支持所有的现代浏览器和 IE9+。

对于 IE 系列浏览器，需要提供 [es5-shim](https://github.com/es-shims/es5-shim) 和 [es6-shim](https://github.com/paulmillr/es6-shim) 等 Polyfills 的支持。如果你使用了 babel，强烈推荐使用 [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) 和 [babel-plugin-transform-runtime](https://babeljs.io/docs/plugins/transform-runtime/)。

> 如果在 IE 浏览器中遇到 `startsWith` 的[问题]，请引入 [es6-shim](https://github.com/paulmillr/es6-shim) 或 [babel-polyfill](https://babeljs.io/docs/usage/polyfill/)。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <!-- 引入样式 -->
    <link rel="stylesheet" href="/index.css">
    <!-- Polyfills -->
    <!--[if lt IE 10]>
    <script src="https://as.alipayobjects.com/g/component/??console-polyfill/0.2.2/index.js,es5-shim/4.5.7/es5-shim.min.js,es5-shim/4.5.7/es5-sham.min.js,es6-shim/0.35.1/es6-sham.min.js,es6-shim/0.35.1/es6-shim.min.js,html5shiv/3.7.2/html5shiv.min.js,media-match/2.0.2/media.match.min.js"></script>
    <![endif]-->
    <script src="https://as.alipayobjects.com/g/component/??es6-shim/0.35.1/es6-sham.min.js,es6-shim/0.35.1/es6-shim.min.js"></script>
  </head>
  <body>
  </body>
  <!-- 引入公用文件 -->
  <script src="/common.js"></script>
  <!-- 引入入口文件 -->
  <script src="/index.js"></script>
</html>
```
