const { query } = require("../config/query");

// 注册用户
module.exports.userRegister = ({ username, password, mobile }) => {
  return query('insert into user (username, password, mobile) values (?,?,?)', [username, password, mobile])
}

// 查询用户 通过手机号
module.exports.userFindByMobileOrUname = (mobile, username) => {
  return query("select * from user where mobile = ? or username = ?;", [mobile, username]);
}

// 通过用户名和密码查找用户
module.exports.userFindByNameAndPwd = (username, password) => {
  return query("select * from user where username = ? and password = ?;", [username, password])
}