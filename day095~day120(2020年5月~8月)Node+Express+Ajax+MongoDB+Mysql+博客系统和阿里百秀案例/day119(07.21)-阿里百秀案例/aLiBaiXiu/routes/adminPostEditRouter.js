const express = require("express");
const multer = require('multer');
const path = require('path');
const md5 = require('md5');
// 创建路由
const adminPostEditRouter = express.Router();

// 引入控制器
const { showPostEditPage, savePostEdit } = require("../controllers/adminPostEditCtrl");


// 设置uploader
var uploader = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '../', 'public', 'uploads'))
        },
        filename: function (req, file, cb) {
            cb(null, md5(file.originalname + new Date()) + '.' + file.mimetype.substring(6));
        }
    })
})

// 创建具体路由
adminPostEditRouter.get("/post-edit/:id", showPostEditPage);

adminPostEditRouter.post("/post-edit/saveEdit", uploader.single('feature'), savePostEdit);

// 导出
module.exports = adminPostEditRouter;