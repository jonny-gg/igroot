---
category: BComponents
type: General
title: TextDiff
subtitle: 文本差异比对
cols: 1
---

## 演示示例

![](http://fe.xxx.com/image/text-diff.jpg)

## API

```jsx
import React, { Component } from 'react'
import TextDiff from 'igroot-text-diff'

export class Example extends Component {
  state = {
      oldValue :
      `
        options:
          description: 单线直播专用父
          is_https: False

          region:
          foreign:
            default:
              group:
                - US-DistColumbia-washingtonDC-1-cache-1-stpt-other-1|55
                - US-Georgia-atlanta-1-cache-1-stpt-other-1|50
          dx cl youchi gd:
            default:
              group:
                - dx-lt-yd-shandong-jinan-5-cache-4-stpt-dx-1|35
                - dx-lt-yd-zhejiang-ningbo-2-cache-10-stpt-dx-1|30
          "!foreign !dx !youchi !yd !tt !ck !gd !jyw !zx !yatx !cl !lt":
            default:
              group:
                - dx-lt-yd-shandong-jinan-5-cache-4-stpt-lt-1|35
                - dx-lt-yd-zhejiang-ningbo-2-cache-10-stpt-lt-1|30
          lt:
            default:
              group:
                - lt-liaoning-anshan-1-cache-5-stpt-lt-1|35
          yd tt jyw zx yatx:
            default:
              group:
                - yd-henan-zhengzhou-2-cache-2-stpt-yd-1|35
                - yd-jiangsu-nanjing-1-cache-1-stpt-yd-1|30

          ck:
            ck-hubei-wuhan-2-cache-3:
              group:
                - dx-lt-hubei-wuhan-2-cache-8-stpt-dx-1
                - dx-lt-yd-shandong-jinan-5-cache-4-stpt-dx-1|45
            ck-shanghai-shanghai-2-cache-3:
              group:
                - cl-shanghai-shanghai-1-cache-1-stpt-cl-1
                - dx-lt-yd-shandong-jinan-5-cache-4-stpt-yd-1|45
            default:
              group:
                - ck-shanghai-shanghai-2-cache-3-stpt-ck-1
                - ck-hubei-wuhan-2-cache-3-stpt-ck-1
      `,
    newValue:
      `
        options:
          description: 单线直播专用父
          is_https: False

          region:
          foreign:
            default:
              group:
                - US-DistColumbia-washingtonDC-1-cache-1-stpt-other-1|55
                - US-Georgia-atlanta-1-cache-1-stpt-other-1|50
          dx cl youchi gd:
            default:
              group:
                - dx-lt-yd-shandong-jinan-5-cache-5-stpt-dx-1|35
                - dx-lt-yd-zhejiang-ningbo-2-cache-10-stpt-dx-1|30
          "!foreign !dx !youchi !yd !tt !ck !gd !jyw !zx !yatx !cl":
            default:
              group:
                - lt-liaoning-anshan-1-cache-5-stpt-lt-1|35
                - dx-lt-yd-zhejiang-ningbo-2-cache-10-stpt-lt-1|35
          yd tt jyw zx yatx:
            default:
              group:
                - yd-henan-zhengzhou-2-cache-2-stpt-yd-1|35
                - yd-jiangsu-nanjing-1-cache-1-stpt-yd-1|30

          ck:
            ck-hubei-wuhan-2-cache-3:
              group:
                - dx-lt-hubei-wuhan-2-cache-8-stpt-dx-1
                - dx-lt-yd-shandong-jinan-5-cache-5-stpt-dx-1|45
            ck-shanghai-shanghai-2-cache-3:
              group:
                - cl-shanghai-shanghai-1-cache-1-stpt-cl-1
                - dx-lt-yd-shandong-jinan-5-cache-5-stpt-yd-1|45
            default:
              group:
                - ck-shanghai-shanghai-2-cache-3-stpt-ck-1
                - ck-hubei-wuhan-2-cache-3-stpt-ck-1
      `
  }
  render() {
    return (
      <div>
        <TextDiff
          width={1200}
          height={600}
          oldValue={oldValue}
          newValue={newValue}
        />
      </div>
    )
  }
}
```

### 属性说明
| props   | 类型      | 说明                        |
| ------- | ------- | ------------------------- |
| oldValue | string | 旧值 |
| newValue | string | 新值               |
| width   | number | 宽度              |
| height  | number | 高度               |