// 引入model
let { findAll } = require('../models/getListModel');

module.exports.getList = (req, res) => {
  findAll((result) => {
    res.send({
      code: 200,
      data: result
    });
  });
}