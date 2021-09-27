import React from "react";
// 导入路由
import { NavLink, Redirect } from "react-router-dom"
import { renderRoutes } from "react-router-config"

class VideoCom extends React.Component {
  render() {
    return (
      <div>
        <Redirect to="/video/web"></Redirect>
        <h2>Video页面</h2>
        <div>
          <NavLink to="/video/web" className="aside-nav" activeClassName="video-nav-active">Web视频</NavLink>
          <NavLink to="/video/vue" className="aside-nav" activeClassName="video-nav-active">Vue视频</NavLink>
          <NavLink to="/video/react" className="aside-nav" activeClassName="video-nav-active">React视频</NavLink>
          <NavLink to="/video/php" className="aside-nav" activeClassName="video-nav-active">PHP视频</NavLink>
        </div>
        <div>
          {renderRoutes(this.props.route.routes)}
        </div>
      </div>
    )
  }
}

export default VideoCom;