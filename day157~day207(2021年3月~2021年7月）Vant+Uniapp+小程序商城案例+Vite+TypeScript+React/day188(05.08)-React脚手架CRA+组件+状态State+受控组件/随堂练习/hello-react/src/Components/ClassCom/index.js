import React from 'react';

class ClassCom extends React.Component {
  clickHandler = () => {
    console.log('类组件事件');
  }

  render() {
    return (
      <div onClick={this.clickHandler}>我是类组件</div>
    )
  }
}

// 导出 类组件
export default ClassCom;