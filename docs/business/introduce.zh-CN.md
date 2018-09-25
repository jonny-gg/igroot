---
order: 0
title: 业务组件使用
---

这里是 iGroot 的 React 实现，针对业务比较频繁使用的组件封装。

<div class="pic-plus">
  <img width="150" src="http://fe.baishancloud.com/images/page-logo.png">
  <span>+</span>
  <img width="160" src="http://fe.baishancloud.com/images/react.png">
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
- 充分的个性化定制
- 您也可以为``白山``贡献一份自己的力量

## 安装

### 使用 npm 安装

**我们推荐使用 npm 的方式进行开发**，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

## 示例

### 拿弹出框表单举例

- 安装

  ```jsx
    $ npm install igroot-form-modal --save
  ```

- 引入

  ```jsx
    import FormModal from 'igroot-form-modal'
  ```
- 使用 (例如弹出框中的表单)

  ```jsx
    import { Input, InputNumber, Radio, Button } from 'igroot'
    import FormModal from 'igroot-form-modal/src/index'

    const { Item } = FormModal
    const { Group: RadioGroup, Button: RadioButton } = Radio

    class PersonModal extends FormModal {
      renderForm() {
        const { getFieldDecorator } = this.form
        const itemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 6 }
          },

          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 }
          }
        }

        const rules = label => ({ rules: [{ required: true, message: `${label}为必填项` }] })

        return (
          <div>
            <Item {...itemLayout} label='姓名'>
              {getFieldDecorator('name', { ...rules('姓名') })(<Input />)}
            </Item>

            <Item {...itemLayout} label='年龄' >
              {getFieldDecorator('age', { ...rules('年龄'), initialValue: 18 })(<InputNumber max={150} min={0} />)}
            </Item>

            <Item {...itemLayout} label='性别' >
              {getFieldDecorator('gender', { ...rules('性别') })(
                <RadioGroup>
                  <RadioButton value="man">♂ 男</RadioButton>
                  <RadioButton value="woman">♀ 女</RadioButton>
                </RadioGroup>
              )}
            </Item>
          </div>
        )
      }
    }

    class Container extends React.Component {
      render() {
        return (
          <div>
            <Button type="primary" onClick={() => this.modal.show()}>Show Modal</Button>
            <PersonModal
              title="个人信息"
              ref={modal => this.modal = modal}
              onOk={(value, cancelModal) => {
                console.log(value)
                setTimeout(() => cancelModal(true), 2333)
              }}
            />
          </div>
        )
      }
    }

    ReactDOM.render(
      <div>
        <Container />
      </div>
    , mountNode);
 ```

## 开发说明

* 组件  `适用于公司` or `适用于团队` 都可以往这里放
* 快速发布npm包,按需引入您需要的组件
* [业务组件开发文档](http://localhost:8001/docs/business/bcdevelop-cn) (~官方唯一指定文档~)

## 目录结构

```javascript
src
  |-- bcomponents          # iGroot 业务组件库
      |-- form-modal       # 业务组件名称
      	  |-- demo         # demo文件夹
      	      |-- basic.md     # 业务组件对应的示例代码(可以多个)
          |-- index.zh-CN.md   # 组件的API说明
  |-- components           # iGroot 基础组件库
```