import React from "react";

class RefCom extends React.Component {
  constructor() {
    super();
    // 创建Refs，并分配给实例属性
    this.input = React.createRef();

    console.log(this.input); // {current: null}
  }

  // 或者在这里声明
  // input = React.createRef();

  showInput = () => {
    console.log(this.input); // {current: input}
    console.log(this.input.current); // <input type="text"> DOM元素
    // 通过 实例属性 直接使用
    console.log(this.input.current.value);
  }

  render() {
    return (
      <div>
        {/* 通过ref属性 附加到React元素上 */}
        <input type="text" ref={this.input} />
        <br />
        <button onClick={this.showInput}>展示Refs</button>
      </div>
    )
  }
}

export default RefCom;