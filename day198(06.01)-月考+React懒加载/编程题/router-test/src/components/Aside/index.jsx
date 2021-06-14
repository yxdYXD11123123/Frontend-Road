import React from "react";
import { NavLink } from "react-router-dom"

// 侧边栏
class Aside extends React.Component {
  render() {
    return (
      <div className="aside">
        <h2>一级导航</h2>
        <div>
          <NavLink to="/animation" className="aside-nav" activeClassName="aside-nav-active">动画</NavLink>
        </div>
        <div>
          <NavLink to="/video" className="aside-nav" activeClassName="aside-nav-active">视频教程</NavLink>
        </div>
        <div>
          <NavLink to="/usermanage" className="aside-nav" activeClassName="aside-nav-active">用户管理</NavLink>
        </div>
      </div>
    )
  }
}

export default Aside;