---
order: 4
title:
  zh-CN: 保存搜索条件
  en-US: mark-search
---

## zh-CN

保存搜索条件。

## en-US

Mark Search

````jsx
import React from 'react'
import MarkSearch from 'igroot-mark-search/src/index'
//演示使用  正式环境请使用 import MarkSearch from 'igroot-mark-search'

class Example extends React.Component {
  render() {
    return (
      <MarkSearch
        onTagSelect={(form) => { console.log(form) }}
        searchForm={{ app: '1' }}
        tagGroupKey="cluster-search"
    />)
  }
}

ReactDOM.render(<Example />, mountNode)
````
