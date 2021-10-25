### 配置文件

优化数据库配置，<font color='red'>自动区分开发环境，测试环境，生产环境</font>

#### 使用 `dotnev` 插件

##### 安装

```shell
yarn add dotenv
```

##### 在 `app.js` 配置

```js
// 启用 环境变量配置
require("dotenv").config(); // 一定要在使用 process.env之前配置
```

##### <font style="color:#000;background-color:#ff0">在项目根目录下 创建 `.env` 文件，写入 要给 `process.env` 的键值对</font>

```
DB_ENV=dev
```

`/config/dbConfig.js` 设置各个环境使用的配置

```js
const dbConfig = {
  dev: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'taotao_server'
  },
  uat: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'taotao_server'
  },
  pdt: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'taotao_server'
  }
}
```

`query.js` 连接数据库时使用

```js
const mysql = require("mysql");

const { dbConfig } = require('./dbConfig')

// 创建连接池
const pool = mysql.createPool({
  connectionLimit: 10,
  ...dbConfig[process.env.DB_ENV]
});
```



### 注册用户

创建用户数据表

`/models/usersModel.js` 编写 注册用户 Model

```js
const { query } = require("../config/query");

// 向 user 表中插入数据
module.exports.userRegister = ({ username, password, mobile }) => {
  return query('insert into user (username, password, mobile) values (?,?,?)', [username, password, mobile])
}
```

`/controllers/usersCtrl.js` 编写 注册用户 控制器

```js
const Joi = require("joi");

// 导入 Models
const { userRegister } = require("../models/usersModel")

// 用户注册
module.exports.register = async (ctx) => {
  // 获取注册信息
  const { username, password, mobile } = ctx.request.body;

  // 设定校验规则
  const schema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,20}$/).required(),
    repeat_password: Joi.ref('password'),
    // 手机号正则  
    mobile: Joi.string().pattern(/^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/)
  })

  // 获取校验结果
  const varify = schema.validate({ username, password, mobile });

  // 如果校验有问题
  if (varify.error) {
    // 返回错误信息
    return ctx.body = {
      status: 0,
      message: "注册失败：" + varify.error.details[0].message
    }
  }

  // 校验成功，注册用户
  await userRegister({ username, password, mobile });

  // 响应
  ctx.body = {
    status: 200,
    message: '用户注册成功'
  }
}
```

#### 使用 `Joi` 校验插件

* 安装

  ```shell
  npm i joi
  ```

* 设定校验规则

  ```js
  const Joi = require("joi");
  
  const schema = Joi.object({
  	username: Joi.string().min(4).required().pattern(/^[a-zA-Z0-9]{3,20}$/)
  })
  ```

* 校验

  ```js
  // 获取校验结果
  const varify = schema.validate({ username, password, mobile });
  ```

* 更多使用信息参考官方文档

