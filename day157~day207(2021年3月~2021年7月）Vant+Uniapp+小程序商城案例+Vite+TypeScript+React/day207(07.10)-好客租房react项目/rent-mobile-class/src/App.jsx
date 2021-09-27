import React, { Suspense } from 'react';
// 导入路由
import { withRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
// 导入路由配置
import routes from "./routes/routes";
// 引入 底部导航栏
import { TabBar } from "antd-mobile";


// 根组件
class App extends React.PureComponent {
  state = {
    // 是否隐藏 tabbar
    hiddenTabbar: false,
    // tabbar列表
    tabbarList: [{
      title: "首页",
      path: "/home",
      iconName: "icon-ind",
    },
    {
      title: "找房",
      path: "/find-house",
      iconName: "icon-findHouse",
    },
    {
      title: "资讯",
      path: "/news",
      iconName: "icon-infom",
    },
    {
      title: "我的",
      path: "/my",
      iconName: "icon-my",
    }]
  }

  componentDidMount() {
    this.showTabByLocation()
  }

  componentDidUpdate(preProps, preState) {
    this.showTabByLocation();
  }

  //#region 根据 路由 显示/隐藏 tabbar
  showTabByLocation = () => {
    // 每次 切换路由时，其实是在 改变App组件的props.location（withRouter提供的）
    // tabbar页面path列表
    const tabPathList = this.state.tabbarList.map(val => val.path);
    // 当前path
    const curPath = "/" + this.props.location.pathname.split("/")[1];
    // 分析情景：从 路由页 跳转到 非路由页
    // 会触发2次update钩子
    // 1. props.location变化 触发updated，修改 hiddenTabbar为true
    // 2. state.hiddenTabbar变化 再次触发updated，发现 当前hiddenTabbar已为true，不再修改
    // console.log('---------------------------');
    // console.log("上次", preState.hiddenTabbar);
    // console.log('当前', this.state.hiddenTabbar);


    // 其实这里应该用this.state，为什么用preState也行?
    // 当location变化后触发update时，当时的this.state和preState是一致的（因为还没轮到state.hidden变化）

    // 如果当前是tabbar页面，并且tabbar是隐藏状态
    if (tabPathList.includes(curPath) && this.state.hiddenTabbar) {
      // 显示tabbar
      this.setState({
        hiddenTabbar: false
      })
      // 如果当前是非tabbar页面，并且tabbar是显示状态
    } else if (!tabPathList.includes(curPath) && !this.state.hiddenTabbar) {
      // 隐藏tabbar
      this.setState({
        hiddenTabbar: true
      })
    }
  }
  //#endregion

  render() {
    return (
      <div className="App" >
        <Suspense fallback={'加载中'}>
          {/* 路由窗口 */}
          {renderRoutes(routes)}
        </Suspense>
        {/* 底部导航 start */}
        <div className="tabbar" >
          <TabBar barTintColor="#fff" unselectedTintColor="#9b9b9b" tintColor="#75bea1" tabBarPosition="bottom" hidden={this.state.hiddenTabbar}>
            {this.state.tabbarList.map(val => (
              // 导航项
              <TabBar.Item
                key={val.path}
                title={val.title}
                // 如果当前路由中含有 对应path，则选中
                selected={this.props.location.pathname.includes(val.path)}
                // 点击跳转对应路由
                onPress={() => { this.props.history.push(val.path) }}
                icon={<i className={"iconfont " + val.iconName}></i>}
                selectedIcon={<i className={"iconfont " + val.iconName}></i>}
              />
            ))}
          </TabBar>
        </div>
        {/* 底部导航 end */}
      </div>
    )
  }
}

// 根组件中想使用 router中的location history match 时，可以通过withRouter给props提供
export default withRouter(App);


