const mongoose = require("mongoose");
// 创建连接
mongoose.connect("mongodb://localhost/quanzhan12", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("数据库连接成功");
}).catch((err) => {
    console.log("数据库连接失败");
});

let scoreSchema = new mongoose.Schema({
    name: String,
    math: Number,
    english: Number,
    yuwen: Number
})

let Score = new mongoose.model("Score", scoreSchema);

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