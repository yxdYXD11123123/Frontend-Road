const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    // 用户名（必填  长度：2-10位）
    username: {
        type: String,
        required: true,
        // 代表唯一
        unique: true,
        minlength: 2,
        maxlength: 10
    },
    // 密码（必填  长度：6-12位之间）
    password: {
        type: String,
        required: true
    },
    // 邮箱 （必填  很重要，要保证唯一）
    email: {
        type: String,
        required: true,
        unique: true
    },
    // 状态 (1. 用户正常， 0. 用户被禁用)
    status: {
        type: Boolean,
        default: true
    },
    // 角色 (普通用户还是超级管理员  要求必选)
    role: {
        type: String,
        required: true
    }
})

let User = mongoose.model("User", userSchema);

module.exports = User;