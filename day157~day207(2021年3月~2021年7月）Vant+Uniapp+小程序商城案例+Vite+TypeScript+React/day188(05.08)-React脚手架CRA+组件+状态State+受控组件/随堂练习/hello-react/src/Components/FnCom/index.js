import React from 'react';

function FnCom() {
  const clickHandler = (e) => {
    // 普通的函数组件，没有实例化，this指向也就是undefined，也就没有组件实例的state等属性，所以只能作为静态的无状态组件
    console.log(this); // undefined
    console.log(e); // 此时的事件对象，已经是React封装后的事件对象
  }

  return (
    <div onClick={clickHandler}>我是函数式组件</div>
  )
}

// 导出 函数组件
export default FnCom;