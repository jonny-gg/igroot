---
order: 2
title:
  zh-CN: 数据为空
  en-US: Empty
---

## zh-CN

数据为空

## en-US

set empty

````jsx
import React, { Component } from 'react'
import IgrootContainer from 'igroot-container/src/index'
//演示使用  正式环境请使用,右侧代码 import IgrootContainer from 'igroot-container'


class App extends Component {
  render() {
    return (
      <IgrootContainer empty={true}>
        内容
      </IgrootContainer>
    )
  }
} 

ReactDOM.render(
  <App />
, mountNode);

