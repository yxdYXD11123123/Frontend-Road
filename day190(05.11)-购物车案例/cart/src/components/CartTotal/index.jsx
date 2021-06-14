import React from "react";

// 商品总价组件
class CartTotal extends React.Component {
  // 获取商品总价
  getTotalPrice = () => {
    let sum = 0;
    this.props.goodsList.forEach(val => {
      sum += val.num * val.price;
    });
    return sum;
  }

  render() {
    return (
      <div className="total">
        <span>总价：{this.getTotalPrice()}</span>
        <button>结算</button>
      </div>
    )
  }
}

export default CartTotal;