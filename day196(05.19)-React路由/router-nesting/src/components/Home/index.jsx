import React from "react";
import { Link } from "react-router-dom"

class Home extends React.Component {
  render() {
    return (
      <div>
        <p>Home页</p>
        <p><Link to="/my">我的页面</Link></p>
      </div>
    )
  }
}

export default Home;