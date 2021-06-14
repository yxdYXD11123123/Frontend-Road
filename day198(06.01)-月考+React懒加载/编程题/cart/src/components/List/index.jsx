import React from "react";

class List extends React.Component {


  // 修改商品列表信息
  changeList = (type, payload, e) => {

    // 修改商品数量
    if (type === "changeGoodsCount") {
      // 处理数字
      let newVal = +e.target.value;
      if (isNaN(newVal) || newVal < 0) {
        newVal = 0;
      }
      // 调用父组件方法
      this.props.changeList("changeGoodsCount", { id: payload.id, newVal })
    }
    // 添加商品数量
    else if (type === "AddGoodsCount") {
      e.stopPropagation()
      this.props.changeList("changeGoodsCount", { id: payload.id, newVal: +payload.newVal + 1 })
    }
    // 减少商品数量
    else if (type === "ReduceGoodsCount") {
      e.stopPropagation()
      this.props.changeList("changeGoodsCount", { id: payload.id, newVal: payload.newVal === 0 ? 0 : payload.newVal - 1 })
    }
    // 修改商品是否选中
    else if (type === "changeGoodsChecked") {
      this.props.changeList("changeGoodsChecked", { id: payload.id })
    }
    // 全部选中
    else if (type === "checkAll") {
      this.props.changeList("checkAll", { flag: payload.target.checked })
    }
    // 删除商品
    else if (type === "delGoods") {
      e.stopPropagation()
      this.props.changeList("delGoods", { id: payload.id })
    }
  }

  // 商品是否全部选中
  isAllChecked() {
    let flag = true;
    this.props.list.forEach(val => {
      if (!val.flag) {
        flag = false;
      }
    });
    return flag;
  }



  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" checked={this.isAllChecked()} id="all" onChange={this.changeList.bind(this, "checkAll")} />全选
          </th>
            <th>
              商品
          </th>
            <th>
              单价
          </th>
            <th>
              商品数量
          </th>
            <th>
              小计
          </th>
            <th>
              操作
          </th>
          </tr>
        </thead>
        <tbody>
          {this.props.list.map(val => (
            <tr key={val.id} onClick={this.changeList.bind(this, "changeGoodsChecked", { id: val.id })}>
              {/* 复选框 */}
              <td>
                <input type="checkbox" checked={val.flag} onClick={(e) => { e.stopPropagation() }} onChange={this.changeList.bind(this, "changeGoodsChecked", { id: val.id })} />
              </td>
              <td>
                <img src={val.src} alt="" />
                <p>{val.pName}</p>
              </td>
              <td>
                {val.price}￥
              </td>
              <td>
                {/* 商品数量 */}
                <div className="count-c clearfix">
                  <a href="#!" className={"reduce " + (val.count <= 0 ? "disabled" : "")} onClick={this.changeList.bind(this, "ReduceGoodsCount", { id: val.id, newVal: val.count })}>-</a>
                  <input type="text" value={val.count} onClick={(e) => { e.stopPropagation() }} onChange={this.changeList.bind(this, "changeGoodsCount", { id: val.id })} />
                  <a href="#!" className="add" onClick={this.changeList.bind(this, "AddGoodsCount", { id: val.id, newVal: val.count })}>+</a>
                </div>
              </td>
              <td>
                {val.price * val.count}￥
              </td>
              <td>
                {/* 删除 */}
                <a href="#!" alt="" className="del" onClick={this.changeList.bind(this, "delGoods", { id: val.id })}>删除</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default List;