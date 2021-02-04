const express = require('express');
const path = require('path');
const router = require('./router.js');
const bodyParser = require('body-parser');
const app = express();

// 启动静态资源服务
app.use(express.static('public'));

app.all('*', function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");//项目上线后改成页面的地址

  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");

  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

  next();

});
// 处理请求参数
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 配置路由
app.use(router);
// 监听端口
app.listen(3000, () => {
  console.log('running...');
});




