---
order: 1
title:
  zh-CN: 加载
  en-US: Loading
---

## zh-CN

加载

## en-US

set loading

````jsx
import React, { Component } from 'react'
import IgrootContainer from 'igroot-container/src/index'
//演示使用  正式环境请使用,右侧代码 import IgrootContainer from 'igroot-container'

class App extends Component {
  render() {
    return (
      <IgrootContainer loading={true}>
        内容
      </IgrootContainer>
    )
  }
} 

ReactDOM.render(
  <App />
, mountNode);

