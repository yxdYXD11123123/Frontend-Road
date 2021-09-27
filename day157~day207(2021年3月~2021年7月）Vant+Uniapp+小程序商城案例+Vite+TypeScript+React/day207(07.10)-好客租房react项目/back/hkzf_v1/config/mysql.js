module.exports = {
  // 数据库类型
  dialect: 'mysql',
  // 数据库主机地址
  host: 'localhost',
  // 用户名
  user: 'root',
  // 密码
  pass: 'root',
  // 端口号
  port: 3306,
  // 数据库名
  database: 'hkzf',
  // 是否允许 query中写多个查询语句
  multipleStatements: false,
  pool: {
    max: 5, // 连接池中最大连接数量
    min: 0, // 连接池中最小连接数量
    idle: 10000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
  }
}
