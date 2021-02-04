let pool = require('../config/mysqlConfig');

module.exports.clearFinishedTask = (callback) => {
  let sql = `DELETE FROM list WHERE done IS TRUE;`;
  pool.query(sql, (err, results) => {
    if (err) throw err;
    callback(results);
  })
}