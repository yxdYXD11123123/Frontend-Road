const router = require('koa-router')();
const house = require('../controllers/house');
// router.post();
router
    .get('/city', house.getAreaType) //返回地区列表
    .get('/hot', house.popular) // 根据地区返回房屋列表
    .get('/info', house.areaName) //根据城市的名称查询城市的具体信息
    .get('/community', house.community) //关键词查小区
    .get('/map' ,house.position) // 查询城市的坐标
    .get('/' , house.subordinate) //查询城市的子集菜单
module.exports = router;
