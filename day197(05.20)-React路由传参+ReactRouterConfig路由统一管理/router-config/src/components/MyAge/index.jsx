import React from "react"
import { Link } from "react-router-dom"

function MyAge() {
  return (
    <div>
      <div>我的年龄：23</div>
      <div><Link to="/my/name">我的名字</Link> | </div>
    </div>
  )
}

export default MyAge;