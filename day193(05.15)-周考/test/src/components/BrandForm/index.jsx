import React from "react";

class BrandForm extends React.Component {
  constructor() {
    super();
    // 创建refs
    this.idInput = React.createRef();
    this.nameInput = React.createRef();
  }


  // 点击添加
  addBrand = () => {
    let id = this.idInput.current.value;
    let name = this.nameInput.current.value;
    // 非空校验
    if (id.trim().length !== 0 && name.trim().length !== 0) {
      this.props.addBrand(id, name);
      this.idInput.current.value = "";
      this.nameInput.current.value = ""
    }
    else {
      alert("请输入内容")
    }
  }


  render() {
    return (
      <div className="shopping-left">
        <input type="text" placeholder="输入编号" ref={this.idInput} />
        <input type="text" placeholder="输入名称" ref={this.nameInput} />
        <button onClick={this.addBrand}>添加数据</button>
        <hr />
      </div>
    )
  }
}

export default BrandForm;