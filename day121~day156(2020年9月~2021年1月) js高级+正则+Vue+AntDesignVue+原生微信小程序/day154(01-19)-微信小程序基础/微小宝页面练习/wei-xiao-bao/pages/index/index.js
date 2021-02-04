//index.js
//获取应用实例
const app = getApp()
let salesStartX, salesEndX;
let salesTouchFlag = true;

// 实例化页面
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    userInfo: {},
    // 是否已经获取用户信息
    hasUserInfo: false,
    // 是否可以使用按钮获取用户信息
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 销量栏被选中的tab
    salesTabActive: "total",
    // 销量数据
    salesData: [{
      id: 1,
      rank: 1,
      name: "美宝莲",
      price: 200,
      orderNum: 124,
      billNum: 68
    }, {
      id: 2,
      rank: 2,
      name: "SKII",
      price: 199,
      orderNum: 188,
      billNum: 98
    }, {
      id: 3,
      rank: 3,
      name: "红腰子",
      price: 188,
      orderNum: 146,
      billNum: 80
    }, {
      id: 4,
      rank: 4,
      name: "美宝莲",
      price: 200,
      orderNum: 124,
      billNum: 68
    }],
    // 销量数据配色
    salesDataColor: {
      order: "#7497f6",
      bill: "#fad673"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 获取用户信息
   */
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 切换sales Tab
   */
  swichSalesTab(e) {
    // 切换销量栏tab
    this.setData({
      salesTabActive: e.target.dataset.tab
    })
  },

  /**
   * 销量栏左右滑动
   */
  salesTouchStart(e) {
    // 记录开始滑动x位置
    salesStartX = e.touches[0].pageX;
    // 滑动开始
    salesTouchFlag = true;
  },
  salesTouchMove(e) {
    // 记录滑动x位置
    salesEndX = e.touches[0].pageX;
    // 节流
    if (salesTouchFlag) {
      if (salesEndX - salesStartX > 50) {
        // 切换销量栏tab
        this.setData({
          salesTabActive: 'total'
        })
        // 滑动结束
        salesTouchFlag = false;
      }
      if (salesStartX - salesEndX > 50) {
        // 切换销量栏tab
        this.setData({
          salesTabActive: 'now'
        })
        // 滑动结束
        salesTouchFlag = false;
      }
    }
  },

})