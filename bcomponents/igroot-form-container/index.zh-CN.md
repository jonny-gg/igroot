---
category: BComponents
type: General
title: FormContainer
subtitle: 表单容器组件
cols: 1
---

表单容器组件

## 何时使用
需要构建表单获取表单字段的时候使用

## 安装方法

```jsx
sl add -c igroot-form-container
```

## API

```jsx
<FormContainer>
  <Row>
    <Col span={8}>
      <FormItem label="备注" name="comment">
        <Input placeholder='输入要搜索的备注关键字'/>
      </FormItem>
    </Col>
    <Col span={8}>
      <FormOption
        option={['submit', 'reset']}
        submitText="搜索"
        onSubmit={this.handleSubmit}
      />
    </Col>
  </Row>
</FormContainer>
```

### FormContainer

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onGetForm | 获取当前 form | function(form) | - |


### FormItem
fieldProps, initialValue, required, label
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 标题 | String | - |
| name | 字段名 | String | - |
| initialValue | 初始值|  |  |
| required | 是否必填 | boolean | false |
| fieldProps | 扩展属性 | 对象 |  |

### FormOptiton

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
