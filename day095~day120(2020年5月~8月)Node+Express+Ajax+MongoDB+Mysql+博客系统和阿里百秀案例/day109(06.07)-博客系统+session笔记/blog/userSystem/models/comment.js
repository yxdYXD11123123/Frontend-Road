const mongoose = require("mongoose");

let commentSchema = new mongoose.Schema({
    // 用户id
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    // 文章id
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    commentTime: {
        type: Date,
        required: true
    }
});

let Comment = new mongoose.model("Comment", commentSchema);

// 导出
module.exports = Comment;