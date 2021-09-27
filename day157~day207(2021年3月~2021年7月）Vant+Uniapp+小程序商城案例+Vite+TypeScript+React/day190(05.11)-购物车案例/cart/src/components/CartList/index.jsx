import React from "react";

// 商品列表组件
class CartList extends React.Component {

  // 修改商品数量
  changeNum = (id, e) => {
    // 新值
    let newVal = e.target.value;
    console.log("newVal", newVal);
    // 检查输入的值是否合法
    if (isNaN(+newVal) || +newVal < 0) {
      // 不合法 归零
      newVal = 0;
    }
    // 触发父组件方法
    this.props.changeGoodsList("changeNum", { id, newVal })
  }

  // 点击减少
  reduceGoodsNum = (id, curNum) => {
    if (curNum > 0) {
      this.props.changeGoodsList("changeNum", { id, newVal: --curNum })
    }
  }

  // 点击添加
  addGoodsNum = (id, curNum) => {
    this.props.changeGoodsList("changeNum", { id, newVal: ++curNum })
  }

  // 点击删除
  delGoods = (id) => {
    this.props.changeGoodsList("delGoods", { id })
  }


  render() {
    return (
      <div>
        {this.props.goodsList.map(val => (
          <div className="item" key={val.id}>
            <img src={val.img} alt="" />
            <div className="name">{val.name}</div>
            <div className="change">
              <a href="#!" onClick={this.reduceGoodsNum.bind(this, val.id, val.num)}>－</a>
              <input className="num" value={val.num} onChange={this.changeNum.bind(this, val.id)} />
              <a href="#!" onClick={this.addGoodsNum.bind(this, val.id, val.num)}>＋</a>
            </div>
            <div className="del" onClick={this.delGoods.bind(this, val.id)}>×</div>
          </div >
        ))}
      </div >
    )
  }
}

export default CartList;