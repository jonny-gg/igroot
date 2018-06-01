---
category: BComponents
type: General
title: Address
subtitle: 地址组件
cols: 1
---

地址组件

## 何时使用
需要设置大区、省市的时候

## 安装方法
```jsx
sl add -c igroot-address
```

## API

```jsx
<Address options={options} showOptions={['region', 'province']}/>
```

### Container
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| opitons | 配置地址数据 | Object | - |
| showOpitons | 配置要显示的项 | Array | - |


## options
 数据格式要求
```jsx
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
```
