let pool = require('../config/mysqlConfig');

module.exports.changeOne = (id, newStatus, callback) => {
  let str = `update list set done = ${newStatus} where id = '${id}'`;
  pool.query(str, (err, results) => {
    if (err) throw err;
    callback(results);
  });
}