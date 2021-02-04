## 导入数据(`mongoDB`数据库导入数据)

命令：`mongoimport -d 数据库名称 -c 集合名称 -file 要导入的数据文件`

准备的物料：

1. `xxx.json`文件（只有在`mongodb`中导入数据可以使用`json`文件）
2. 查看环境变量是否设置
3. 查看`mongoimport`是否可用

或者用`mongo-compass`导入数据

## 查询

#### 查询名字为肖恩的数据

```js
User.find({
    username: "肖恩"
}).then((data) => { console.log(data); }).catch((err) => {
    console.log(err);
})
```

#### 查询年龄大于19，小于20的数据

```js
User.find({
    age: {
        $gt: 19,
        $lt: 25
    }
}).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})
```

#### 查询爱好中含有 ”打球“的数据

```
User.find({
    hobbies: {
        $in: ["打球"]
    }
}).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})
```

#### 查询所有数据，按照年龄排序 （升序）

```js
User.find().sort("age").then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})

// 降序
User.find().sort("-age").then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})
```

#### 跳过两个，获取两个

```js
User.find().skip(2).limit(2).then((data) => {
    console.log(data);
})
```

#### 查询部分指定字段的数据

```js
// 只要name email字段 不要id字段
User.find().select("name email -_id").then((data) => {
    console.log(data);
})
// [
//     { name: 'yuanxudong', email: '3333@qq.com' },
//     { name: 'yuan', email: '22223@qq.com' },     
//     { name: 'dong', email: '222237777@qq.com' }, 
//     { name: 'dong', email: '222237777@qq.com' }  
//  ]
```

#### 只查询一个

```js
// 注意：以上返回的都是数组，这个返回的是对象
User.find().findOne({
    name: "dong"
}).then((data) => {
    console.log(data);
})
```



## 删除

#### 删除单个

```js
User.findOneAndDelete({
    _id: "5ecdbf289a4f0419f897ae55"
}).then((data) => {
    console.log(data);
    // 没有数据则返回null
})
```

#### 删除多个

```js
// 删除多条数据 条件：年龄为20的数据
User.deleteMany({
    age: 20
}).then((data) => {
    console.log(data);
    // { n: 2, ok: 1, deletedCount: 2 }  
})
```



## 更新

#### 更新单个

```js
User.updateOne({
    // 查找的条件
    name: "dong"
}, {
    // 要修改的值
    name: "yuanxudong",
    age: 22,
    email: "11111111@qq.com"
}).then((data) => {
    console.log(data);
    // n表示找到几个数据，nModified为修改了几个
    // { n: 1, nModified: 1, ok: 1 }
})
```

#### 更新多个

```js
// 不写条件，就会修改全部
User.updateMany({}, {
    email: "default@qq.com"
}).then((data) => {
    console.log(data);
    // { n: 3, nModified: 3, ok: 1 }
})
```



## 验证

在创建集合规则时，可以设置当前字段的验证规则，验证失败就输入插入失败

* required: true 必传字段
* `minlength: 3` 字符串最小长度
* `maxlength: 20` 字符串最大长度
* `min: 2`  数值最小为2
* `max: 10`  数值最大为10
* `enum: ['html','css','javascript','node.js']`
* `trim: true`  去除字符串两边的空格
* `validate: 自定义验证器`
* `default: 默认值` 

```js
const mongoose = require("mongoose");

// 连接数据库
mongoose.connect("mongodb://localhost/db_teacher", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { console.log('数据库连接成功'); })
    .catch((err) => { console.log("数据库连接失败"); });
// 创建约束
let teacherSchema = new mongoose.Schema({
    username: {
        // 确定这个字段的数据类型
        type: String,
        // 必传字段
        // 可以只写一个true, 也可以写一个数组，第二个自定义报错的message
        required: [true, "请传入用户名"]
    },
    name: {
        type: String,
        required: [true, "请传入名字"]
    },
    email: String,
    age: Number,
    hobbies: [String]
})

// 应用约束
let Teacher = new mongoose.model("Teacher", teacherSchema);

Teacher.create({}).then((data) => {
    console.log(data);
}).catch((err) => {
    for (let key in err.errors) {
        console.log("错误：" + err.errors[key].properties.message);
    }
})
```



```js
const mongoose = require("mongoose");

// 连接数据库
mongoose.connect("mongodb://localhost/db_teacher", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { console.log('数据库连接成功'); })
    .catch((err) => { console.log("数据库连接失败"); });
// 创建约束
let teacherSchema = new mongoose.Schema({
    username: {
        // 确定这个字段的数据类型
        type: String,
        // 必传字段 可以只写一个true, 也可以写一个数组，第二个自定义报错的message
        required: [true, "请传入用户名"],
        minlength: [4, "您的用户名长度要在6个字符以上"],
        // 去除字符两边的空格
        trim: true
    },
    name: {
        type: String,
        // 自定义校验
        // 如果是false， 那么不能通过校验
        // 如果是true，那么可以通过校验
        validate: {
            validator: v => {
                return v && v.length > 2 && v.length < 4
            },
            message: "传入的值不符合规则"
        }
    },
    email: {
        type: String,
        default: "123@qq.com"
    },
    age: {
        type: Number,
        min: [18, "未成年不能玩"]
    },
    hobbies: {
        type: String,
        // 枚举
        enum: {
            values: ["抽烟", "喝酒", "烫头", "说相声"],
            message: "您的爱好不在正常范围"
        }
    }
})

// 应用约束
let Teacher = new mongoose.model("Teacher", teacherSchema);

Teacher.create({
    name: "yua",
    username: " 东 史蒂芬弗兰克 ",
    age: 19,
    hobbies: "抽烟"
}).then((data) => {
    console.log(data);
}).catch((err) => {
    for (let key in err.errors) {
        console.log("错误：" + err.errors[key].properties.message);
    }
})
```



## 关联查询

通常不同集合的数据之间是有关系的，例如文章信息存储在不同集合中，但文章是某个用户发表的，要查询文章的所有信息包括发表用户，就需要用到集合关联。

* 使用id对集合进行关联
* 使用populate方法进行关联集合查询

### 应用场景

在开发中，如果要开发一个博客，用户，文章

用户表：

* 用户名
* 密码
* 用户id
* 邮箱
* 手机

文章：

* 文章id
* 文章标题
* 文章作者--用户名（用户id）

```js
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/db_blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("数据库连接成功");
}).catch((err) => {
    console.log("数据库连接失败");
});

// 创建约束
let userSchema = new mongoose.Schema({
    name: {
        type: String
    }
})

let postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    author: {
        // 数据类型为 id （规定写法）  
        type: mongoose.Schema.Types.ObjectId,
        // 说明用户id是从user集合中引用来的
        ref: "User"
    }
})

// 应用
const User = new mongoose.model("User", userSchema);

// User.create({
//     name: "张飞"
// })

const Post = new mongoose.model("Post", postSchema);

// Post.create({
//     title: "胜多负少打发",
//     author: "5ecf810923e2071148039d8d"
// })

// 关联查询
// 查询文章，把文章的标题和文章的作者全部显示出来
Post.find().populate("author").then((data) => {
    console.log(data);
})
```

