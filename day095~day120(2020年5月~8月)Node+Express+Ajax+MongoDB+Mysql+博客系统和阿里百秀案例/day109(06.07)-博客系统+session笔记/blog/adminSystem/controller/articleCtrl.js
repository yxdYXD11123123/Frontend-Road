const sexPage = require("mongoose-sex-page");
const Article = require("../model/article");

// 显示文章页
module.exports.showArticle = (req, res) => {
    if (req.session.username) {
        res.render("article", {
            page: "article"
        })
    }
    else {
        res.redirect("/");
    }
};

// 查找文章分页
module.exports.findArticles = async (req, res) => {
    // 获取查询的页数，及每页数据的数量
    let { pageNum, pageSize } = req.query;
    // 寻找分页数据 （使用mongoose-sex-page插件，display为返回一个分页数组，数组中显示几页）
    let result = await sexPage(Article).page(parseInt(pageNum)).size(parseInt(pageSize)).display(5).find().populate("author").exec();
    res.status(200).send({
        code: 200,
        msg: "数据获取成功",
        data: result
    });
}

// 删除文章
module.exports.deleteArticle = async (req, res) => {
    let { id } = req.body;
    let result = await Article.findOneAndDelete({
        _id: id
    });
    if (result.title) {
        res.status(200).send({
            code: 200,
            msg: "文章删除成功",
            // 不要返回过多信息
            data: null
        })
    }
}

// 显示文章编辑页
module.exports.showAddArticle = (req, res) => {
    if (req.session.username) {
        res.render("article-add", {
            page: "article"
        });
    }
    else {
        res.redirect("/")
    }
};

// 上传图片
// module.exports.uploadImg = (req, res) => {
//     console.log(req.file);

//     res.send({
//         code: 200,
//         data: '/upload/' + req.file.filename
//     })
// }

module.exports.addArticle = async (req, res) => {
    let newArticle = {
        title: req.body.title,
        author: req.body.author,
        publishDate: req.body.publishDate,
        cover: '/upload/' + req.file.filename,
        content: req.body.content
    }
    let result = await Article.create(newArticle);
    res.send({
        code: 200,
        msg: "文章添加成功",
        data: result
    })
}

// 显示文章修改页面
module.exports.showEditArticle = (req, res) => {
    if (req.session.username) {
        res.render("article-edit", {
            page: "article"
        });
    }
    else {
        res.redirect("/")
    }
}

// 找一篇文章
module.exports.findOneArticle = async (req, res) => {
    let { id } = req.query;
    let result = await Article.findOne({
        _id: id
    });
    res.status(200).send({
        code: 200,
        data: result,
        msg: "文章查询成功"
    })
}

// 修改文章 
module.exports.modifyArticle = async (req, res) => {
    let updateArticle = {
        title: req.body.title,
        author: req.body.author,
        publishDate: req.body.publishDate,
        content: req.body.content
    }
    if (req.file) {
        updateArticle.cover = '/upload/' + req.file.filename;
    }
    let result = await Article.findOneAndUpdate({
        _id: req.body.id
    }, updateArticle);
    res.status(200).send({
        code: 200,
        msg: "文章修改成功",
        data: result
    })
}