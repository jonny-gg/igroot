---
order: 0
title:
  zh-CN: 表格动态分页
  en-US: pageTable
---

## zh-CN

表格动态分页

## en-US

PageTable

```jsx
import React, { Component } from 'react'
import { Row, Col, Tooltip } from 'igroot'

import PageTable from 'igroot-page-table/src/index'

// 正式使用 请打开下方注释
// import PageTable from 'igroot-page-table'

export class TaskList extends Component {
  state = {
    taskColumns: [
      { title: '生成时间', dataIndex: 'created_at', key: 'created_at', },
      {
        title: '任务类型', dataIndex: 'task_type', key: 'task_type',
      },
      {
        title: '任务内容', dataIndex: 'task_info', key: 'task_info',
      },
      {
        title: '任务状态', dataIndex: 'status', key: 'status',
      },
      {
        title: '任务备注', dataIndex: 'remark', key: 'remark',
      },
      {
        title: '操作人', dataIndex: 'user_id', key: 'user_id',
      },
      {
        title: '操作', dataIndex: 'op', key: 'op',
        render: (text, record) => this.opertion(record)
      },
    ],
    taskDataSource: [
      { key: 1, created_at: '2018-06-14', task_type: '类型1',task_info: 'balabala', status: '生效', remark: '备注', user_id: '用户' },
      { key: 2, created_at: '2018-06-15', task_type: '类型2', task_info: 'balabala', status: '生效', remark: '备注', user_id: '用户' },
      { key: 3, created_at: '2018-06-16', task_type: '类型3', task_info: 'balabala', status: '生效', remark: '备注', user_id: '用户' },
    ],
    loading: false,
    pages: {
      total: 3,
    }
  }


  opertion = record => {
    return <Tooltip placement="top" title="下发详情">
      <span>详情</span>
    </Tooltip>
  }


  componentWillMount() {
    this.getData()
  }

  search = value => {
    this.getData(value)
  }

  // api请求演示 这里不做请求
  getData = (value = {}) => {
    console.log(value, '请求参数')
    // this.setState({ loading: true }, () => {
    //   const {
    //     current_num,
    //     current_page
    //   } = value.pages || { current_num: 10, current_page: 1 }

    //   const vars = {
    //     ...value,
    //     pages: { current_num, current_page }
    //   }

    //   taskListApi(vars).then(res => {
    //     const { task: { taskList } } = res

    //     this.setState({
    //       taskDataSource: taskList, loading: false,
    //       pages: {
    //         total: parseInt(res.pagination['x-pagination-total-count'], 0),
    //         current_num,
    //         current_page
    //       },
    //     })
    //   }).catch((errors) => {
    //     this.setState({ loading: false })
    //   })
    // })
  }

  render() {
    const { taskColumns, taskDataSource, loading, pages } = this.state
    return (
      <div>
        <Row gutter={16}>
          <Col span={24}>
            <PageTable
              dataSource={taskDataSource}
              columns={taskColumns}
              loading={loading}
              pages={pages}
              search={this.getData}
            // scrollConfig={{ x: falses }}
            />
          </Col>
        </Row>

      </div>
    )
  }
}

ReactDOM.render(<TaskList/>, mountNode)
```