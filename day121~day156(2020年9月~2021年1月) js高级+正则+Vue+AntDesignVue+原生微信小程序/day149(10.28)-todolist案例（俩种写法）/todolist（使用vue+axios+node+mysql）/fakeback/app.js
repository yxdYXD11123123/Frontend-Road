const express = require('express');
const bodyParser = require('body-parser');
// 获取任务列表控制器
let { getList } = require('./controllers/getListCtrl');
// 添加任务列表控制器
let { addTask } = require('./controllers/addTask');
// 删除任务列表控制器
let { delTask } = require('./controllers/delTask');
// 清除已完成任务控制器
let { clearFinished } = require('./controllers/clearFinishedCtrl');
// 改变任务状态
let { changeStatus } = require('./controllers/changeStatusCtrl');


let app = express();
// 解决跨域问题
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");//项目上线后改成页面的地址
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});
// 设置中间件
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 获取任务列表
app.get('/getList', getList);
// 添加任务
app.post('/addTask', addTask);
// 删除任务
app.post('/delTask', delTask);
// 清除已完成任务
app.get('/clearFinished', clearFinished);
// 改变任务状态
app.put('/changeStatus', changeStatus);

app.listen(3000);