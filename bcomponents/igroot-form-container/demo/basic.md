---
order: 0
title:
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

简单表单过滤

## en-US

basic form

````jsx
import React, { Component } from 'react'
import { Card, Row, Col, Input, Form } from 'igroot'
import { FormItem, FormContainer, FormOption } from 'igroot-form-container/src/index'
// 演示使用  正式环境请使用
//import { FormItem, FormContainer, FormOption } from 'igroot-form-container'

class App extends Component {
  constructor(props) {
    super(props)
  }

  handleSubmit = (params) => {
    console.log(params)
    const { onFilter } = this.props 
    onFilter && onFilter(params)
  }

  render() {
    return (
      <div>
        <Card>
          <div className='tableList'>
            <div className='tableListForm'>
              <FormContainer>
                <Row>
                  <Col span={8}>
                    <FormItem label="备注" name="comment">
                      <Input placeholder='输入要搜索的备注关键字'/>
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem label="姓名" name="name" required>
                      <Input placeholder='输入姓名'/>
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
            </div>
          </div>
        </Card>
      </div>
    )
  }
} 

ReactDOM.render(
  <App />
, mountNode);

