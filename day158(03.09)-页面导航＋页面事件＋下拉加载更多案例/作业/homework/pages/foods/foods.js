// 美食页
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 总数据
    total: 0,
    // 第几页
    pageNum: 1,
    // 每页几条数据
    pageSize: 6,
    // 美食列表
    foodList: [],
    // 正在加载中
    isLoading: false,
    // 显示没有更多了
    showNoMore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置title
    wx.setNavigationBarTitle({
      title: this.options.title,
    })
    // 一进入页面，获取第一个美食列表
    this.getFoodList()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 重置
    this.data.pageNum = 1;
    this.setData({
      foodList: []
    });
    // 获取数据
    this.getFoodList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 判断是否已经加载全部数据
    if (this.data.total > this.data.foodList.length) {
      // 加载下一页
      this.data.pageNum += 1;
      const _this = this;
      // 显示加载更多
      wx.showLoading({
        title: '正在加载更多...',
        success() {
          // 发起请求
          _this.getFoodList();
        }
      })
    }
    // 否则显示没有更多数据
    else {
      this.setData({
        showNoMore: true
      })
    }
  },

  /**
   * 加载页面数据，美食列表
   */
  getFoodList() {
    this.isLoading = true;
    const _this = this;
    // 发起获取美食列表的请求
    wx.request({
      url: `https://www.escook.cn/categories/${this.options.id}/shops`,
      data: {
        _page: _this.data.pageNum,
        _limit: _this.data.pageSize
      },
      success(res) {
        _this.data.total = res.header['X-Total-Count'];
        // 将新请求来的数据，补进原数组
        _this.setData({
          foodList: [..._this.data.foodList, ...res.data]
        })
        _this.isLoading = false;
      },
      // 完成后关闭加载中提示框
      complete() {
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    })
  }
})