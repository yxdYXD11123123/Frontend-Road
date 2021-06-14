import React from "react"
import { Link } from "react-router-dom"
// 引入 路由配置插件
import { renderRoutes } from "react-router-config";

function My(props) {
  // props.route中可以获取当前路由信息
  console.log(props);
  return (
    <div>
      <div>个人中心</div>
      <div><Link to="/home">回到首页</Link> | </div>
      <div>
        {/* 利用当前路由信息中的 routes 继续渲染 嵌套Routes */}
        {renderRoutes(props.route.routes)}
      </div>
    </div>
  )
}

export default My;