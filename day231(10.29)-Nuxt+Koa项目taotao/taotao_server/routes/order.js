const router = require('koa-router')();
router.prefix('/order')

const { order, notify, query } = require("../controllers/orderCtrl");

router.post("/create", order);

router.post("/notify", notify);

router.post("/query", query);

module.exports = router;