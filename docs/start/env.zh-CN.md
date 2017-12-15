---
order: 3
title: 环境准备
---

> 工欲善其事，必先利其器

如果你已经开始准备使用 iGroot，那我们可以先做这些事。

## 安装 Node 环境

从 [Node.js 官网](https://nodejs.org/en/)下载对应平台的安装程序，如果下载速度太慢，可以考虑用 TAONPM 提供的[国内镜像](https://npm.taobao.org/mirrors/node)。

在 Windows 上安装时务必选择全部组件，包括勾选 Add to Path。

安装完成后，在 Windows 环境下，请打开命令提示符，然后输入 node -v，这样的输出：
```
$ node -v
v6.9.3  (目前对node 8还有点问题)
```

## 安装 NPM
其实npm已经在Node.js安装的时候顺带装好了。
```
$ npm -v
3.10.10  
```

如果再使用 npm install 过程中发现下载包的速度非常慢，可以考虑安装 cnpm。
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

## 安装 SL
```bash
$ npm install -g sl-core
```

到这里，你的环境算是准备好了，赶紧进入开发吧~
