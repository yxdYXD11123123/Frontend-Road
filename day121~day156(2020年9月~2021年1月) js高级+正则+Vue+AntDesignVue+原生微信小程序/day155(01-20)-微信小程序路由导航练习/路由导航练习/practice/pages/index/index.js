// index.js
Page({
  data: {
    str: ""
  },
  onLoad() {},
  navToAbout() {
    // 导航到tabbar页面
    wx.switchTab({
      url: '/pages/about/about',
      success() {
        console.log('来了关于页');
      }
    })
  },
  navToMine() {
    // 导航到非tabbar页面
    wx.navigateTo({
      url: '/pages/mine/mine?id=12',
      success() {
        console.log('到了个人中心页');
      }
    })
  },
  getWords() {
    let _this = this;
    // 发起请求
    wx.request({
      method: "POST",
      url: 'https://v1.alapi.cn/api/hitokoto',
      data: {
        type: 'g'
      },
      success(res) {
        _this.setData({
          str: res.data.data.hitokoto
        })
      }
    })
  },
  // 点击了新盒子
  tapNewBox(e) {
    console.log(e.detail); // {success: true}
  }
})