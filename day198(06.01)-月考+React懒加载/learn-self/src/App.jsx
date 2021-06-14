// 引入Suspense
import React, { Suspense } from 'react'
import './App.css';
// 使用懒加载，加载组件
const OtherCom = React.lazy(() => import("./components/OtherCom"))

function App() {
  return (
    <div>
      {/* 使用Suspense的fallback属性，添加加载时显示的内容 */}
      <Suspense fallback={<Waiting></Waiting>}>
        <div>
          {/* 里面随意使用懒加载组件 */}
          <OtherCom></OtherCom>
        </div>
      </Suspense>
    </div>
  )
}

function Waiting() {
  return (
    <div>加载中。。。。</div>
  )
}

export default App;
