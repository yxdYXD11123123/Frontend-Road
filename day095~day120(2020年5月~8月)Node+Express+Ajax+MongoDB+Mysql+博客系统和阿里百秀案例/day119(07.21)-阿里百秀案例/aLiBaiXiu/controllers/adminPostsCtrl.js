const { findByPaging, deleteOnePostById } = require('../models/adminPostsModel');
const moment = require('moment');

//#region 显示文章管理页面
module.exports.showPostsPage = (req, res) => {
    let pagenum = 1;
    let pagesize = 5;
    let skip = (pagenum - 1) * pagesize;
    let size = pagesize;
    // 显示文章管理页，以及第一页的数据
    findByPaging({
        needCategories: true,
        skip: skip,
        size: size,
        callback: (results) => {
            // console.log(results);
            // 显示页面，并传递本页面需要的数据
            res.render('./admin/posts', {
                // moment插件
                moment: moment,
                // 分页文章数据
                data: results[0],
                // 文章总数
                total: results[1][0].total,
                // 第几页
                pagenum: 1,
                // 每页几条数据
                pagesize: 5,
                // 共有几页
                totalpage: Math.ceil(results[1][0].total / 5),
                // 所有分类
                categories: results[2]
            });
        }
    })
};
//#endregion


//#region 查询筛选分页
module.exports.findByFilter = (req, res) => {
    let { pagenum, size, status, category } = req.query;
    // 如果有这个两个参数 将页码pagenum和每页数量size 转为数字
    size = size ? parseInt(size) : size;
    pagenum = pagenum ? parseInt(pagenum) : pagenum;
    // 查询筛选分页
    findByPaging({
        skip: pagenum ? (pagenum - 1) * (size || 5) : pagenum,
        size,
        status,
        category,
        callback: (results) => {
            // console.log(results);
            res.send({
                code: 200,
                message: '获取筛选分页结果成功',
                data: {
                    // 第一页
                    pagenum: pagenum || 1,
                    // 共有几页
                    totalpage: Math.ceil(results[1][0].total / 5),
                    // 分页文章数据
                    data: results[0],
                    // 所有分类 （如果results有第三个元素，我们就返回，没有则返回的对象里没有categories）
                    categories: results[2]
                }
            })
        }
    });
};
//#endregion

//#region 
module.exports.deletePostById = (req, res) => {
    let deleteId = req.body.id
    deleteOnePostById(deleteId, (results) => {
        if (results.affectedRows == 1) {
            return res.send({
                code: 200,
                message: '文章删除成功'
            })
        };
        res.send({
            code: 500,
            message: '文章删除失败'
        })
    })
}
//#endregion