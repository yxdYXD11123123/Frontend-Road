import React from "react";
// 导入路由
import { renderRoutes } from "react-router-config"
import routes from "../../routes"

// 侧边栏
class Right extends React.Component {
  render() {
    return (
      <div className="right">
        {renderRoutes(routes)}
      </div>
    )
  }
}

export default Right;