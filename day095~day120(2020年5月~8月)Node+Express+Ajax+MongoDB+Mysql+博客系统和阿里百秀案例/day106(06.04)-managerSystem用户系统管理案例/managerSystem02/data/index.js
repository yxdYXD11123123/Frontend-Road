// 操作数据库的功能
// 引入mongoose 模块 (操作mongoDB数据库)
const mongoose = require("mongoose");

// 连接数据库
mongoose.connect("mongodb://localhost/db_system2", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("数据库连接成功");
}).catch((err) => {
    console.log("数据库连接失败");
});

// 设计一个集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "用户名必须有"]
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    hobbies: {
        type: [String],
        // 枚举
        enum: {
            values: ["足球", "篮球", "橄榄球", "敲代码", "抽烟", "喝酒", "烫头"],
            message: '您的爱好不在范围内'
        }
    }
})

// 创建集合
const User = new mongoose.model("User", userSchema);

// 导出数据模块方法
module.exports = {
    // {pageNum: "1", pageSize: "5"}   
    // 按分页的形式给数据
    /**
     * 
     * @param {Number} pageNum  第几页
     * @param {Number} pageSize  分页几个
     * @param {Function} callback  回调函数
     */
    getList: function (pageNum, pageSize, callback) {
        User.find().skip((pageNum - 1) * pageSize).limit(pageSize).then((data) => {
            // 拿到5条数据
            // callback(data);
            // 还需要总数
            User.countDocuments().then((sum) => {
                callback(data, sum);
            })
        }).catch((err) => {
            console.log(err);
        })
    },
    // 添加用户信息
    /**
     * 
     * @param {*} userObj 要添加的用户信息对象
     * @param {*} callback 成功时的回调函数
     */
    addUser: function (userObj, callback) {
        User.create(userObj).then((data) => {
            callback(data);
        });
    },
    // 删除一个用户
    /**
     * 
     * @param {*} userId 要删除的用户 id
     * @param {*} callback 删除成功后的回调函数
     */
    deleteOne: function (userId, callback) {
        User.findOneAndDelete({
            _id: userId
        }).then((data) => {
            callback(data);
        }).catch((err) => {
            console.log(err);
        })
    },
    // 找到用户当前信息
    /**
     * 
     * @param {*} userId 要查询的用户信息 id
     * @param {*} callback 查询成功后的回调函数
     */
    findOne: function (userId, callback) {
        User.findOne({
            _id: userId
        }).then((data) => {
            callback(data);
        }).catch((err) => {
            console.log(err);
        })
    },
    // 修改用户信息
    /**
     * 
     * @param {*} userId 查询id
     * @param {*} userObj 要修改的信息
     * @param {*} callback 成功后的回调函数
     */
    modifyUser: function (userId, userObj, callback) {
        User.updateOne({
            // 查询id
            _id: userId
        }, userObj).then((data) => {
            callback(data);
        })
    }
}
