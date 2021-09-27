import React from "react";

class BrandTable extends React.Component {

  // 格式化时间
  formatTime(ctime) {
    return ctime.getFullYear() + "-" + addZero(ctime.getMonth() + 1) + "-" + addZero(ctime.getDate()) + " " + addZero(ctime.getHours()) + ":" + addZero(ctime.getMinutes()) + ":" + addZero(ctime.getSeconds())
  }

  // 点击删除
  delBrand = (id) => {
    this.props.delBrand(id);
  }


  render() {
    return (
      <table border="1">
        <thead>
          <tr >
            <th>编号</th>
            <th>品牌名称</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {this.props.brandList.map(val => (
            <tr key={val.id}>
              <td>{val.id}</td>
              <td>{val.name}</td>
              <td>{this.formatTime(val.ctime)}</td>
              <td><a href="#!" onClick={this.delBrand.bind(this, val.id)}>删除</a></td>
            </tr>
          ))}
        </tbody>
      </table>

    )
  }
}

function addZero(num) {
  return num <= 9 ? "0" + num : num;
}

export default BrandTable;