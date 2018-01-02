---
order: 1
title:
  zh-CN: 过滤条件伸缩
  en-US: FormFilter
---

## zh-CN

用户日常的查询组件库。

## en-US

Filter for Form

````jsx
import { Form, Select, Row, Col, Input, Button, Icon, InputNumber, DatePicker } from 'igroot';

/**
 * 查询表格
 */
const FormItem = Form.Item
const { Option } = Select

class IgrootFormFilter extends React.Component {

  state = {
    expandForm: false
  }
  /**
   * 判定是否有收起操作
   * 用来展示哪一部分表单
   */
  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm()
  }
  /**
   * 查询按钮
   */
  handleSearch = (e) => {
    e.preventDefault()

    const { form } = this.props

    form.validateFields((err, fieldsValue) => {
      if (err) return

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.format('YYYY-MM-DD'),
      }
      console.log(values, 'formFilter输出结果')
      this.setState({
        loading: true
      }, () => { this.setState({ loading: false }) })
    })
  }

  /**
   * 展开/收缩按钮
   */
  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    })
  }

  /**
   * 简单的查询条件
   */
  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={8}>
          <Col md={8} sm={24}>
            <FormItem label="规则编号">
              {getFieldDecorator('no')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }} allowClear>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className="submitButtons">
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    )
  }

  /**
   * 复杂的过滤条件
   */
  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={8}>
          <Col md={8} sm={24}>
            <FormItem label="规则编号">
              {getFieldDecorator('no')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="调用次数">
              {getFieldDecorator('number')(
                <InputNumber style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col md={8} sm={24}>
            <FormItem label="更新日期">
              {getFieldDecorator('updatedAt')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" onChange={(date, dateString) => { }} />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status3')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status4')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    )
  }
  render() {
    return (
      <div className="tableListForm">
        {this.renderForm()}
      </div>
    )
  }
}
const FormFilter = Form.create()(IgrootFormFilter);


ReactDOM.render(
  <div>
    <FormFilter />
  </div>
, mountNode);
````

<style>
.tableListForm .ant-form-item {
  margin-bottom: 24px;
  margin-right: 0;
  display: flex;
}
.tableListForm .ant-form-item > .ant-form-item-label {
  width: auto;
  line-height: 32px;
  padding-right: 8px;
}
.tableListForm .ant-form-item-control-wrapper {
  flex: 1;
}
.tableListForm .submitButtons{
  white-space: nowrap;
  margin-bottom: 24px;
}
</style>