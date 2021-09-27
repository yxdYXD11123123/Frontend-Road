import React from "react";
// 引入轮播图
import { Carousel, Grid } from "antd-mobile";
// 导入 地址条 组件
import AddressBar from "@/components/AddressBar/AddressBar"
// 导入 轮播图数据 api
import { getHomeSwiper, getHomeGroups, getHomeNews } from "@/api"
// 导入 样式
import styles from "./Home.module.scss";

// 导入导航栏 图片
import Nav1 from "@/assets/images/nav_1.png";
import Nav2 from "@/assets/images/nav_2.png";
import Nav3 from "@/assets/images/nav_3.png";
import Nav4 from "@/assets/images/nav_4.png";

import { BASE_URL } from "@/utils/url";

/**
 * 首页
 */
class Home extends React.Component {
  // 初始化数据
  state = {
    // 轮播图列表
    swiperList: [],
    // 当前轮播索引
    slideIndex: 0,
    // 租房小组
    rentList: [],
    // 最新资讯
    newsList: []
  }

  // 导航栏 数据列表
  navList = [
    {
      id: 1,
      img: Nav1,
      title: "整租"
    },
    {
      id: 2,
      img: Nav2,
      title: "合租"
    },
    {
      id: 3,
      img: Nav3,
      title: "地图找房"
    },
    {
      id: 4,
      img: Nav4,
      title: "去出租"
    },
  ]

  componentDidMount() {
    // 获取 轮播图列表
    this.getSwiperList();
    // 获取 租房小组列表
    this.getRentList();
    // 获取 最新资讯列表
    this.getNewsList();
  }

  componentDidUpdate() {
    // 确保添加轮播图数据后，轮播图可以正常轮播
    if (this.state.slideIndex !== this.state.swiperList.length - 1) {
      /* eslint react/no-did-update-set-state: 0 */
      this.setState({ slideIndex: this.state.swiperList.length - 1 });
    }
  }

  // 获取轮播图数据
  getSwiperList = async () => {
    // 发起请求
    const list = await getHomeSwiper();
    // 更新数据
    this.setState({
      swiperList: list
    })
  }

  // 获取租房小组数据
  getRentList = async () => {
    // 发起请求
    const list = await getHomeGroups();
    // 更新数据
    this.setState({
      rentList: list
    })
  }

  // 获取最新资讯数据
  getNewsList = async () => {
    // 发起请求
    const list = await getHomeNews();
    // 更新数据
    this.setState({
      newsList: list
    })
  }

  render() {
    return (
      // 首页 start
      <div className={styles.home}>
        {/* 地址条 start */}
        <AddressBar className={styles.addressbar}></AddressBar>
        {/* 地址条 end */}

        {/* 轮播图 start */}
        {this.state.swiperList.length > 0 ?
          <Carousel autoplay infinite selectedIndex={this.state.slideIndex}>
            {this.state.swiperList.map(item => (
              <div key={item.id}>
                <img
                  src={BASE_URL + item.imgSrc}
                  alt=""
                  style={{ width: "100%" }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              </div>
            ))}
          </Carousel>
          : ''}
        {/* 轮播图 end */}

        {/* 导航栏 start */}
        <div className={styles.navbar}>
          {
            this.navList.map(val => (
              <div key={val.id}>
                <img src={val.img} alt="" />
                <p>{val.title}</p>
              </div>
            ))
          }
        </div>
        {/* 导航栏 end */}

        {/* 租房小组 start */}
        <div className={styles.rent}>
          <div className={styles['rent-title']}>
            租房小组 <span>更多</span>
          </div>
          <div className={styles['rent-content']}>
            {/* 使用Grid其实是为了有点击反馈效果 */}
            <Grid
              data={this.state.rentList}
              columnNum={2}
              hasLine={false}
              square={false}
              renderItem={(item) => (
                <div className={styles['rent-items']}>
                  <div>
                    <p>{item.title}</p>
                    <p>{item.desc}</p>
                  </div>
                  <img src={BASE_URL + item.imgSrc} alt="" />
                </div>
              )}>
            </Grid>
          </div>
        </div>
        {/* 租房小组 end */}

        {/* 最新资讯 start */}
        <div className={styles.news}>
          <div className={styles['news-title']}>
            最新资讯
          </div>
          <div className={styles['news-content']}>
            {this.state.newsList.map(val => (
              <div key={val.id} className={styles['news-items']}>
                <img src={BASE_URL + val.imgSrc} alt="" />
                <div>
                  <h3>{val.title}</h3>
                  <p>{val.from} <span>{val.date}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* 最新资讯 end */}
      </div>
      // 首页 end
    )
  }
}

export default Home;