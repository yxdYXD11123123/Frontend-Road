let { clearFinishedTask } = require('../models/clearFinishedModel');
// 清除已完成的任务
module.exports.clearFinished = (req, res) => {
  clearFinishedTask((result) => {
    if (result.affectedRows >= 0) {
      res.send({
        code: 200,
        msg: '清除成功'
      });
    }
  });
}