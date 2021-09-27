/**
 * 地图找房 页面  FindHouseByMap (Hooks API)
 */

import React, { useEffect } from "react";
// 导入 导航栏
import { NavBar, Icon } from "antd-mobile";
// 导入样式
import styles from "./Map.module.scss"

function FindHouseByMap(props) {
  useEffect(() => {
    console.log(1);
    var map = new BMap.Map("container");
    // 创建地图实例  
    var point = new BMap.Point(116.404, 39.915);
    // 创建点坐标  
    map.centerAndZoom(point, 15);
    // 初始化地图，设置中心点坐标和地图级别
  }, [])

  // 返回上一页
  const navBack = () => {
    props.history.goBack();
  }


  return (
    <div className={styles['map']}>
      {/* 顶部导航 */}
      <NavBar className={styles['am-navbar-light']} mode="light" onLeftClick={navBack} icon={<Icon type="left" color={'grey'} />} >地图找房</NavBar>
      {/* 地图 */}
      <div id="container" className={styles['container']}></div>
    </div>
  )
}

export default FindHouseByMap;