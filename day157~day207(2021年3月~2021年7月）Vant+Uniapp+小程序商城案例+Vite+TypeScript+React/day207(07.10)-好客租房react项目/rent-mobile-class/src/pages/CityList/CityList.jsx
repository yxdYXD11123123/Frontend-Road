import React from "react";
// 导入 导航栏 
import { NavBar, Icon } from "antd-mobile"

// 引入 长列表优化组件
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';

// 导入 样式
import styles from "./CityList.module.scss";
// 导入 接口
import { getAreaCity, getHotCity } from "@/api";

//#region 按字母顺序整理城市列表
/**
 * 按字母顺序整理城市列表
 * @param {*} initialList 初始城市列表
 * @returns 返回 整理好的城市列表
 */
const formatCityList = (initialList, resHotCity) => {
  // 整理一个新的城市列表，按照 首字母分块排序
  const cityList = []; // [{shortKey: 'a',navKey,"A", cities: [{},{}]},...]
  // 已整理的首字母
  const hadKey = {};
  // 遍历每一个城市
  initialList.forEach(city => {
    // 城市首字母
    const cityShortKey = city.short.split('')[0];
    // 如果是已经添加的字母
    if (hadKey[cityShortKey]) {
      cityList.some((cityBlock) => {
        // 找到字母区块
        if (cityBlock.shortKey == cityShortKey) {
          // 将城市添加到对应的字母区块中
          cityBlock.cities.push(city);
          //  结束遍历
          return true;
        }
        // 继续遍历
        return false;
      })
    }
    // 如果没有处理过的字目 
    else {
      // 在城市列表中添加
      cityList.push({ shortKey: cityShortKey, navKey: cityShortKey.toUpperCase(), cities: [city] })
      // 记录(有值即可)
      hadKey[cityShortKey] = cityShortKey;
    }
  });
  // 排序
  cityList.sort((a, b) => {
    // 比较字符大小（比较字符编码）
    return a.shortKey > b.shortKey ? 1 : -1;
  });

  // 加入热门城市
  cityList.unshift({ shortKey: '热门城市', navKey: "热", cities: resHotCity })
  // 返回
  return cityList;
}
//#endregion

/**
 * 城市列表
 */
class CityList extends React.Component {
  constructor() {
    super();
    this.cityListRef = React.createRef();
  }

  state = {
    // 城市列表
    cityList: [],
    // 当前字母区 索引
    curActive: 0
  }

  componentDidMount() {
    this.updateCityList();
  }

  // 更新城市列表数据
  updateCityList = async () => {
    // 获取城市列表
    const resAreaCity = await getAreaCity(1);
    // 获取热门城市
    const resHotCity = await getHotCity();
    // 更新 整理好的城市列表数据
    this.setState({
      cityList: formatCityList(resAreaCity, resHotCity)
    })
  }

  // 返回上一页
  navBack = () => {
    this.props.history.goBack();
  }

  // 每个字母对应的行渲染器
  rowRenderer = ({ index, key, style }) => {
    const cityBlock = this.state.cityList[index];

    return (
      <div key={key} style={style} className={styles['city-block']}>
        {/* 首字母 */}
        <div>{cityBlock.shortKey.toUpperCase()}</div>
        {/* 同首字母城市 */}
        {cityBlock.cities.map(city => (
          <p key={city.value}>{city.label}</p>
        ))}
      </div>
    )
  }

  // 每行的行高
  rowHeight = ({ index }) => {
    const cityBlock = this.state.cityList[index]
    // 城市名每行50px, 字母行36px
    return cityBlock.cities.length * 50 + 36;
  }

  // 滚动城市列表时
  onScrollCityList = ({ scrollTop }) => {
    // // 高度
    // let height = 0;
    // this.state.cityList.some((cityBlock, index) => {
    //   height += cityBlock.cities.length * 50 + 36;
    //   // console.log('height:' + height + "   scrollTop" + scrollTop);
    //   if (height > scrollTop) {
    //     // 更新当前索引位置
    //     this.setState({
    //       curActive: index
    //     })
    //     // 中止
    //     return true;
    //   }
    // })
  }

  // 完成行渲染时 （会在行滑到视图边缘时触发，所以我们可以利用这个函数更新 curActive）
  onRowsRendered = ({ overscanStartIndex, overscanStopIndex, startIndex, stopIndex }) => {
    if (startIndex !== this.state.curActive) {
      this.setState({
        curActive: startIndex
      })
    }
  }

  // 滚动到某一字母区域
  scrollTo = (index) => {
    // 使用ref时，注意使用current
    this.cityListRef.current.scrollToRow(index);
  }


  render() {
    return (
      <div className={styles['city-list']}>
        {/* 顶部 */}
        <NavBar mode="light" className={styles['am-navbar-light']} onLeftClick={this.navBack} icon={<Icon type="left" color={'grey'} />} >城市选择</NavBar>
        {/* 城市列表 start */}
        <AutoSizer>
          {({ width, height }) => (
            <div className={styles['city-list-content']} style={{ width: width + "px", height: height - 45 + 'px' }}>
              {/* 城市列表 start */}
              <List
                ref={this.cityListRef}
                width={width}
                height={height - 45}
                overscanRowCount={5}
                rowCount={this.state.cityList.length}
                rowHeight={this.rowHeight}
                rowRenderer={this.rowRenderer}
                scrollToAlignment={'start'}
                onScroll={this.onScrollCityList}
                onRowsRendered={this.onRowsRendered}
              />
              {/* 城市列表 end */}

              {/* 侧边导航栏 start */}
              <div className={styles['key-nav']}>
                {
                  this.state.cityList.map((cityBlock, index) => (
                    <div key={cityBlock.navKey} className={this.state.curActive === index ? styles['active'] : ''}>
                      {/* 点击字母 跳转对应位置 */}
                      <span onClick={() => { this.scrollTo(index) }}>{cityBlock.navKey}</span>
                    </div>
                  ))
                }
              </div>
              {/* 侧边导航栏 end */}
            </div>
          )}
        </AutoSizer>
        {/* 城市列表 end */}
      </div >
    )
  }
}

export default CityList;