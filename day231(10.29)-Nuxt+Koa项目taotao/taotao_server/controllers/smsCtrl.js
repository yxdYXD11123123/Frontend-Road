const { sendSms, getRandomByLength } = require("../utils")
// 发送短信控制器
module.exports.sendSms = async (ctx) => {
  const { mobile } = ctx.request.body;
  const smsCode = getRandomByLength(4);
  // 发送短信
  const res = await sendSms(mobile, smsCode);
  // 发送成功
  if (res.SendStatusSet[0].Code === "Ok") {
    // 保存手机号对应验证码
    ctx.session[mobile] = smsCode;
    // 响应
    return ctx.body = {
      status: 200,
      data: {
        message: "验证码已发送"
      }
    }
  }
  // 发送失败
  return ctx.body = {
    status: 0,
    message: "验证码发送失败"
  }
}