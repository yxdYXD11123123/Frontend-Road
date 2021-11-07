//#region 加密
const crypto = require("crypto");
/**
 * 加密
 * @param {string} password 加密信息
 * @returns 加密后的密文
 */
module.exports.cryptoPaddWord = (password) => {
  // 创建一个Hash对象，用来生成 MD5算法的hash值
  // Hash.update() 用给定的数据 更新 hash值
  // Hash.digest() 计算出 所有被hash的数据的hash值
  return crypto.createHash("MD5").update(password).digest("hex");
}
//#endregion

//#region 发送短信
/**
 * 发送短信
 * @param {string} mobile 手机号
 * @param {string} smscode 短信内容（一般是短信验证码）
 * @returns {Promise} 发送结果
 */
module.exports.sendSms = async (mobile, smscode) => {
  const tencentcloud = require("tencentcloud-sdk-nodejs")

  // 导入对应产品模块的client models。
  const smsClient = tencentcloud.sms.v20210111.Client

  /* 实例化要请求产品(以sms为例)的client对象 */
  const client = new smsClient({
    credential: {
      /* 必填：腾讯云账户密钥对secretId，secretKey。
       * 这里采用的是从环境变量读取的方式，需要在环境变量中先设置这两个值。
       * 你也可以直接在代码中写死密钥对，但是小心不要将代码复制、上传或者分享给他人，
       * 以免泄露密钥对危及你的财产安全。
       * CAM密匙查询: https://console.cloud.tencent.com/cam/capi */
      secretId: process.env.secretId,
      secretKey: process.env.secretKey,
    },
    /* 必填：地域信息，可以直接填写字符串ap-guangzhou，或者引用预设的常量 */
    region: "ap-guangzhou",
    /* 非必填:
     * 客户端配置对象，可以指定超时时间等配置 */
    profile: {
      /* SDK默认用TC3-HMAC-SHA256进行签名，非必要请不要修改这个字段 */
      signMethod: "HmacSHA256",
      httpProfile: {
        /* SDK默认使用POST方法。
         * 如果你一定要使用GET方法，可以在这里设置。GET方法无法处理一些较大的请求 */
        reqMethod: "POST",
        /* SDK有默认的超时时间，非必要请不要进行调整
         * 如有需要请在代码中查阅以获取最新的默认值 */
        reqTimeout: 30,
        /**
         * SDK会自动指定域名。通常是不需要特地指定域名的，但是如果你访问的是金融区的服务
         * 则必须手动指定域名，例如sms的上海金融区域名： sms.ap-shanghai-fsi.tencentcloudapi.com
         */
        endpoint: "sms.tencentcloudapi.com"
      },
    },
  })

  /* 请求参数，根据调用的接口和实际情况，可以进一步设置请求参数
   * 属性可能是基本类型，也可能引用了另一个数据结构
   * 推荐使用IDE进行开发，可以方便的跳转查阅各个接口和数据结构的文档说明 */
  const params = {
    /* 短信应用ID: 短信SmsSdkAppId在 [短信控制台] 添加应用后生成的实际SmsSdkAppId，示例如1400006666 */
    SmsSdkAppId: process.env.SmsSdkAppId,
    /* 短信签名内容: 使用 UTF-8 编码，必须填写已审核通过的签名，签名信息可登录 [短信控制台] 查看 */
    SignName: "达简网络",
    /* 短信码号扩展号: 默认未开通，如需开通请联系 [sms helper] */
    ExtendCode: "",
    /* 国际/港澳台短信 senderid: 国内短信填空，默认未开通，如需开通请联系 [sms helper] */
    SenderId: "",
    /* 用户的 session 内容: 可以携带用户侧 ID 等上下文信息，server 会原样返回 */
    SessionContext: "",
    /* 下发手机号码，采用 e.164 标准，+[国家或地区码][手机号]
     * 示例如：+8613711112222， 其中前面有一个+号 ，86为国家码，13711112222为手机号，最多不要超过200个手机号*/
    PhoneNumberSet: [`+86${mobile}`],
    /* 模板 ID: 必须填写已审核通过的模板 ID。模板ID可登录 [短信控制台] 查看 */
    TemplateId: process.env.TemplateId,
    /* 模板参数: 若无模板参数，则设置为空*/
    TemplateParamSet: [smscode],
  }
  // 通过client对象调用想要访问的接口，需要传入请求对象以及响应回调函数
  return await client.SendSms(params)
}
//#endregion

//#region 生成指定位数的随机整数
/**
 * 生成指定位数的随机整数
 * @param {number} len 位数长度
 * @returns 随机数字符串
 */
module.exports.getRandomByLength = (len) => {
  let code = "";
  for (let i = 0; i < len; i++) {
    code += this.getRandom(0, 9);
  }
  return code;
}

// 生成指定范围内的随机数
module.exports.getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1));
};
//#endregion

//#region 微信创建订单
// 解析xml格式数据
const xml = require('xml2js')
const { default: axios } = require("axios");
/**
 * 创建订单
 * @param {*} url 
 * @param {*} params 
 * @returns 
 */
module.exports.createOrder = (url, data) => {
  return new Promise(async (resolve, reject) => {
    // 发起 创建订单请求
    const res = await axios({
      url,
      method: "POST",
      data
    });
    // 使用xml解析 微信返回结果
    xml.parseString(res.data, (err, data) => {
      const { return_code, result_code, return_msg } = data.xml;
      // 成功的话，返回成功信息
      if (return_code[0] === "SUCCESS" && result_code[0] === 'SUCCESS' && return_msg[0] === 'OK')
        return resolve(data.xml);
      // 失败的话，返回失败信息
      reject(data);
    })
  })
}
//#endregion

//#region 生成一个32位以内的随机字符串，而且是不重复的
module.exports.getRandomStr = () => {
  return "letao" + this.getRandomByLength(10) + "wx" + new Date().getTime();
}
//#endregion

//#region 生成商户订单号
module.exports.getTrade_no = () => {
  return this.getRandomStr()
}
//#endregion

//#region 根据微信支付文档 生成签名算法
// 导入商户密钥
const { key } = require("../config/ws")
// 生成签名
module.exports.createSign = (args) => {
  let stringA = "";
  // 以字典序 组成key=value的格式
  Object.keys(args).sort().forEach(val => {
    stringA += val + "=" + args[val] + "&"
  })
  // 加上密钥
  stringSignTemp = stringA + `key=${key}`;
  // MD5加密
  return crypto.createHash("MD5").update(stringSignTemp).digest('hex').toUpperCase();
}
//#endregion

//#region 微信查询订单
module.exports.queryOrder = (url, data) => {
  return new Promise(async (resolve, reject) => {
    // 发起 创建订单请求
    const res = await axios({
      url,
      method: "POST",
      data
    });
    // 使用xml解析 微信返回结果
    xml.parseString(res.data, (err, data) => {
      // 成功的话，返回成功信息
      return resolve(data.xml)
    })
  })
}
//#endregion