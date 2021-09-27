import React from "react";
import { Redirect } from "react-router-dom"

class User extends React.Component {
  state = {
    isLogin: false
  }

  render() {
    let user = (
      <div>用户页</div>
    )
    // 如果用户没有登录，重定向到登录页
    return this.state.isLogin ? user : <Redirect to="/login"></Redirect>
  }
}

export default User;