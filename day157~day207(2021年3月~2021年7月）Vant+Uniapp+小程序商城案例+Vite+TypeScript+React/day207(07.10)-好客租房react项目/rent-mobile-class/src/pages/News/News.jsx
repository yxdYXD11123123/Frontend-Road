import React, { useContext } from "react"
import authProvider from "@/contexts/authContext";
import { Redirect } from "react-router";

function News(props) {
  const auth = useContext(authProvider);


  return (
    // 是否鉴权，未登录跳转到登录页
    auth.auth ?
      <div>
        <h2>News</h2>
        <p>假设这是一个需要登录才可以访问的页面</p>
      </div>
      :
      <Redirect to="/login"></Redirect>
  )
}

export default News;