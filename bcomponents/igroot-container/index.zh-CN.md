---
category: BComponents
type: General
title: Container
subtitle: 区块容器组件
cols: 2
---

独立区块包含 UI 组件

## 何时使用
需要处理模块的数据情况的时候

## 安装方法

```jsx
sl add -c igroot-container
```

## API

```jsx
<IgrootContainer  loading={true}>
  <div>内容</div>
</IgrootContainer>
```

### Container
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | String | - |
| loading | 是否加载 | boolean | false |
| empty | 是否为空 | boolean | false |
| error | 是否异常 | boolean | false |



