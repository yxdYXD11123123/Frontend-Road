import React from "react";

class CartTotal extends React.Component {

  getSumNum = () => {
    let sum = 0;
    this.props.goodsList.forEach(val => {
      if (val.checked) {
        sum += val.num;
      }
    });
    return sum;
  }

  getSum = () => {
    let sum = 0;
    this.props.goodsList.forEach(val => {
      if (val.checked) {
        sum += val.price * val.num;
      }
    });
    return sum;
  }

  // 删除所选
  delChecked = () => {
    this.props.changeGoodsList("delChecked")
  }

  // 清理购物车
  clearCart = () => {
    this.props.changeGoodsList("clearCart")
  }

  render() {
    return (
      <div className="controls clearfix">
        <a href="#!" className="del-all" onClick={this.delChecked}>删除所选商品</a>
        <a href="#!" className="clear" onClick={this.clearCart}>清理购物车</a>
        <a href="#!" className="pay">去结算</a>
        <p>
          已经选中<span id="totalCount">{this.getSumNum()}</span>件商品;总价：<span id="totalPrice" className="total-price">{this.getSum()}￥</span>
        </p>
      </div>
    )
  }
}

export default CartTotal;