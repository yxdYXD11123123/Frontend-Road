import React, { useEffect, useRef } from 'react'
import RefCom from './components/RefComm';
// 导入类组件
import ClassCom from "./components/ClassCom";
// 导入 暴露自定义实例的函数组件
import ExposeRef from './components/ExposeRef';

function App() {
  const classRef = useRef();

  const customRef = useRef();

  useEffect(() => {
    console.log(classRef);
    console.log(customRef);
    // {current: input}
  })

  return (
    <div className="App">
      <div>RefCom</div>
      {/* 可以用ref获取类组件 */}
      <ClassCom ></ClassCom>
      <RefCom></RefCom>
      <ExposeRef ref={customRef}></ExposeRef>
    </div>
  )
}

export default App
