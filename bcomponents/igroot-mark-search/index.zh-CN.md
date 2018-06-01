---
category: BComponents
type: General
title: MarkSearch
subtitle: 保存搜索条件
cols: 1
---

## 效果演示

![](http://jr.baishancloud.com:8090/download/attachments/29325737/%E6%88%AA%E5%B1%8F.gif?version=1&modificationDate=1526895156000&api=v2)

## API

```jsx
  import MarkSearch from 'igroot-mark-search'

  <MarkSearch
      onTagSelect={(form) => { console.log(form) }}
      searchForm={{ app: '1' }}
      tagGroupKey="cluster-search"
    />

```

| 属性 | 意义 | 数据类型 | 是否必填 | 默认值 |
| ---------- | -------------------- | -------- | -------- | ---------- |
| tagGroupKey | 某个页面的搜索条件的key | string | 是 |	- |
| searchForm | 要传给本组件保存的一组搜索条件 | object |	是 | - |
| onTagSelect | 当某个tag被点击时 | Function({ fieldName:value } | 是 | - |
| titleType | 操作的dom元素:icon图标；button按钮 | string |	否 |	"button" |
| icon | 当传入的titleType为icon时，此属性表示图标的类型；当传入的titleType为button时，此属性表示按钮上附件展示的图标的类型 | string | 否 |	"tag " |
| btnText | 按钮的文字 | string | 当传入的titleType为button时必填 | "记录搜索条件" |
| className | 组件的类名 | string | 否 | - |
| style | 组件的样式 | string | 否 | - |