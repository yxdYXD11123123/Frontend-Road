// 引入根组件样式
import './App.css';
import React from "react"
// 导入组件
import CartTitle from "./components/CartTitle"
import CartList from "./components/CartList"
import CartTotal from "./components/CartTotal"

class App extends React.Component {
  state = {
    // 用户名
    userName: "Frank",
    // 商品列表
    goodsList: [
      {
        id: 1,
        name: 'TCL彩电',
        price: 1000,
        num: 1,
        img: 'img/a.jpg'
      }, {
        id: 2,
        name: '机顶盒',
        price: 1000,
        num: 1,
        img: 'img/b.jpg'
      }, {
        id: 3,
        name: '海尔冰箱',
        price: 1000,
        num: 1,
        img: 'img/c.jpg'
      }, {
        id: 4,
        name: '小米手机',
        price: 1000,
        num: 1,
        img: 'img/d.jpg'
      }, {
        id: 5,
        name: 'PPTV电视',
        price: 1000,
        num: 2,
        img: 'img/e.jpg'
      }
    ]
  }

  // 修改商品列表信息
  changeGoodsList = (type, payload) => {
    // 修改数量
    if (type === "changeNum") {
      this.setState({
        // 过滤一遍商品，找到id对应的商品，修改数量
        goodsList: this.state.goodsList.filter(val => {
          if (val.id === payload.id) {
            val.num = +payload.newVal;
          }
          return true;
        })
      })
    }
    // 删除商品 
    else if (type === "delGoods") {
      this.setState({
        // 过滤掉被删除商品
        goodsList: this.state.goodsList.filter(val => val.id !== payload.id)
      })
    }
  }

  render() {
    return (
      <div className="container">
        <div className="cart">
          <CartTitle userName={this.state.userName}></CartTitle>
          <CartList goodsList={this.state.goodsList} changeGoodsList={this.changeGoodsList}></CartList>
          <CartTotal goodsList={this.state.goodsList} ></CartTotal>
        </div>
      </div>
    );
  }
}

export default App;
