const router = require("koa-router")();

// 给当前users路由添加/users前缀
router.prefix('/cates')

// 导入 路由控制器
const { oneCategory, twoCategory } = require('../controllers/catesCtrl')

// 一级分类接口
router.get("/oneCategory", oneCategory);

// 二级分类接口
router.get("/twoCategory", twoCategory);

module.exports = router;