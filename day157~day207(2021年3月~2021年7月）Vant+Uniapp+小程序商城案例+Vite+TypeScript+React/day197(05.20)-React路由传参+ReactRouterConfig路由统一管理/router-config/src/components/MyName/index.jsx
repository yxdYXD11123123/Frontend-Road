import React from "react"
import { Link } from "react-router-dom"

function MyName() {
  return (
    <div>
      <div>我的名字：frank</div>
      <div><Link to="/my/age">我的年龄</Link> | </div>
    </div>
  )
}

export default MyName;