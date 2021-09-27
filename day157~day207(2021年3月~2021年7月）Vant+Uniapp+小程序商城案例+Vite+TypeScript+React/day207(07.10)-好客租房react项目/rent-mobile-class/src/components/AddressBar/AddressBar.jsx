import React from "react";
// 导入 样式
import styles from "./AddressBar.module.scss";
// 使用路由
import { withRouter } from "react-router-dom"

/**
 * 地址选择条
 */
class AddressBar extends React.Component {

  componentDidMount() {

  }

  // 跳转到城市列表
  navTo = (pathName) => {
    this.props.history.push(pathName);
  }

  render() {
    return (
      <div className={this.props.className + ' ' + styles.addressbar}>
        {/* <div></div> */}
        <div className={styles.search}>
          {/* 当前选择城市 */}
          <span onClick={() => { this.navTo("/city-list") }}>上海 <i className="iconfont icon-arrow"></i> </span>
          <span><i className="iconfont icon-seach"></i>请输入小区或地址</span>
        </div>
        {/* 查看地图 */}
        <i className={"iconfont icon-map" + " " + styles.map} onClick={() => { this.navTo("/map") }}></i>
      </div>
    )
  }
}

export default withRouter(AddressBar);