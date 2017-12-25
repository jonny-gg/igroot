---
order: 0
title:
  zh-CN: 模态框表单
  en-US: FormModal
---

## zh-CN

模态框里包含表单。

## en-US

Modal for Form

````jsx
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
````
