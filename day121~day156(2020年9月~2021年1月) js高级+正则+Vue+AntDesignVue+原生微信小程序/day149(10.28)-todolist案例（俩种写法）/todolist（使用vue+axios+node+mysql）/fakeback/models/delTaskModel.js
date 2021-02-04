let pool = require('../config/mysqlConfig');

module.exports.delOne = (id, callback) => {
  let sql = `DELETE FROM list WHERE id = '${id}';`
  pool.query(sql, (err, results) => {
    if (err) throw err;
    callback(results);
  });
}