import React, { useEffect, useRef, useState } from "react"

function RefCom(props) {
  const [count, setCount] = useState(0)
  // 使用 useRef()
  const countRef = useRef();

  useEffect(() => {
    countRef.current = count;
  }, [count])

  return (
    <div>
      <div>count: {count}</div>
      <div>countRef.current: {countRef.current}</div>
      {/* 修改count */}
      <button onClick={() => { setCount(count + 1) }}>修改count</button>
    </div>
  )
}

export default RefCom;