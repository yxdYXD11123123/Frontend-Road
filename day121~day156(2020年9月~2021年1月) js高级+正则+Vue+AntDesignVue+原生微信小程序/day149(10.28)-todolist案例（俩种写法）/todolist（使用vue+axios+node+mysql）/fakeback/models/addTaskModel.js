let pool = require('../config/mysqlConfig');

module.exports.addOne = (task, callback) => {
  let str = `INSERT INTO LIST (info, done) VALUES ('${task}', FALSE)`;
  pool.query(str, (err, results) => {
    if (err) throw err;
    callback(results);
  });
}