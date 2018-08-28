<p align="center">
  <a href="http://igroot.i.coder.com:8001">
    <img width="320" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg">
  </a>
</p>

# iGroot

An enterprise-class UI design language and React-based implementation.

[中文 README](README-zh_CN.md)

## Environment Support

* Browser: Modern browsers and Internet Explorer 9+
* Server-side Rendering
* [Electron](http://electron.atom.io/)

## Install

```bash
npm install igroot
```

## Usage

```jsx
import { DatePicker } from 'igroot';
ReactDOM.render(<DatePicker />, mountNode);
```

And import style manually:

```jsx
import 'igroot/dist/igroot.css';  // or 'igroot/dist/igroot.less'
```

### Use modularized groot

- Use [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) (Recommended)

   ```js
   // .babelrc or babel-loader option
   {
     "plugins": [
       ["import", { libraryName: "igroot", style: "css" }] // `style: true` for less
     ]
   }
   ```

   Then you can import components from groot, equivalent to import manually below.

   ```jsx
   // import js and css modularly, parsed by babel-plugin-import
   import { DatePicker } from 'igroot';
   ```

- Manually import

   ```jsx
   import DatePicker from 'igroot/lib/date-picker';  // for js
   import 'igroot/lib/date-picker/style/css';        // for css
   // import 'igroot/lib/date-picker/style';         // that will import less
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

> Note:
> - set `allowSyntheticDefaultImports` to prevent `error TS1192: Module 'react' has no default export`.

## Internationalization

See [i18n](http://igroot.i.coder.com:8001/docs/react/i18n).

## Links

- [Home page](http://igroot.i.coder.com:8001/)
- [UI library](http://igroot.i.coder.com:8001/docs/react/introduce)
- [rc-components](http://react-component.github.io/)
- [Customize Theme](http://igroot.i.coder.com:8001/docs/react/customize-theme)

## To be perfect...
