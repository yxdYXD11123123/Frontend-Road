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

// 删除
Student.deleteMany({
    name: "贾拉拉"
}).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})