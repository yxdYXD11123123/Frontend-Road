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