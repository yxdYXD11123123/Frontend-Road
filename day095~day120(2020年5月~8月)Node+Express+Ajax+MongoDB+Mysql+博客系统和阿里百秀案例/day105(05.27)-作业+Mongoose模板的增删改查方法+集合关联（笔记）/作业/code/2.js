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