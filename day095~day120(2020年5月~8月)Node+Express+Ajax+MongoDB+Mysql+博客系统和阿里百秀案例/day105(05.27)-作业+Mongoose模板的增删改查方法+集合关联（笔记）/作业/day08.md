## 简答题

1. 创建数据库fullstack2019
```js
// 引入mongoose
const mongoose = require("mongoose");

// 连接数据库
mongoose.connect("mongodb://localhost/fullstack2019", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("数据库连接成功");
}).catch((err) => {
    console.log("数据库连接失败");
})
```
============================Student集合==================
2. 创建集合Student,集合的规则要求如下:
> 姓名:字符出类型，长度最少2个字符，最大6个字符，必传
> 年龄:数字类型，最大年龄不能超过25岁，必传，提示年龄不能大于25岁
> 性别: 字符串类型，只能是男或者是女，枚举，必传，
> 业务爱好:draw,computer,sing,football,running
```js
// 设置集合Student规则
let studentSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 6,
        required: true
    },
    age: {
        type: Number,
        max: [25, "年龄不能大于25岁"],
        required: true,
    },
    gender: {
        type: String,
        enum: {
            values: ["男", "女"],
            message: "性别只能填男/女"
        },
        required: true
    },
    hobbies: {
        type: [String],
        enum: {
            values: ["draw", "computer", 'sing', "football", "running"],
            message: "您的爱好不在范围内"
        }
    }
})

// 创建集合
let Student = new mongoose.model("Student", studentSchema);
```
=============================增加操作=============================
3. 在Student的集合中插入文档
>姓名:杨文林,年龄:19,性别:男,业务爱好：["draw","computer"]
>姓名:贾拉拉,年龄:18,性别:女,业务爱好：["sing","draw","football"]
>姓名:姚姚,年龄:24,性别:女,业务爱好：["football","computer","running"]
>姓名:王凯,年龄:25,性别:男,业务爱好：["sing","computer"]
```js
// 插入文档
Student.create({
    name: "杨文林",
    age: 19,
    gender: "男",
    hobbies: ["computer", "draw"]
}).then((data) => {
    console.log(data);
}).catch((err) => {
    for (let key in err.errors) {
        // 输出错误信息
        console.log(err.errors[key].properties.message);
    }
});
Student.create({
    name: "贾拉拉",
    age: 18,
    gender: "女",
    hobbies: ["sing", "draw", "football"]
}).then((data) => {
    console.log(data);
}).catch((err) => {
    for (let key in err.errors) {
        // 输出错误信息
        console.log(err.errors[key].properties.message);
    }
});
Student.create({
    name: "姚姚",
    age: 24,
    gender: "女",
    hobbies: ["running", "computer", "football"]
}).then((data) => {
    console.log(data);
}).catch((err) => {
    for (let key in err.errors) {
        // 输出错误信息
        console.log(err.errors[key].properties.message);
    }
});
Student.create({
    name: "王凯",
    age: 25,
    gender: "男",
    hobbies: ["sing", "computer"]
}).then((data) => {
    console.log(data);
}).catch((err) => {
    for (let key in err.errors) {
        // 输出错误信息
        console.log(err.errors[key].properties.message);
    }
})
```

=============================Score集合==============================

4. 创建集合Score,集合的规则要求如下
> 姓名:字符出类型，长度最少2个字符，最大6个字符，必传
> 数学成绩: 数字类型,不能低于0，不能多于100，必传,添加提示信息
> 英语成绩: 数字类型,不能低于0，不能多于100，必传,添加提示信息
> 语文成绩: 数字类型,不能低于0，不能多于100，必传,添加提示信息
```js
// 设置集合规则
let scoreSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 6,
        required: true
    },
    shuxue: {
        type: Number,
        min: 0,
        max: 100,
        required: [true, "数学成绩必须传"]
    },
    english: {
        type: Number,
        min: 0,
        max: 100,
        required: [true, "英语成绩必须传"]
    },
    yuwen: {
        type: Number,
        min: 0,
        max: 100,
        required: [true, "语文成绩必须传"]
    }
})

// 创建集合
let Score = new mongoose.model("Score", scoreSchema);
```
=============================增加操作===============================
5. 在Score的集合中插入文档
>姓名:杨文林,英语成绩：88，数学成绩：99，语文成绩：80，
>姓名:贾拉拉,英语成绩：79，数学成绩：88，语文成绩：90，
>姓名:姚姚,英语成绩：90，数学成绩：90，语文成绩：90，
>姓名:王凯,英语成绩：98，数学成绩：90，语文成绩：99

```js
// 插入文档
Score.create({
    name: "杨文林",
    shuxue: 99,
    english: 88,
    yuwen: 80
}).then((data) => {
    console.log(data);
}).catch((err) => {
    for (let key in err.errors) {
        // 输出错误信息
        console.log(err.errors[key].properties.message);
    }
});
Score.create({
    name: "贾拉拉",
    english: 79,
    shuxue: 88,
    yuwen: 90
}).then((data) => {
    console.log(data);
}).catch((err) => {
    for (let key in err.errors) {
        // 输出错误信息
        console.log(err.errors[key].properties.message);
    }
});
Score.create({
    name: "姚姚",
    english: 90,
    shuxue: 90,
    yuwen: 90
}).then((data) => {
    console.log(data);
}).catch((err) => {
    for (let key in err.errors) {
        // 输出错误信息
        console.log(err.errors[key].properties.message);
    }
});
Score.create({
    name: "王凯",
    english: 98,
    shuxue: 90,
    yuwen: 99
}).then((data) => {
    console.log(data);
}).catch((err) => {
    for (let key in err.errors) {
        // 输出错误信息
        console.log(err.errors[key].properties.message);
    }
});
```



6. 查询所有学生的信息
```js
// 查询所有学生信息
Student.find().then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})
```

7. 查询年龄大于18岁小于24岁的学生的信息
```js
Student.find({
    age: {
        $gt: 18,
        $lt: 24
    }
}).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})
```

8. 查询年龄19岁并且喜欢计算机的男生的信息
```js
Student.find({
    age: 19,
    hobbies: {
        $in: ["computer"]
    }
}).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})
```

9. 查询班级中年龄最大的学生的信息
```js
Student.find().sort("-age").then((data) => {
    console.log(data[0]);
}).catch((err) => {
    console.log(err);
})

// 或者
Student.findOne().sort("-age").then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})
```

10. 查询年龄是18岁的学生的姓名
```js
// 查询所有学生信息
Student.find({
    age: 18
}).then((data) => {
    for (let item of data) {
        console.log(item.name + "的年龄是18岁");
    }
}).catch((err) => {
    console.log(err);
})
```
11. 查询总人数(提示count)
```js
Student.countDocuments().then((data) => {
    console.log("总人数为" + data);
}).catch((err) => {
    console.log(err);
})
```

12. 查询显示第二页的数据，每页显示2条
```js
Student.find().skip(2).limit(2).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})
```
13. 查询业余爱好里面包含sing的学生的信息
```js
Student.find({
    hobbies: {
        $in: ["sing"]
    }
}).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})
```
14. 对数学成绩降序输出
```js
Score.find().sort("-shuxue").then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})
```

15. 查询姓名是王凯的各科成绩
```js
Score.findOne({
    name: "王凯"
}).then((data) => {
    console.log("王凯的数学成绩为" + data.shuxue + ", 英语成绩为" + data.english + ", 语文成绩为" + data.yuwen);
}).catch((err) => {
    console.log(err);
})
```

===============================更新操作===============================

16. 将姓名是姚姚的学生的年龄更改为23
```js
 Student.updateOne({
    name: "姚姚"
}, {
    age: 23
}).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})
```
17. 将所有学生的年龄更改为18
```js
Student.updateMany({}, {
    age: 18
}).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})
```
18. 将王凯的数学成绩更新为100分
```js
Score.updateOne({
    name: "王凯"
}, {
    shuxue: 100
}).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})
```
==================================删除操作=============================
19. 删除年龄小于20的学生的信息
```js
Student.deleteMany({
    age: {
        $lt: 20
    }
}).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})
```
20. 删除姓名是贾拉拉的这条数据
```js
Student.deleteMany({
    name: "贾拉拉"
}).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})
```

