import React from "react";
// 引入样式
import "./base.css"
import "./index.css"
// 导入购物车列表
import CartList from "../CartList";
// 导入购物车底部
import CartTotal from "../CartTotal"

class Cart extends React.Component {
  // 初始化数据
  state = {
    // 商品列表
    goodsList: [
      {
        id: 1,
        img: "uploads/01.jpg",
        name: "牛奶",
        price: 20,
        num: 2,
        checked: true
      },
      {
        id: 2,
        img: "uploads/02.jpg",
        name: "xxx",
        price: 10,
        num: 1,
        checked: false
      }
    ]
  }

  // 修改商品列表信息
  changeGoodsList = (type, payload) => {
    // 修改商品数量
    if (type === "changeNum") {
      // 检查数据合法
      let newVal = +payload.newVal;
      if (isNaN(newVal) || newVal < 0) {
        newVal = 0;
      }
      // 更新数据
      this.setState({
        goodsList: this.state.goodsList.filter(val => {
          if (val.id === payload.id) {
            val.num = newVal;
          }
          return true;
        })
      })
    }
    else if (type === "addNum") {
      // 更新数据
      this.setState({
        goodsList: this.state.goodsList.filter(val => {
          if (val.id === payload.id) {
            val.num = val.num + 1;
          }
          return true;
        })
      })
    }
    else if (type === "reduceNum") {
      // 更新数据
      this.setState({
        goodsList: this.state.goodsList.filter(val => {
          if (val.id === payload.id) {
            val.num = val.num < 1 ? 0 : val.num - 1;
          }
          return true;
        })
      })
    }
    else if (type === "changeChecked") {
      // 更新数据
      this.setState({
        goodsList: this.state.goodsList.filter(val => {
          if (val.id === payload.id) {
            val.checked = !val.checked;
          }
          return true;
        })
      })
    }
    else if (type === "addCheck") {
      // 更新数据
      this.setState({
        goodsList: this.state.goodsList.filter(val => {

          val.checked = payload.checked;

          return true;
        })
      })
    }
    else if (type === 'delGoods') {
      // 删除
      this.setState({
        goodsList: this.state.goodsList.filter(val => val.id !== payload.id)
      })
    }
    else if (type === "clearCart") {
      this.setState({
        goodsList: []
      })
    }
    else if (type === "delChecked") {
      // 更新数据
      this.setState({
        goodsList: this.state.goodsList.filter(val => !val.checked)
      })
    }

  }

  render() {
    return (
      <div>
        <CartList goodsList={this.state.goodsList} changeGoodsList={this.changeGoodsList}></CartList>
        <CartTotal goodsList={this.state.goodsList} changeGoodsList={this.changeGoodsList}></CartTotal>
      </div>
    )
  }
}

export default Cart;