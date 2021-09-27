import React from "react";

class CartList extends React.Component {

  inputChange = (id, e) => {
    this.props.changeGoodsList("changeNum", { id, newVal: e.target.value })
  }

  changeChecked = (id, e) => {
    e.stopPropagation()
    this.props.changeGoodsList("changeChecked", { id })
  }

  // 全选
  allCheck = (e) => {
    this.props.changeGoodsList("addCheck", { checked: e.target.checked })
  }

  // 删除
  clickDel = (id, e) => {
    e.stopPropagation()
    this.props.changeGoodsList("delGoods", { id })
  }
  // 添加
  add = (id, e) => {
    e.stopPropagation()
    this.props.changeGoodsList("addNum", { id })
  }

  // 减少
  reduce = (id, e) => {
    e.stopPropagation()
    this.props.changeGoodsList("reduceNum", { id })
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" checked={!this.props.goodsList.some(val => val.checked === false)} id="all" onChange={(e) => { this.allCheck(e) }} />全选</th>
            <th>商品 </th>
            <th>单价 </th>
            <th> 商品数量</th>
            <th>小计</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {this.props.goodsList.map(val => (
            <tr key={val.id} onClick={this.changeChecked.bind(this, val.id)}>
              <td>
                <input type="checkbox" checked={val.checked} onClick={(e) => { e.stopPropagation() }} onChange={this.changeChecked.bind(this, val.id)} />
              </td>
              <td>
                <img src={val.img} alt="" />
                <p>{val.name}</p>
              </td>
              <td> {val.price}￥ </td>
              <td>
                <div className="count-c clearfix">
                  <a href="#!" className={"reduce " + (val.num < 1 ? "disabled" : "")} onClick={this.reduce.bind(this, val.id)}>-</a>
                  <input type="text" value={val.num} onInput={this.inputChange.bind(this, val.id)} />
                  <a href="#!" className="add" onClick={this.add.bind(this, val.id)}>+</a>
                </div>
              </td>
              <td> {val.price * val.num}￥</td>
              <td>
                <a href="#!" className="del" onClick={(e) => { this.clickDel(val.id, e) }}>删除</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    )
  }
}

export default CartList;