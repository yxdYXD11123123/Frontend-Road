## 简答题

1. 创建数据库quanzhan12
```js
// 引入
const mongoose = require("mongoose");
// 创建数据库
mongoose.connect("mongodb://localhost/quanzhan12", {
    // 使用新的url解析器
    useNewUrlParser: true,
    // 使用新的服务器发现和监视引擎
    useUnifiedTopology: true
})
```
============================================class集合==============================
2. 创建集合class,集合的规则要求如下
> 姓名:字符串类型
> 年龄:数字类型
> 性别: 数字类型
> 业务爱好:数组类型
```js
// 设置一个集合规则
const classSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: Number,
    hobbies: Array
})
// 创建一个集合  名为Class，规则为classSchema
let Class = new mongoose.model("Class", classSchema);
```
============================================增加操作===============================
3. 在class的集合中插入文档
>姓名:zhangsan,年龄:22,性别:0,业务爱好：["draw","computer"]
>姓名:jialala,年龄:18,性别:1,业务爱好：["sing","draw","football"]
>姓名:yaoyao,年龄:24,性别:1,业务爱好：["football","computer","running"]
>姓名:yangwenlin,年龄:19,性别:0,业务爱好：["sing","computer"]
```js
// 使用集合的create方法，在class集合中插入文档
Class.create({
    name: "zhangsan",
    age: 22,
    gender: 0,
    hobbies: ["draw", "computer"]
}).then((data) => { console.log(data); }).catch((err) => { console.log(err); });
Class.create({
    name: "jialala",
    age: 18,
    gender: 1,
    hobbies: ["sing", "draw", "football"]
}).then((data) => { console.log(data); }).catch((err) => { console.log(err); });
// 另一种插入文档的方法
let yaoyao = new Class({
    name: "yaoyao",
    age: 24,
    gender: 1,
    hobbies: ["football", "computer", "running"]
})
// 保存数据
yaoyao.save();
let yangwenlin = new Class({
    name: "yangwenlin",
    age: 19,
    gender: 0,
    hobbies: ["sing", "computer"]
})
// 保存数据
yangwenlin.save();
```
============================================查询操作===============================

4. 查询所有人的信息
```js
// 查询所有人的信息
Class.find().then((data) => {
    // 输出所有人信息
    console.log(data);
}).catch((err) => {
    console.log(err);
})
```
============================================score集合==============================

5. 创建集合score,集合的规则要求如下
> 姓名:字符串类型
> 数学成绩: 数字类型
> 英语成绩: 数字类型
> 语文成绩: 数字类型
```js
let scoreSchema = new mongoose.Schema({
    name: String,
    math: Number,
    english: Number,
    yuwen: Number
})

let Score = new mongoose.model("score", scoreSchema);
```
============================================增加操作===============================
6. 在score的集合中插入文档
>姓名:zhangsan,英语成绩：你自己随便写，数学成绩：你自己随便写，语文成绩：你自己随便写，
>姓名:jialala,英语成绩：你自己随便写，数学成绩：你自己随便写，语文成绩：你自己随便写，
>姓名:yaoyao,英语成绩：你自己随便写，数学成绩：你自己随便写，语文成绩：你自己随便写，
>姓名:yangwenlin,英语成绩：你自己随便写，数学成绩：你自己随便写，语文成绩：你自己随便写，
```js
Score.create({
    name: "zhangsan",
    math: 66,
    english: 77,
    yuwen: 88
})
Score.create({
    name: "jialala",
    math: 89,
    english: 99,
    yuwen: 98
})
Score.create({
    name: "yaoyao",
    math: 89,
    english: 93,
    yuwen: 100
})
Score.create({
    name: "jialala",
    math: 88,
    english: 99,
    yuwen: 98
})
```
============================================查询操作===============================

7. 查询所有成绩
```js
let scoreSchema = new mongoose.Schema({
    name: String,
    math: Number,
    english: Number,
    yuwen: Number
})
let Score = new mongoose.model("Score", scoreSchema);

Score.find().then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})
```

============================================老师集合==============================
8. 创建集合teacher,集合的规则要求如下
> 姓名:字符串类型
> 性别: 数字类型
> 年龄: 数字类型
> 新资: 数字类型
```js
let teacherSache = mongoose.Schema({
    name: String,
    gender: Number,
    age: Number,
    salary: Number
})

let Teacher = new mongoose.model("Teacher", teacherSache);
```
============================================增加操作===============================

9. 在teacher的集合中插入文档
这个你自己定义，插入3条文档就可以
```js
Teacher.create({
    name: "jialala",
    gender: 1,
    age: 18,
    salary: 20000
})
Teacher.create({
    name: "yaoyao",
    gender: 1,
    age: 17,
    salary: 20000
})
Teacher.create({
    name: "yangwenlin",
    gender: 0,
    age: 19,
    salary: 30000
})
```
============================================查询操作===============================
10. 查询所有老师的信息
```js
let teacherSache = mongoose.Schema({
    name: String,
    gender: Number,
    age: Number,
    salary: Number
})

let Teacher = new mongoose.model("Teacher", teacherSache);
// 查询
Teacher.find().then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})
```

