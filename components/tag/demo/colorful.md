---
order: 1
title:
  zh-CN: 多彩标签
  en-US: Colorful Tag
---

## zh-CN

我们添加了多种预设色彩的标签样式，用作不同场景使用。如果预设值不能满足你的需求，可以设置为具体的色值。

> 预设色彩在 `igroot@1.0.0` 之后支持。

## en-US

After `igroot@1.0.0`, We preset a series of colorful tag style for different situation usage.
And you can always set it to a hex color string for custom color.

> Preset colors are supported after `igroot@1.0.0`.

````jsx
import { Tag } from 'igroot';

ReactDOM.render(
  <div>
    <h4 style={{ marginBottom: 16 }}>Presets:</h4>
    <div>
      <Tag color="pink">pink</Tag>
      <Tag color="red">red</Tag>
      <Tag color="orange">orange</Tag>
      <Tag color="green">green</Tag>
      <Tag color="cyan">cyan</Tag>
      <Tag color="blue">blue</Tag>
      <Tag color="purple">purple</Tag>
    </div>
    <h4 style={{ margin: '16px 0' }}>Custom:</h4>
    <div>
      <Tag color="#f50">#f50</Tag>
      <Tag color="#2db7f5">#2db7f5</Tag>
      <Tag color="#87d068">#87d068</Tag>
      <Tag color="#20a0ff">#20a0ff</Tag>
    </div>
  </div>
, mountNode);
````

````css
.ant-tag {
  margin-bottom: 8px;
}
````
