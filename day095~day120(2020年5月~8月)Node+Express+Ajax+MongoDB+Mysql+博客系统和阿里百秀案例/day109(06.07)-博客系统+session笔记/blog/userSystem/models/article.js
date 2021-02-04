const mongoose = require("mongoose");
const User = require("./user");

let articleSchema = new mongoose.Schema({
    // 标题
    title: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 1
    },
    // 作者
    author: {
        // 表示类型为 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    // 时间
    publishDate: {
        type: Date,
        default: Date.now
    },
    // 封面图片
    cover: {
        type: String,
        default: null
    },
    // 内容
    content: {
        type: String
    }
});

let Article = new mongoose.model("Article", articleSchema);

// 导出
module.exports = Article;
