import React from 'react';

class ThisCom extends React.Component {
  constructor() {
    super()
    // 方式二：使用修改this指向
    this.clickHandler = this.clickHandler.bind(this);
  }

  // 不使用箭头函数
  clickHandler() {
    console.log(this);
  }

  // 使用箭头函数
  clickHandlerFn = () => {
    console.log(this);
  }

  render() {
    return (
      <div>
        {/* 方式一：利用箭头函数，让函数体中的this可以指向实例 */}
        <div onClick={() => { this.clickHandler() }}>利用箭头函数</div>
        {/* 方式二：在构造器中，使用bind方法修改函数this指向 */}
        <div onClick={this.clickHandler}>使用bind方法</div>
        {/* 方式三：直接声明时使用箭头函数 */}
        <div onClick={this.clickHandlerFn}>使用箭头函数形式声明</div>
      </div>
    )
  }
}

// 导出 类组件
export default ThisCom;