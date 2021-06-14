import React from "react";
import { Link, Route } from "react-router-dom"

class My extends React.Component {
  render() {
    console.log(this.props); // {history, location, match}

    return (
      <div>
        <h2>My页</h2>
        <p>
          <Link to={{ pathname: "/my/info", search: "?name=dong", state: { age: 11 } }}>我的信息</Link> |
          <Link to="/my/detail/001">我的详情</Link>
        </p>
        <p>
          {/* BrowserRouter 下使用  */}
          {/* <button onClick={() => { this.props.history.push("/my/info") }}>我的信息</button> */}
          <button onClick={() => { window.location.hash = "/my/info?name=frank" }}>我的信息</button>
          <button onClick={() => { window.location.hash = "/my/detail" }}>我的详情</button>
        </p>
        <div>
          {/* 一级路由组件中 指定二级路由 */}
          <Route path={this.props.match.url + "/info"} component={Info}></Route>
          <Route path={this.props.match.url + "/detail/:id"} component={Detail}></Route>
        </div>
      </div>
    )
  }
}

function Info(props) {
  console.log(props.location.state); // {age: 11}
  // 通过 props.location.search 获取 ?xxx=xxx&xxx=xxx 请求参数
  console.log(props.location.search);
  // 通过 URLSearchParams("?xxx=xxx&xxx=xxx") 创建一个整理好请求参数的实例对象
  let query = new URLSearchParams(props.location.search);
  return (
    <div>
      <p>我的信息</p>
      {/* 通过 URLSearchParams 实例的get方法  */}
      <div>我的名字：{query.get("name")}</div>
    </div>
  )
}

function Detail(props) {
  return (
    <div>
      <div>我的详情</div>
      <p>id: {props.match.params.id}</p>
    </div>
  )
}

export default My;