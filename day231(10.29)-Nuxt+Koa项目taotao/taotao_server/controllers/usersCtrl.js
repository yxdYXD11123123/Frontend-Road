const Joi = require("joi");
const jwt = require('jsonwebtoken');
const { jwtSecret, SALT } = require("../config");
// 导入加密方式
const { cryptoPaddWord } = require('../utils')
// 导入 Models
const { userRegister, userFindByMobileOrUname, userFindByNameAndPwd } = require("../models/usersModel")

// 用户注册
module.exports.register = async (ctx) => {
  // 获取注册信息
  const { username, password, repeat_password, mobile, sms } = ctx.request.body;

  // 设定校验规则
  const schema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,20}$/).required(),
    repeat_password: Joi.ref('password'),
    //手机号正则  
    mobile: Joi.string().pattern(/^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/).required()
  })

  // 获取校验结果
  const varify = schema.validate({ username, password, repeat_password, mobile });

  // 如果校验有问题
  if (varify.error) {
    // 返回错误信息
    return ctx.body = {
      status: 0,
      message: "注册失败：" + varify.error.details[0].message
    }
  };

  // 是否存在该用户（用户名和密码都要保持唯一）
  const sameMobile = await userFindByMobileOrUname(mobile, username);
  if (sameMobile.length != 0) return ctx.body = {
    status: 0,
    message: '用户名或手机号已经存在'
  }

  // 验证码错误
  if (ctx.session[mobile] !== sms) return ctx.body = {
    status: 0,
    message: '验证码错误'
  }

  // 成功注册用户
  const res = await userRegister({ username, password: cryptoPaddWord(password + SALT), mobile });
  if (res.affectedRows) {
    return ctx.body = {
      status: 200,
      message: '用户注册成功'
    };
  }

  // 未成功
  ctx.body = {
    status: 0,
    message: '服务端错误'
  };
}


// 登录 控制器
module.exports.login = async (ctx) => {
  // 获取注册信息
  const { username, password } = ctx.request.body;

  //  查询用户名和密码是否正确
  const res = await userFindByNameAndPwd(username, cryptoPaddWord(password + SALT));

  if (res.length != 0) {
    const { mobile } = res[0]
    // 生成token
    const token = jwt.sign(
      {
        username,
        password
      },
      // 设置salt
      jwtSecret,
      {
        // 设置有效期
        expiresIn: '1h'
      }
    );

    // 登录成功，返回token
    return ctx.body = {
      status: 200,
      data: {
        token,
        userInfo: { username, mobile }
      },
    }
  }

  // 登录失败
  ctx.body = {
    status: 0,
    message: "用户名和密码错误，登录失败"
  }
}