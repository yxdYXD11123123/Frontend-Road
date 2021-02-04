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

Score.find().then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})