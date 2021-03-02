// pages/goodsList/goodsList.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 当前页码
    pagenum: 1,
    // 当前每页多少条
    pagesize: 10,
    // 总条数
    total: 0,
    // 商品列表
    goods: [],
    // 排序过的商品
    goodsOrdered: [],
    // 排序方式
    orderKey: "mult",
    // 是否正在下拉刷新
    refreshing: false,
    // 是否显示上拉加载
    showLoadingMore: false,
    // 是否正在上拉加载
    loadingMore: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 显示加载中
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    // 获取商品列表
    this.getGoods(() => {
      // 隐藏加载中
      wx.hideLoading();
      // 开始显示上拉加载
      this.setData({
        showLoadingMore: true
      })
    });
  },
  /**
   * 请求商品列表数据
   * @param {*} callback 请求数据成功后的回调
   */
  getGoods(callback) {
    const _this = this;
    // 如果是下拉刷新，将页码归为第一页
    if (!_this.data.loadingMore) {
      _this.setData({
        pagenum: 1
      })
    }
    // 发起请求
    wx.request({
      url: app.globalData.baseUrl + "/goods/search",
      data: {
        // 请求关键字
        query: this.options.query || "",
        // 商品分类id
        cid: this.options.cid || "",
        // 当前页码
        pagenum: this.data.pagenum,
        // 当前每页多少条
        pagesize: this.data.pagesize
      },
      success(res) {
        // 如果是下拉刷新，就要重新覆盖数组
        if (!_this.data.loadingMore) {
          _this.data.goods = res.data.message.goods;
          // 并确保加载显示
          _this.setData({
            showLoadingMore: true
          })
        } else {
          // 如果是上拉加载更多，给数组添加新元素
          _this.data.goods.push(...res.data.message.goods)
        }
        // 保存数据
        _this.setData({
          goods: _this.data.goods,
          goodsOrdered: _this.data.goods,
          total: res.data.message.total
        })
        // 如果页面最终的总条数已经是总数据的数量，不再显示上拉加载
        if (_this.data.goods.length == _this.data.total) {
          _this.setData({
            showLoadingMore: false
          })
        }
        // 成功后执行回调
        if (callback) callback();
      }
    })
  },
  // 选择排序方式
  chooseOrder(e) {
    // currentTarget和target的区别:
    // target指向的是触发事件的元素
    // currentTarget指向的是捕获事件的元素(也就是元素自身)
    // 排序方式
    const order = e.target.dataset.order;
    // 如果切换了其它排序方式
    if (order != this.data.orderKey) {
      this.setData({
        goodsOrdered: this.changeOrder(order, this.data.goods),
        orderKey: order
      })
    }
  },
  /**
   * 改变排序方式
   * @param {*} order 排序方式
   * @param {*} goods 原始商品列表
   */
  changeOrder(order, goods) {
    // 复制一份新的商品列表
    const _goods = JSON.parse(JSON.stringify(goods))
    switch (order) {
      // 以价格排序
      case 'price':
        return _goods.sort(function (a, b) {
          return b.goods_price - a.goods_price
        })
        break;
        // 综合排序
      case 'mult':
        return _goods
        break;
        // 销量排序
      case 'sales':
        return _goods.sort(function (a, b) {
          return b.goods_number - a.goods_number
        })
        break;
    }
  },
  // 下拉时刷新商品列表
  refreshGoods() {
    this.getGoods(() => {
      // 刷新完成后，关闭下拉刷新状态
      this.setData({
        refreshing: false
      })
    })
  },
  // 上拉触底
  scrollToBottom() {
    // 节流阀，避免同时多次加载
    if (!this.data.loadingMore && this.data.showLoadingMore) {
      this.setData({
        // 开启加载状态
        loadingMore: true,
        // 页码加一
        pagenum: this.data.pagenum + 1
      })
      // 获取数据
      this.getGoods(() => {
        // 成功后，关闭加载状态
        this.setData({
          loadingMore: false
        })
      })
    }
  }
})