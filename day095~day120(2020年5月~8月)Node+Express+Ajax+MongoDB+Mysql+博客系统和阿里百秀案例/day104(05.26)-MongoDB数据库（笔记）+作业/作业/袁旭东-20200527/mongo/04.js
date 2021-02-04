const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/quanzhan12", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((data) => {
    console.log("数据库连接成功");
}).catch((err) => {
    console.log("数据库连接失败");
});

let teacherSache = mongoose.Schema({
    name: String,
    gender: Number,
    age: Number,
    salary: Number
})

let Teacher = new mongoose.model("Teacher", teacherSache);

Teacher.find().then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})