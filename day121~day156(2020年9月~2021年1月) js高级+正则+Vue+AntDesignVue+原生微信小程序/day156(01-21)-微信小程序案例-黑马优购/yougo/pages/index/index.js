// index.js
Page({
  data: {
    // 轮播图 
    swiper: {
      // 数据
      data: []
    },
    // 分类选项
    cates: [],
    // 楼层数据
    floors: []
  },
  onLoad() {
    // 获取轮播图数据
    this.getSwiperData();
    // 获取分类选项数据
    this.getCates();
    // 获取楼层数据
    this.getFloors();
    // 根据本地storage设置购物车徽章
    const goodsInCart = wx.getStorageSync('goodsInCart');
    goodsInCart == '' ? null : wx.setTabBarBadge({
      index: 2,
      text: goodsInCart == '' ? "" : goodsInCart.length.toString(),
    })
  },
  // 输入搜索内容
  searchInput(e) {
    this.setData({
      str: e.detail.value
    })
  },
  // 获取轮播图数据
  getSwiperData() {
    const _this = this;
    // 发起请求
    wx.request({
      url: 'https://www.uinav.com/api/public/v1/home/swiperdata',
      success(res) {
        _this.setData({
          'swiper.data': res.data.message
        })
      }
    })
  },
  // 获取分类选项
  getCates() {
    const _this = this;
    // 发起请求
    wx.request({
      url: 'https://www.uinav.com/api/public/v1/home/catitems',
      success(res) {
        _this.setData({
          cates: res.data.message
        })
      }
    })
  },
  // 获取楼层数据
  getFloors() {
    const _this = this;
    // 发起请求
    wx.request({
      url: 'https://www.uinav.com/api/public/v1/home/floordata',
      success(res) {
        _this.setData({
          floors: res.data.message
        });
      }
    })
  },
  // 点击分类
  clickCates(e) {
    if (e.target.dataset.openType == "switchTab") {
      // 切换tabBar
      wx.switchTab({
        url: '/pages/cates/cates',
      })
    }
  },
  // 点击楼层请求
  chooseFloor(e) {
    // 跳转到商品列表页 （并传递关键字）
    wx.navigateTo({
      url: '/pages/goodsList/goodsList?query=' + e.currentTarget.dataset.query.split("=")[1],
    })
  },
  // 点击轮播图
  chooseSwiper(e) {
    const {
      info
    } = e.currentTarget.dataset;
    if (info.open_type == "navigate") {
      wx.navigateTo({
        url: '/pages/goodsDetail/goodsDetail?' + info.navigator_url.split("?")[1],
      })
    }
  }
})