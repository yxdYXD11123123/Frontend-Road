import React from "react";
// 导入路由
import { NavLink, Redirect } from "react-router-dom"
import { renderRoutes } from "react-router-config"

class User extends React.Component {
  render() {
    return (
      <div>
        <Redirect to="/usermanage/web?age=20岁&name=鲁正一"></Redirect>
        <h2>Usermanage页面</h2>
        <div>
          <NavLink to="/usermanage/web?age=20岁&name=鲁正一" className="aside-nav" activeClassName="video-nav-active">鲁正一</NavLink>
          <NavLink to="/usermanage/vue?age=21岁&name=徐玥" className="aside-nav" activeClassName="video-nav-active">徐玥</NavLink>
          <NavLink to="/usermanage/react?age=22岁&name=殷洪亮" className="aside-nav" activeClassName="video-nav-active">殷洪亮</NavLink>
          <NavLink to="/usermanage/php?age=23岁&name=刘浩宇" className="aside-nav" activeClassName="video-nav-active">刘浩宇</NavLink>
        </div>
        <div>
          {renderRoutes(this.props.route.routes)}
        </div>
      </div>
    )
  }
}

export default User;