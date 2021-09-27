const Sequelize = require('sequelize');
const db_config = require('../config/mysql');
const Models = require('./models/index');

// 创建数据库实例
let sequelize = new Sequelize(
    db_config.database,
    db_config.user,
    db_config.pass, {
        host: db_config.host,
        dialect: db_config.dialect,
        pool: db_config.pool,
        port: db_config.port,
        logging: sql => {
        }
    });

// 数据库 实例 方法挂载
const models = Models(sequelize);

// 开启数据库
sequelize
    .authenticate()
    .then(async () => {
        console.log('数据库连接成功');
        models.init.sync();
    })
    .catch(err => {
        console.log('\x1B[31m%s\x1B[39m', '数据库连接异常');
        console.log('异常指令err: %s', err);
    });

// 将所有的方法暴露出去
module.exports = new Proxy({}, {
    get: (_, val) => new models[val],
    set: () => {
        throw new TypeError('装饰器类型 不可以修改')
    }
});
