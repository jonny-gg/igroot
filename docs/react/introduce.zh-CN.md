---
order: 0
title: 组件生态
---

这里是 iGroot 的 React 实现，开发和服务于企业级后台产品。

<div class="pic-plus">
  <img width="150" src="http://fe.baishancloud.com/image/page-logo.png">
  <span>+</span>
  <img width="160" src="http://fe.baishancloud.com/image/react.png">
</div>

<style>
.pic-plus > * {
  display: inline-block!important;
  vertical-align: middle;
}
.pic-plus span {
  font-size: 30px;
  color: #aaa;
  margin: 0 20px;
}
</style>

---

## 特性

- 内部系统使用。
- 开箱即用的高质量 React 组件。
- 使用 TypeScript 构建，提供完整的类型定义文件。
- 基于 npm + webpack + babel 的工作流，支持 ES2015 和 TypeScript。

## 支持环境

* 现代浏览器和 IE9 及以上。
* 支持服务端渲染。
* [Electron](http://electron.atom.io/)

## 安装

### 使用 npm 或 yarn 安装

**我们推荐使用 npm 或 yarn 的方式进行开发**，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
$ npm install igroot --save
```

如果你的网络环境不佳，推荐使用 [cnpm](https://github.com/cnpm/cnpm)。

### 浏览器引入

在浏览器中使用 `script` 和 `link` 标签直接引入文件，并使用全局变量 `igroot`。

我们在包内的 `igroot/dist` 目录下提供了 `igroot.js` `igroot.css` 以及 `igroot.min.js` `igroot.min.css`。

> **强烈不推荐使用已构建文件**，这样无法按需加载，而且难以获得底层依赖模块的 bug 快速修复支持。

## 示例

```jsx
import { DatePicker } from 'igroot';
ReactDOM.render(<DatePicker />, mountNode);
```

引入样式：

```jsx
import 'igroot/dist/igroot.css';  // or 'igroot/dist/igroot.less'
```

### 按需加载

下面两种方式都可以只加载用到的组件。

- 使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)（推荐）。

   ```js
   // .babelrc or babel-loader option
   {
     "plugins": [
       ["import", { libraryName: "igroot", style: "css" }] // `style: true` 会加载 less 文件
     ]
   }
   ```

   然后只需从 igroot 引入模块即可，无需单独引入样式。等同于下面手动引入的方式。

   ```jsx
   // babel-plugin-import 会帮助你加载 JS 和 CSS
   import { DatePicker } from 'igroot';
   ```

- 手动引入

   ```jsx
   import DatePicker from 'igroot/lib/date-picker';  // 加载 JS
   import 'igroot/lib/date-picker/style/css';        // 加载 CSS
   // import 'igroot/lib/date-picker/style';         // 加载 LESS
   ```

### TypeScript

```js
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "jsx": "preserve",
    "allowSyntheticDefaultImports": true
  }
}
```

> 注意：
> - 设置 `allowSyntheticDefaultImports` 避免 `error TS1192: Module 'react' has no default export` 的错误。

## 链接

- [首页](http://igroot.i.coder.com:8001/)
- [UI 组件库](/docs/react/introduce)
- [定制主题](/docs/theme/introduce)
- [React 底层基础组件](http://react-component.github.io/)

## 互助

待完善...
