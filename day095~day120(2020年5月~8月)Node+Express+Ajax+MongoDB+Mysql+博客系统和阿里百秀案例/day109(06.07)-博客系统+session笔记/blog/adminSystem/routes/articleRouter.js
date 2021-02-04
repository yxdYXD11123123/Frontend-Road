const express = require("express");
const multer = require("multer");
const path = require("path");
const md5 = require("md5");
const articleRouter = express.Router();
const { showArticle, showAddArticle, findArticles, findOneArticle, deleteArticle, uploadImg, addArticle, showEditArticle, modifyArticle } = require("../controller/articleCtrl");

// 设置接收upload文件
var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, "../", "public", 'upload'))
        },
        filename: function (req, file, cb) {
            cb(null, md5(file.originalname + new Date()) + "." + file.mimetype.substring(6));
        }
    })
})

// 显示文章页
articleRouter.get("/", showArticle);

// 在文章页
articleRouter.get("/findArticles", findArticles)

// 显示文章添加页
articleRouter.get("/showAdd", showAddArticle);

// 删除文章
articleRouter.delete("/deleteArticle", deleteArticle);

// 上传图片封面
// articleRouter.post("/uploadImg", upload.single("cover"), uploadImg)

// 添加addArticle
articleRouter.post("/addArticle", upload.single("cover"), addArticle);

// 显示文章修改页
articleRouter.get("/showEditArticle", showEditArticle);

// 找一个文章
articleRouter.get("/findOneArticle", findOneArticle);

// 修改一个文章
articleRouter.post("/modifyArticle", upload.single("cover"), modifyArticle)

module.exports = articleRouter;