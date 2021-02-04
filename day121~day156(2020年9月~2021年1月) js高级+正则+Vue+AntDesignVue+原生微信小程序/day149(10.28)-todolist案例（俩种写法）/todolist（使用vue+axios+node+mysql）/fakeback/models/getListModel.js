let pool = require('../config/mysqlConfig');

module.exports.findAll = (callback) => {
  let str = `select * from list`;
  pool.query(str, (err, results) => {
    if (err) throw err;
    callback(results);
  });
}