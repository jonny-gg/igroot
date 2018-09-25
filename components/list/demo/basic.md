---
order: 1
title:
  zh-CN: 基础列表
  en-US: Basic list
---

## zh-CN

基础列表。

## en-US

Basic list.

````jsx
import { List, Avatar } from 'igroot';

const data = [
  {
    title: 'iGroot Title 1',
  },
  {
    title: 'iGroot Title 2',
  },
  {
    title: 'iGroot Title 3',
  },
  {
    title: 'iGroot Title 4',
  },
];

ReactDOM.render(
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<a href="https://ant.design">{item.title}</a>}
          description="iGroot, a design language for background applications, is refined by Ant UED Team"
        />
      </List.Item>
    )}
  />,
  mountNode);
````
