const router = require('koa-router')()

// 导入控制器
const { gridlist, banners, sports } = require('../controllers/indexCtrl')

// 首页宫格数据
router.get("/gridList", gridlist);

// 轮播图接口
router.get("/banners", banners);

// 运动专区接口
router.get("/sports", sports);


module.exports = router
