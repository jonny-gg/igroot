---
category: BComponents
type: General
title: Igroot-Edit-Table
subtitle: 动态增加行
cols: 1
---

## API

| props      | 类型        | 说明                |
| ---------- | --------- | ----------------- |
| dataSource | array     | 表格数据源             |
| columns    | array     | 表头配置              |
| onChange   | functions | 必填项，会抛出一个更新完之后的数据 |
| dataModule | object    | 新增行的行数据           |
| remove     | boolean   | 是否可以删除行           |
| add        | boolean   | 是否可以增加行           |
| handle     | object    | 自定义操作             |

### 支持类型

渲染的表单类型声明集成到了columns 里面进行处理

| key          | 类型      | 说明                                |
| ------------ | ------- | --------------------------------- |
| type         | string  | 声明表单类型（input/num/select/checkout） |
| selectOption | array   | select的下拉框列表，只接受 label和value形式    |
| require      | boolean | 是否为必填                             |