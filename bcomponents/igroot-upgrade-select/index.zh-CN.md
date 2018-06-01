---
category: BComponents
type: General
title: UpgradeSelect
subtitle: 升级版下拉框
cols: 1
---

继承于 [Select](http://igroot.i.qingcdn.com:8001/components/select-cn/) 的升级版下拉框。

## 何时使用

需要更快使用下拉框，添加搜索过滤的时候

## API

```jsx
<UpgradeSelect showSearch filterkeys={['cname']}options={options} />
```

### UpgradeSelect
除了 [Select](http://igroot.i.qingcdn.com:8001/components/select-cn/#Select-props) 的属性可以使用，还添加了下面两个属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 下拉项列表 | Array | - |
| filterKeys | 过滤的关键字 | object | - |