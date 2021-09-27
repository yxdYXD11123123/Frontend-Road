import React from "react";
// 引入样式文件
import styles from "./index.module.css"

class UseCssModuleCom extends React.Component {
  render() {
    return (
      // 使用 样式
      <div className={styles['bgc']} id={styles.bgc}>背景色</div>
    )
  }
}

export default UseCssModuleCom;