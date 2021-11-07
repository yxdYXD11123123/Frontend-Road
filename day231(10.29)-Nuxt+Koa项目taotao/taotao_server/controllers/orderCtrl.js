const { orderUrl, app_id, mch_id, notify_url, queryUrl } = require("../config/ws")
const { createOrder, createSign, getTrade_no, getRandomStr, queryOrder } = require("../utils");
// 生成二维码
const QRCode = require('qrcode');
const { addOrder, updateOrder } = require("../models/ordersModel");

// 生成订单 
module.exports.order = async (ctx) => {
  const { body, total_fee, trade_type, spbill_create_ip } = ctx.request.body;

  const params = {
    appid: app_id,
    mch_id, // 商户号
    nonce_str: getRandomStr(), // 32位以内的随机字符串
    // sign, // 签名
    body, // 商品描述
    out_trade_no: getTrade_no(), // 商户订单号
    total_fee, // 金额
    spbill_create_ip, // 终端ip
    notify_url, // 微信服务器回调的地址
    trade_type // 支付类型
  }

  // 生成签名并添加
  params.sign = createSign(params);

  // 将数据整理为xml格式
  const paramsInXML =
    `
      <xml>
        <appid>${app_id}</appid>
        <body>${body}</body>
        <mch_id>${mch_id}</mch_id>
        <nonce_str>${params.nonce_str}</nonce_str>
        <notify_url>${notify_url}</notify_url>
        <out_trade_no>${params.out_trade_no}</out_trade_no>
        <spbill_create_ip>${spbill_create_ip}</spbill_create_ip>
        <total_fee>${total_fee}</total_fee>
        <trade_type>${trade_type}</trade_type>
        <sign>${params.sign}</sign>
      </xml>
  `
  // 发送数据  创建订单
  const res = await createOrder(orderUrl, paramsInXML);
  // 成功时
  if (res.return_code[0] === "SUCCESS") {
    // 添加新订单 订单状态为待支付
    const addRes = await addOrder({
      appid: app_id,
      mch_id,
      body,
      out_trade_no: params.out_trade_no,
      total_fee,
      spbill_create_ip,
      trade_type,
      // 参照微信支付状态
      trade_state: 'NOTPAY',
    });

    if (!addRes.affectedRows) return ctx.body = {
      status: 0,
      message: "添加订单失败"
    }

    // 将支付链接转为二维码
    const qr_url = await QRCode.toDataURL(res.code_url);
    // 发送给前端
    return ctx.body = {
      status: 200,
      data: { qr_url, out_trade_no: params.out_trade_no }
    }
  }

  ctx.body = {
    status: 0,
    message: "创建订单失败"
  }
}

// 支付成功通知
module.exports.notify = (ctx) => {
  // 获取微信订单id
  const { return_code, transaction_id, openid, out_trade_no } = ctx.request.body.xml;
  // 状态码为成功时，更新订单状态
  if (return_code == 'SUCCESS') {
    // 更新订单信息
    updateOrder({
      trade_state: 'SUCCESS',
      transaction_id: transaction_id[0],
      open_id: openid[0],
      out_trade_no: out_trade_no[0],
    });
  }

  // 响应微信xml结果
  ctx.body = `
  <xml>
    <return_code><![CDATA[SUCCESS]]></return_code>
    <return_msg><![CDATA[OK]]></return_msg>
  </xml>
  `
}

// 查询
module.exports.query = async (ctx) => {
  // 获取 商户id
  const { out_trade_no } = ctx.request.body;
  // 准备参数
  const params = {
    appid: app_id,
    mch_id,
    out_trade_no,
    nonce_str: getRandomStr(),
  };
  // 添加sign
  params.sign = createSign(params);

  const sendData = `
  <xml>
    <appid>${app_id}</appid>
    <mch_id>${mch_id}</mch_id>
    <nonce_str>${params.nonce_str}</nonce_str>
    <out_trade_no>${out_trade_no}</out_trade_no>
    <sign>${params.sign}</sign>
  </xml>
  `
  // 查询订单
  const res = await queryOrder(queryUrl, sendData);
  // 支付成功时
  if (res.return_code[0] === "SUCCESS" && res.result_code[0] === 'SUCCESS' && res.trade_state[0] === 'SUCCESS')
    return ctx.body = {
      status: 200,
      data: {
        message: "订单已支付"
      }
    };
  // 失败时
  ctx.body = {
    status: 501,
    message: '订单未支付'
  }
}