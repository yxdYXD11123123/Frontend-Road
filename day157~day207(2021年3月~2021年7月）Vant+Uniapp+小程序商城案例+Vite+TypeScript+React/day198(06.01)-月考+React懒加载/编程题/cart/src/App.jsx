import React from 'react';
import './App.css';
// 导入商品列表
import List from "./components/List";
// 导入结算栏
import Bottom from "./components/Bottom"

class App extends React.Component {
  state = {
    list: [
      { id: 1, pName: "牛奶", src: "./uploads/01.jpg", price: 10, count: 3, flag: false },
      { id: 2, pName: "三只松鼠", src: "./uploads/02.jpg", price: 30, count: 1, flag: false },
      { id: 3, pName: "蓝牙播放器", src: "./uploads/03.jpg", price: 100, count: 1, flag: true },
      { id: 4, pName: "大米", src: "./uploads/04.jpg", price: 50, count: 1, flag: false },
      { id: 5, pName: "路由器", src: "./uploads/05.jpg", price: 110, count: 1, flag: false },
      { id: 6, pName: "罐头", src: "./uploads/06.jpg", price: 20, count: 1, flag: false }
    ]
  }

  // 修改商品列表信息
  changeList = (type, payload) => {
    // 修改商品数量
    if (type === "changeGoodsCount") {
      // 更新数据
      this.setState({
        list: this.state.list.filter(val => {
          // 找到对应id
          if (val.id === payload.id) {
            val.count = payload.newVal;
          }
          return true;
        })
      })
    }
    // 修改商品是否选中
    else if (type === "changeGoodsChecked") {
      // 更新数据
      this.setState({
        list: this.state.list.filter(val => {
          // 找到对应id
          if (val.id === payload.id) {
            val.flag = !val.flag;
          }
          return true;
        })
      })
    }
    // 全选
    else if (type === "checkAll") {
      // 更新数据
      this.setState({
        list: this.state.list.filter(val => {
          val.flag = payload.flag;
          return true;
        })
      })
    }
    // 删除
    else if (type === "delGoods") {
      // 更新数据
      this.setState({
        list: this.state.list.filter(val => val.id !== payload.id)
      })
    }
    // 删除所选商品
    else if (type === "delCheckedGoods") {
      // 更新数据
      this.setState({
        list: this.state.list.filter(val => {
          if (val.flag) {
            return false
          }
          return true;
        })
      })
    }
    // 清理购物车
    else if (type === 'clearCart') {
      this.setState({
        list: []
      })
    }
  }

  render() {
    return (
      <div className="car">
        <List list={this.state.list} changeList={this.changeList}></List>
        <Bottom list={this.state.list} changeList={this.changeList}></Bottom>
        {this.state.list.length === 0 ?
          <div className="box" >
            购物车空空如也
        </div> : ""}

      </div>
    )
  }
}

export default App;
