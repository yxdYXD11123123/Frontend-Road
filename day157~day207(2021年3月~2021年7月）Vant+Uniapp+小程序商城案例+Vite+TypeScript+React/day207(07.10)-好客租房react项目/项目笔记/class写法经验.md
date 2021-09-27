## 在 `componentDidUpdate` 中更新数据时

一定要加判断条件，避免进入死循环

#### 例如：在跟组件中判断是否需要渲染 `tabbar ` 时

```jsx
  componentDidUpdate(preProps, preState) {
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
```

