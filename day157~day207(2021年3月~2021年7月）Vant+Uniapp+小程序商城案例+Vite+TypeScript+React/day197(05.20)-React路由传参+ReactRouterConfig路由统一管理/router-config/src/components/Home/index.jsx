import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div> Home页 </div>
      <div><Link to="/my/name">去个人中心</Link> | </div>
    </div>
  )
}

export default Home;