const app = getApp();
// 商品详情页
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 商品信息
    goodsInfo: {},
    // 商品图片路径（用于预览图片） 
    picsUrl: [],
    // 购物车内商品数量
    goodsNumInCart: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.goods_id);
    // 获取题目详情
    this.getGoodsDetail();
    // 更新购物车内商品数量
    this.updateGoodsNumInCart();
  },
  /**
   * 监听页面关闭
   */
  onUnload() {
    // 商品详情页关闭时，更新tabBar的购物车徽章
    // 根据本地storage设置购物车徽章
    wx.setTabBarBadge({
      index: 2,
      text: wx.getStorageSync('goodsInCart').length.toString(),
    })
  },
  // 获取题目详情
  getGoodsDetail() {
    const _this = this;
    wx.request({
      url: app.globalData.baseUrl + '/goods/detail',
      data: {
        goods_id: this.options.goods_id
      },
      success(res) {
        const {
          message
        } = res.data;
        // 将商品图片的地址都记录下来
        message.pics.forEach((v) => {
          _this.data.picsUrl.push(v.pics_big);
        })
        // 同步数据
        _this.setData({
          goodsInfo: message,
          picsUrl: _this.data.picsUrl
        });
        console.log(_this.data.goodsInfo);
      }
    })
  },
  // 点击轮播图图片，预览图片
  previewPics() {
    wx.previewImage({
      urls: [...this.data.picsUrl]
    })
  },
  // 点击店铺
  navToStore() {
    console.log('跳转店铺');
  },
  // 点击 加入购物车
  addCart() {
    // 将商品信息保存在本地storage中的goodsInCart
    // 先取出现在的storage中的购物车里的商品信息，
    const curGoods = wx.getStorageSync('goodsInCart');
    if (curGoods == '') {
      // 如果storage中还没有存过此信息，新建一个数组放入第一个商品信息，
      const goodsInCart = [this.data.goodsInfo]
      // 存入storage
      wx.setStorageSync('goodsInCart', goodsInCart);
    } else {
      // 如果storage中已经存入此信息
      // 检查当前购物车中是否已有此商品, 如果已有此商品,不添加
      let flag = curGoods.some((val) => val.goods_id == this.data.goodsInfo.goods_id)
      if (!flag) {
        // 取出旧数组放入当前商品信息 
        curGoods.push(this.data.goodsInfo);
        // 保存
        wx.setStorageSync('goodsInCart', curGoods)
      }
    }
    // 提示用户商品添加成功
    wx.showToast({
      title: '商品已添加',
      icon: 'success',
      duration: 500
    })
    // 更新购物车内商品数量
    this.updateGoodsNumInCart();
  },
  // 更新购物车内商品数量
  updateGoodsNumInCart() {
    this.setData({
      goodsNumInCart: wx.getStorageSync('goodsInCart').length
    });
    // wx.setTabBarBadge({
    //   index: 2,
    //   text: wx.getStorageSync('goodsInCart').length.toString()
    // })
  }
})