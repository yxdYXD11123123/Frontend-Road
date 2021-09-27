## [react-virtualized](https://github.com/bvaughn/react-virtualized)

#### 使用情景

我们在页面中添加长列表时，DOM结构如果过大, 网页就会出现用户操作体验上的问题, 比如滚动, 点击等常用操作。

同时, 对react的虚拟DOM计算以及虚拟DOM反映到真实DOM的压力也会很大. 当用户点击切换教室时, 就会出现秒级的卡顿

### 安装

```shell
npm install react-virtualized --save
```

### 使用

```js
// You can import any component you want as a named export from 'react-virtualized', eg
// 你可以像这样引入任何你需要的组件
import {Column, Table} from 'react-virtualized';

// But if you only use a few react-virtualized components,
// 但是如果你只使用 某几个组件
// And you're concerned about increasing your application's bundle size,
// 并且你不希望增加你的打包体积
// You can directly import only the components you need, like so:
// 你可以像下面这样引用
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';
```

### List

```jsx
// 行渲染器
function rowRenderer({
  index, // 行索引
  isScrolling, // 是否正在滚动
  isVisible, // 该行是否正显示在列表中
  key, // 唯一key
  parent, // Reference to the parent List (instance)
  style, // 用在行元素上的样式对象（用来定位的行元素的）
  // This must be passed through to the rendered row element.
}) {
  // 直接 用提供好的index索引，去使用我们要渲染的列表数据
  const user = list[index];

  // If row content is complex, consider rendering a light-weight placeholder while scrolling.
  // 如果 行内容 很复杂，建议用一个 轻量的占位符
  const content = isScrolling ? '...' : <User user={user} />;

  // Style is required since it specifies how the row is to be sized and positioned.
  // React Virtualized depends on this sizing/positioning for proper scrolling behavior.
  // By default, the List component provides following style properties:
  //    position
  //    left
  //    top
  //    height
  //    width
  // You can add additional class names or style properties as you would like.
  // Key is also required by React to more efficiently manage the array of rows.
  // 这里要注意：style和key都是必需的
  return (
    <div key={key} style={style}>
      {content}
    </div>
  );
}
```

```jsx
<List
  ref={this.cityListRef} // 获取List实例，用来使用scrollToRow，scrollToPosition等方法
  width={width} // 窗口宽度
  height={height - 45}  // 窗口高度
  overscanRowCount={20} // 预渲染的行数
  rowCount={this.state.cityList.length}  // 列表数
  rowHeight={20} // 每列高度 （可传函数 定制不确定高度）
  rowRenderer={rowRenderer} // 行渲染器
  scrollToAlignment={'start'} // 滚动到某行时的对齐方式
  onScroll={this.onScrollCityList} // 滚动事件
/>
```

#### 属性列表

| Property          | Type               | Required? | Description                                                  |
| ----------------- | ------------------ | --------- | ------------------------------------------------------------ |
| autoHeight        | Boolean            |           | Outer `height` of `List` is set to "auto". This property should only be used in conjunction with the `WindowScroller` HOC. |
| className         | String             |           | Optional custom CSS class name to attach to root `List` element. |
| estimatedRowSize  | Number             |           | Used to estimate the total height of a `List` before all of its rows have actually been measured. The estimated total height is adjusted as rows are rendered. |
| height            | Number             | ✓         | Height constraint for list (determines how many actual rows are rendered) |
| id                | String             |           | Optional custom id to attach to root `List` element.         |
| noRowsRenderer    | Function           |           | Callback used to render placeholder content when `rowCount` is 0 |
| onRowsRendered    | Function           |           | Callback invoked with information about the slice of rows that were just rendered: `({ overscanStartIndex: number, overscanStopIndex: number, startIndex: number, stopIndex: number }): void` |
| onScroll          | Function           |           | Callback invoked whenever the scroll offset changes within the inner scrollable region: `({ clientHeight: number, scrollHeight: number, scrollTop: number }): void` |
| overscanRowCount  | Number             |           | Number of rows to render above/below the visible bounds of the list. This can help reduce flickering during scrolling on certain browsers/devices. See [here](https://github.com/bvaughn/react-virtualized/blob/master/docs/overscanUsage.md) for an important note about this property. |
| rowCount          | Number             | ✓         | Number of rows in list.                                      |
| rowHeight         | Number or Function | ✓         | Either a fixed row height (number) or a function that returns the height of a row given its index: `({ index: number }): number` |
| rowRenderer       | Function           | ✓         | Responsible for rendering a row. [Learn more](https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md#rowrenderer). |
| scrollToAlignment | String             |           | Controls the alignment scrolled-to-rows. The default ("*auto*") scrolls the least amount possible to ensure that the specified row is fully visible. Use "*start*" to always align rows to the top of the list and "*end*" to align them bottom. Use "*center*" to align them in the middle of container. |
| scrollToIndex     | Number             |           | Row index to ensure visible (by forcefully scrolling if necessary) |
| scrollTop         | Number             |           | Forced vertical scroll offset; can be used to synchronize scrolling between components |
| style             | Object             |           | Optional custom inline style to attach to root `List` element. |
| tabIndex          | Number             |           | Optional override of tab index default; defaults to `0`.     |
| width             | Number             | ✓         | Width of the list                                            |

##### onRowsRendered

完成行渲染时 （会在行滑到视图边缘时触发）



#### 方法

##### scrollToRow (index: number) 滚动到某一行

```jsx
this.cityListRef.current.scrollToRow(index);
```



### AutoSizer

尽可能占满剩余空间

#### 注意：

* 其实这个组件的功能可以用flex布局实现，知道即可



### 实例

城市列表页面

```jsx
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

  // 完成行渲染时 （会在行滑到视图边缘时触发，所以我们可以利用这个函数更新 curActive，这样就不需要onScroll时计算对比高度来更新index了）
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
```

