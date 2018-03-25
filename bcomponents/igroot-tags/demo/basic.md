---
order: 2
title:
  zh-CN: 标签组件
  en-US: tags
---

## zh-CN

可自定义标签。

## en-US

tags for customer

````jsx
import Tags from 'igroot-tags/src/index'
//演示使用  正式环境请使用,右侧代码 import Tags from 'igroot-tags'
import React, { Component } from 'react'
class Dome extends Component {
    render() {
        return (
            <div>
                <h3 style={{ height: 40 }}>多选</h3>
                <Tags options={[
                    {
                        label: '类型1',
                        value: '1'
                    },
                    {
                        label: '类型2',
                        value: '2'
                    },
                    {
                        label: '类型3',
                        value: '3'
                    },
                    {
                        label: '类型4',
                        value: '4'
                    }
                ]} />
                <h3 style={{ height: 40 }}>单选</h3>
                <Tags
                    radio
                    options={[
                        {
                            label: '类型1',
                            value: '1'
                        },
                        {
                            label: '类型2',
                            value: '2'
                        },
                        {
                            label: '类型3',
                            value: '3'
                        },
                        {
                            label: '类型4',
                            value: '4'
                        }
                    ]} />
            </div>
        )
    }
}
ReactDOM.render(<Dome />, mountNode)
````
