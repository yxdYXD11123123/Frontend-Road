const router = require('koa-router')();
const house = require('../controllers/house');
// router.post();
router
    .get('/swiper' , house.swiper) //首页轮播图
    .get('/groups' , house.groups) // 租房小组
    .get('/news' , house.news) //咨询

module.exports = router;
