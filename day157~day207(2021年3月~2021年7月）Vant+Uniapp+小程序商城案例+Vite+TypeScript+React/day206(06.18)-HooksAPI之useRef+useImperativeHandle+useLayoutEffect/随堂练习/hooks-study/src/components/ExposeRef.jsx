import React, { forwardRef, useImperativeHandle, useRef } from 'react'

function ExposeRef(props, ref) {
  const inputRef = useRef();
  // 指定 ref 返回的 current实例
  // 指定 为 当前组件中 inputRef获取的input Dom元素
  useImperativeHandle(ref, () => inputRef.current);

  return (
    <div>
      <div>函数组件向父组件暴露自定义实例值</div>
      <div>
        <input type="text" ref={inputRef} />
      </div>
    </div>
  )
}

// 使用forwardRef让函数组件可以接收ref参数
export default forwardRef(ExposeRef)