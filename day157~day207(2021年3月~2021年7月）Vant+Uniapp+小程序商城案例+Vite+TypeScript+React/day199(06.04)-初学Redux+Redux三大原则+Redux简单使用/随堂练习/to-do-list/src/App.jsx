import React from 'react'
import './App.css';
// 导入共享库
import store from "./store/store";
// 导入actions
import { addTaskAction, delTaskAction, toggleStatusAction, toggleViewKeyAction } from "./store/action"
// 引入组件
import { Row, Col, Input, Button, List, Checkbox, Radio } from "antd";

class App extends React.Component {
  constructor() {
    super();
    // 在constructor时，映射数据
    this.state = store.getState();
    // 创建refs
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    // 订阅 （一定要在mount之后订阅，否则可能造成报错）
    store.subscribe(() => {
      this.setState(store.getState())
    });
  }

  // 添加任务
  addTask = () => {
    // 使用action添加任务
    store.dispatch(addTaskAction({
      id: +new Date(),
      info: this.inputRef.current.state.value,
      status: false
    }));
    // 清空
    this.inputRef.current.state.value = ""
  }

  // 筛选任务列表
  getFilterTasks() {
    if (this.state.viewKey === "all") {
      return this.state.list;
    }
    if (this.state.viewKey === "done") {
      return this.state.list.filter(val => val.status);
    }
    if (this.state.viewKey === "undone") {
      return this.state.list.filter(val => !val.status);
    }
  }

  // 单选组 选项
  radioOptions = [
    { label: '全部', value: 'all' },
    { label: '已完成', value: 'done' },
    { label: '未完成', value: 'undone' },
  ];

  render() {
    return (
      <div className="App">
        {/* 添加任务栏 start */}
        <Row>
          <Col span={12}>
            <Input placeholder="任务" ref={this.inputRef} />
          </Col>
          <Col span={12}>
            <Button type="primary" onClick={this.addTask}>添加</Button>
          </Col>
        </Row>
        {/* 添加任务栏 end */}

        {/* 任务列表 start */}
        <Row>
          <Col span={12}>
            <List
              bordered
              dataSource={this.getFilterTasks()}
              renderItem={item => (
                <List.Item>
                  <Checkbox checked={item.status} onChange={() => { store.dispatch(toggleStatusAction(item.id)) }} > {item.info}</Checkbox>
                  <Button type="danger" onClick={() => { store.dispatch(delTaskAction(item.id)) }}>删除</Button>
                </List.Item>
              )}
            />
          </Col>
        </Row>
        {/* 任务列表 end */}

        {/* 分类选择 start */}
        <Radio.Group
          options={this.radioOptions}
          onChange={(e) => { store.dispatch(toggleViewKeyAction(e.target.value)) }}
          value={this.state.viewKey}
          optionType="button"
        />
        {/* 分类选择 end */}

      </div>
    )
  }
}

export default App
