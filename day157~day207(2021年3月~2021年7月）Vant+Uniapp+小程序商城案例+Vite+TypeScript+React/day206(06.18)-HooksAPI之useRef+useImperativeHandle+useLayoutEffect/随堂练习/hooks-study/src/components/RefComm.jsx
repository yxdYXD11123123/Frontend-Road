import React, { useEffect, useRef, useState } from "react"

function RefCom(props) {
  // 创建 状态
  const [state, setState] = useState(0);

  // 创建ref
  const stateRef = useRef();

  // 普通变量 没有缓存 (每次渲染都是创建的新对象)
  const obj = {
    current: null
  }

  // 数据更新后，更新ref的值
  useEffect(() => {
    // 保存更新后的数据
    stateRef.current = state;
    // 保存到普通变量
    obj.current = state;
  }, [state]) // state数据更新时

  return (
    <div>
      <div>当前数据状态：{state}</div>
      {/* 第一次渲染 stateRef.current 时，current其实还是undefined， 
      第二次渲染时，渲染的是上次数据更新时，设置的current值 */}
      <div>通过ref.current记录上次的值：{stateRef.current}</div>
      {/* 普通变量 缓存不了上一次的值 */}
      <div>普通值：{obj.current}</div>
      <input type="text" value={state} onChange={(e) => { setState(e.target.value) }} />
    </div>
  )
}

export default RefCom;