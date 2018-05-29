---
order: 1
title: 业务组件开发流程
---

这里是 iGroot 的 业务组件开发流程，针对业务比较频繁使用的组件封装。

## 特性

- 内部系统使用。
- 针对业务比较频繁使用的组件封装
- 为``白山``贡献一份自己的力量

## 环境准备
sl-core (如未安装,[请参考](http://igroot.i.qingcdn.com:8001/docs/start/env-cn)) 

开发依赖安装完成后，请到工作目录下，执行以下命令：
``` bash
sl init
```
选择`iGroot Business Component`并输入组件名：
![iGroot Business Component](http://jr.baishancloud.com:8090/download/attachments/11930429/TIM%E5%9B%BE%E7%89%8720171130193318.png?version=1&modificationDate=1512041599483&api=v2)

然后进入项目中安装项目依赖：
``` bash
cd [name]
npm install
```

## 目录说明
至此，项目依赖已安装完毕，我们可开始进行业务组件的开发。
生成的项目目录结构如下所示：
``` bash
[name]
   ├ demo          # 文档目录，用于在 iGroot 官网上展示
   |  └ demo.md    # 示例文档
   ├ src           # 源码目录
   |  ├ demo.jsx   # 调试专用组件
   |  └ index.jsx
   ├ dev.js        # 调试入口
   ├ index.js      # 项目入口
   ├ bsy.json      # 项目配置
   ├ package.json
   ├ .npmignore
   └ README.md
```
> **注意**：项目入口`/index.js`必须使用`export default`导出项目

## 调试

在项目根目录下，使用以下命令来开启项目调试：
``` bash
sl dev
```
构建器会读取`/dev.js`文件作为调试入口，构建并加载到浏览器中，以供开发人员对项目进行调试

## 发布

在确认开发完成之后，请至`bsy.json`与`package.json`中，核对项目名称与版本号
>**注意**：业务组件的项目名称必须以`igroot-`开头

![bsy.json](http://jr.baishancloud.com:8090/download/attachments/11930429/TIM%E5%9B%BE%E7%89%8720171130193422.png?version=1&modificationDate=1512041675815&api=v2)
![package.json](http://jr.baishancloud.com:8090/download/attachments/11930429/TIM%E5%9B%BE%E7%89%8720171130193427.png?version=1&modificationDate=1512041675874&api=v2)

确认完毕之后，执行以下命令将其发布至`npm`：
``` bash
npm publish
```
发布完成后，请通知`@宇韬`与`@郭老`将其整合至`sl`中，并发布至 [iGroot 官网](http://igroot.i.qingcdn.com:8001)

## 文档编写
组件相关的使用说明文档请编写为`.md`文件存放至`/demo`文件夹中，`@郭老`会将其作为 [iGroot 官网](http://igroot.i.qingcdn.com:8001) 的文档与示例

## 使用
业务组件发布至`npm`后，开发者们便可在各自的业务项目中使用。在项目的根目录中，请执行以下命令来添加业务组件：
``` bash
sl add -c [name]
```
> 不填写`[name]`的情况下，将会列出所有已收录的业务组件以供挑选
- 
> 在bsy.json的options属性下 添加esModule 如下所示:
``` bash
  "options": {
    "esModule": [
      "name"
    ]
  }
```
安装完成后，即可在项目中使用：
``` javascript
// example
import FormModal from 'igroot-form-modal'
```