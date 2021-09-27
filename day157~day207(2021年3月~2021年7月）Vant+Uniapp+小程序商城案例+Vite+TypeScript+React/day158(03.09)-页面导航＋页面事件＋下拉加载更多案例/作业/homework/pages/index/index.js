// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据列表
    carouselList: [],
    // 菜单栏数据列表
    menuList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCarouselInfo();
    this.getMenuInfo();
  },

  /**
   * 获取轮播图carousel栏数据
   */
  getCarouselInfo() {
    let _this = this
    // 发起请求
    wx.request({
      url: 'https://www.escook.cn/slides',
      success(res) {
        if (res.statusCode==200) {
          _this.setData({
            carouselList: res.data
          })
          console.log(_this.data.carouselList);
        }
      }
    })
  },
  /**
   * 获取菜单栏数据
   */
  getMenuInfo() {
    let _this = this
    // 发起请求
    wx.request({
      url: 'https://www.escook.cn/categories',
      success(res) {
        if (res.statusCode==200) {
          _this.setData({
            menuList: res.data
          })
          console.log(_this.data.menuList);
        }
      }
    })
  }
})