import React from "react";

class Bottom extends React.Component {
  // 获取商品总件数
  getTotalCount = () => {
    let sum = 0;
    this.props.list.forEach(val => {
      if (val.flag) {
        sum += val.count;
      }
    });
    return sum;
  }

  // 获取商品总价
  getTotalPrice = () => {
    let sum = 0;
    this.props.list.forEach(val => {
      if (val.flag) {
        sum += val.count * val.price;
      }
    });
    return sum;
  }

  // 删除所选商品
  delCheckedGoods = () => {
    this.props.changeList("delCheckedGoods")
  }

  // 清理购物车
  clearCart = () => {
    this.props.changeList("clearCart")
  }

  render() {
    return (
      <div className="controls clearfix">
        <a href="#!" alt="" className="del-all" onClick={this.delCheckedGoods}>删除所选商品</a>
        <a href="#!" alt="" className="clear" onClick={this.clearCart}>清理购物车</a>
        <a href="#!" alt="" className="pay">去结算</a>
        <p>
          已经选中<span id="totalCount">{this.getTotalCount()}</span>件商品;总价：<span id="totalPrice" className="total-price">{this.getTotalPrice()}￥</span>
        </p>
      </div>
    )
  }
}

export default Bottom;