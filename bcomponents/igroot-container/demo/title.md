---
order: 0
title:
  zh-CN: 标题
  en-US: Title
---

## zh-CN

设置标题

## en-US

set title

````jsx
import React, { Component } from 'react'
import IgrootContainer from 'igroot-container/src/index'
//演示使用  正式环境请使用,右侧代码 import IgrootContainer from 'igroot-container'

class App extends Component {
  render() {
    return (
      <IgrootContainer title="标题">
        内容
      </IgrootContainer>
    )
  }
} 

ReactDOM.render(
  <App />
, mountNode);

