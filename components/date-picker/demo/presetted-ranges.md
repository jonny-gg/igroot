---
order: 8
title:
  zh-CN: 预设范围
  en-US: Presetted Ranges
---

## zh-CN

RangePicker 可以设置常用的 预设范围 提高用户体验。

## en-US

We can set presetted ranges to RangePicker to improve user experience.

````jsx
import { DatePicker } from 'igroot';
import moment from 'moment';
const RangePicker = DatePicker.RangePicker;

function onChange(dates, dateStrings) {
  console.log('From: ', dates[0], ', to: ', dates[1]);
  console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
}

ReactDOM.render(
  <div>
    <RangePicker
      ranges={
        { '今天': [moment(),moment()] ,
         '昨天': [moment().subtract(1, 'd'),moment().subtract(1, 'd')] ,
         '近2天': [moment().subtract(2, 'd'),moment()],
         '近7天': [moment().subtract(7, 'd'),moment()] ,
         '近30天': [moment().subtract(30, 'd'),moment()] ,
         '上月': [moment().subtract(1, 'month').startOf('month'),
                  moment().subtract(1, 'month').endOf('month')] ,
         '本月': [moment().startOf('month'),moment()],
         }
      }
      onChange={onChange}
    />
    <br />
    <RangePicker
      ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
      showTime
      format="YYYY/MM/DD HH:mm:ss"
      onChange={onChange}
    />
  </div>,
  mountNode
);
````
