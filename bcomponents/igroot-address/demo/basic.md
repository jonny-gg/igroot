---
order: 0
title:
  zh-CN: 基本用法
  en-US: basic
---

## zh-CN

设置大区、省市

## en-US

set address

````jsx
import React, { Component } from 'react'
import Address from 'igroot-address/src/index'
// 演示使用  正式环境请使用
// import Address from 'igroot-address'

const options = {
  "region": [
    {
      "id": 1,
      "name": "华中"
    },
    {
      "id": 2,
      "name": "华北"
    }
  ],
  "province": [
    {
      "id": 1,
      "region_id": 2,
      "name": "北京"
    },
    {
      "id": 2,
      "region_id": 2,
      "name": "天津"
    },
    {
      "id": 3,
      "region_id": 1,
      "name": "上海"
    },
    {
      "id": 4,
      "region_id": 2,
      "name": "重庆"
    },
    {
      "id": 5,
      "region_id": 2,
      "name": "河北"
    },
    {
      "id": 6,
      "region_id": 2,
      "name": "山西"
    }
  ],
  "city": [
    {
      "id": 270,
      "province_id": 1,
      "name": "呼和浩特"
    },
    {
      "id": 271,
      "province_id": 2,
      "name": "呼伦贝尔"
    },
    {
      "id": 272,
      "province_id":3,
      "name": "乌兰察布集宁区"
    },
    {
      "id": 273,
      "province_id": 4,
      "name": "通辽"
    },
    {
      "id": 274,
      "province_id": 5,
      "name": "通辽1"
    },
    {
      "id": 275,
      "province_id": 6,
      "name": "通辽2"
    }
  ]
}

class App extends Component {
  render() {
    return (
      <div>
        <Address options={options} />
        <Address options={options} showOptions={['region', 'province']}/>
      </div>
    )
  }
} 

ReactDOM.render(
  <App />
, mountNode)
````
