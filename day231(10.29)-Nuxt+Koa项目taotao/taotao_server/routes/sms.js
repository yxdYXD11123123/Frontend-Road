const router = require('koa-router')();

const { sendSms } = require("../controllers/smsCtrl")

// 发送手机验证码 接口
router.post("/sendSms", sendSms);

module.exports = router;