import React from "react";
import "./index.css";
// 导入 列表
import BrandTable from "../BrandTable"
// 导入 表单
import BrandForm from '../BrandForm'

class BrandList extends React.Component {

  // 初始化数据
  state = {
    // 品牌列表
    brandList: [
      {
        id: 1,
        name: "品牌1",
        ctime: new Date()
      }
    ]
  }

  // 点击添加
  addBrand = (id, name) => {
    this.setState({
      brandList: [...this.state.brandList, { id, name, ctime: new Date() }]
    })
  }

  // 点击删除
  delBrand = (id) => {
    this.setState({
      brandList: this.state.brandList.filter(val => val.id !== id)
    })
  }


  render() {
    return (
      <div>
        <BrandForm addBrand={this.addBrand}></BrandForm>
        <BrandTable brandList={this.state.brandList} delBrand={this.delBrand}></BrandTable>
        <p>{this.state.brandList.length === 0 ? "暂无数据" : ""}</p>
      </div>
    )
  }
}

export default BrandList;