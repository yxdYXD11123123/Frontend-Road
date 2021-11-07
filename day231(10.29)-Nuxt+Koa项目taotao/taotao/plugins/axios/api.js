export default ({ $axios }, inject) => {
  // 如何 模块化 api
  inject('api', {
    /**
     * 获取首页轮播图数据
     * @returns {Promise}
     */
    IndexBanners() {
      return $axios.$get("/banners");
    },
    /**
    * 获取宫格数据
    * @returns {Promise}
    */
    IndexGridList() {
      return $axios.$get("/gridList");
    },
    /**
    * 获取运动专区数据
    * @returns {Promise}
    */
    IndexSports() {
      return $axios.$get("/sports");
    },
    /**
     * 获取一级分类
     * @returns {Promise}
     */
    CatesOneCategory() {
      return $axios.$get("/cates/oneCategory");
    },
    /**
     * 获取二级分类
     * @param {*} cid 一级分类id
     * @returns {Promise}
     */
    CatesTwoCategory(cid) {
      return $axios.$get("/cates/twoCategory", { params: { cid } });
    },
    /**
     * 获取手机号验证码
     * @param {*} mobile 手机号
     * @returns {Promise}
     */
    GetSms(mobile) {
      return $axios.$post("/sendSms", { mobile })
    },
    /**
     * 用户注册
     * @param {*} data 注册信息
     * @returns {Promise}
     */
    UserRegister(data) {
      return $axios.$post('/users/register', data)
    },
    /**
     * 用户登录
     * @param {*} data 登录信息
     * @returns {Promise}
     */
    UserLogin(data) {
      return $axios.$post("/users/login", data)
    },
    /**
     * 创建订单
     * @param {*} data 订单信息
     * @returns {Promise}
     */
    CreateOrder(data) {
      return $axios.$post("/order/create", data)
    },
    /**
     * 查询订单
     * @param {*} out_trade_no 商户订单号
     * @returns {Promise}
     */
    QueryOrder(out_trade_no) {
      return $axios.$post("/order/query", { out_trade_no })
    }
  })
}