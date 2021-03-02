// pages/cates/cates.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 所有分类
    categories: [],
    // 所选分类
    activeKey: "",
    // 右侧分类内容数据
    rightSideData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 获取所有分类
    this.getCategories();
  },

  // 获取所有分类
  getCategories() {
    const _this = this;
    // 发起请求
    wx.request({
      url: 'https://www.uinav.com/api/public/v1/categories',
      success(res) {
        // 保存数据
        _this.setData({
          categories: res.data.message,
          activeKey: res.data.message[0].cat_id,
          rightSideData: res.data.message[0].children
        }) 
      }
    })
  },
  // 选择分类
  chooseCategories(e) {
    // 切换所选的分类，分类内容
    this.setData({
      activeKey: e.target.dataset.id,
      rightSideData: this.data.categories[e.target.dataset.index].children
    })
  },
  chooseLeafCategories(e) {
     // 跳转到商品列表页 （并传递关键字）
     wx.navigateTo({
      url: '/pages/goodsList/goodsList?cid='+e.currentTarget.dataset.cid
    })
  }
})