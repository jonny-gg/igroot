---
order: 5
title:
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

包含过滤项和下拉项设置

## en-US

Basic

````jsx
import React, { Component } from 'react'
import UpgradeSelect from 'igroot-upgrade-select/src/index'
//演示使用  正式环境请使用 import UpgradeSelect from 'igroot-upgrade-select'

const options = [{
  label: '类型1',
  value: '1',
  cname: 'leixingyi'
},
{
  label: '类型2',
  value: '2',
  cname: 'leixinger'
},
{
  label: '类型3',
  value: '3',
  cname: 'leixingsan'
},
{
  label: '类型4',
  value: '4',
  cname: 'leixingsi'
}]

class App extends Component {
  render() {
    return <UpgradeSelect
      showSearch
      filterkeys={['cname']}
      options={options} 
      style={{width: 100}}
    />
  }
}

ReactDOM.render(
  <App />
, mountNode);

