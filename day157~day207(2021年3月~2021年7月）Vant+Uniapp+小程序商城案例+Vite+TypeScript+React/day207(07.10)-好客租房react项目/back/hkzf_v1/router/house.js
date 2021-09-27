const router = require('koa-router')();
const house = require('../controllers/house');
// router.post();
router
    .post('/image', house.image) // 图片上传
    .get('/condition', house.dimension) // 查询房屋的各种条件
    .get('/params', house.release)
    // .get('/swiper' , house.swiper) //首页轮播图
    // .get('/groups' , house.groups) // 租房小组
    // .get('/news' , house.news) //咨询

    .get('/:id', house.getHouse)// 查询房屋的具体信息
    .get('/', house.House) //返回地区列表
module.exports = router;
