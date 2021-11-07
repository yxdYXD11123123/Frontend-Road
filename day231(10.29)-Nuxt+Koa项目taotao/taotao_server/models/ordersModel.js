const { query } = require("../config/query")

/**
 * 添加新订单
 */
module.exports.addOrder = (payload) => {
    const { appid, mch_id, body, out_trade_no, total_fee, spbill_create_ip, trade_type, trade_state } = payload;
    return query('insert into `order` (appid, mch_id, body, out_trade_no, total_fee, spbill_create_ip, trade_type, trade_state) values (?, ?, ?, ?, ?, ?, ?, ?)', [appid, mch_id, body, out_trade_no, total_fee, spbill_create_ip, trade_type, trade_state])
}


/**
 * 更新订单状态
 */
module.exports.updateOrder = (payload) => {
    const { trade_state, transaction_id, open_id, out_trade_no } = payload;
    return query('update `order` set trade_state = ?, transaction_id = ?, open_id = ? where out_trade_no = ?', [trade_state, transaction_id, open_id, out_trade_no])
}