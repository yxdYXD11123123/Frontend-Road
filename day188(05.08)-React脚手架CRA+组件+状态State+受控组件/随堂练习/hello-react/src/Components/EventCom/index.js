import React from 'react';

function FnCom() {
  const clickHandler = (e) => {
    console.log(e);
    // 此时的事件对象，已经是React包装过的事件对象
    // SyntheticBaseEvent {_reactName: "onClick", _targetInst: null, type: "click", nativeEvent: MouseEvent, target: div, …}
    // 想拿到原生的事件对象，需要 e.nativeEvent
    console.log(e.nativeEvent);
    // MouseEvent {isTrusted: true, screenX: 854, screenY: 216, clientX: 78, clientY: 9, …}
  }

  return (
    <div onClick={clickHandler}>我是函数式组件</div>
  )
}

// 导出 函数组件
export default FnCom;