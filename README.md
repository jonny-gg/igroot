<p align="center">
  <a href="http://groot.i.qingcdn.com:8001">
    <img width="320" src="http://groot.i.qingcdn.com/image/groot/page_logo.png">
  </a>
</p>

# iGroot

一套企业级的 UI 设计语言和 React 实现。

<!--[README in English](README-en-US.md)-->

## 支持环境

* 现代浏览器和 IE9 及以上。
* 支持服务端渲染。
* [Electron](http://electron.atom.io/)

## 安装

```bash
npm install igroot
```

## 示例

```jsx
import { DatePicker } from 'igroot';
ReactDOM.render(<DatePicker />, mountNode);
```

手动引入样式：

```jsx
import 'igroot/dist/igroot.css';  // or 'igroot/dist/igroot.less'
```

按需加载可通过此写法 `import DatePicker from 'igroot/lib/date-picker'` 或使用插件 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)。

## TypeScript

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

- [首页](http://groot.i.qingcdn.com:8001/index-cn)
- [UI 组件库](http://groot.i.qingcdn.com:8001/docs/react/introduce-cn)
- [React 底层基础组件](http://react-component.github.io/)
- [定制主题](http://groot.i.qingcdn.com:8001/docs/react/customize-theme-cn)

## 待完善...
