$(function () {
    // 一进入页面获取文章数据
    getArticles();

    // 点击分页按钮，获取分页
    $(".pagination").on("click", 'li', function () {
        // 判断按钮是否可以点击
        if ($(this).hasClass("disabled")) {
            return false;
        }
        getArticles(parseInt($(this).data("pagenum")));
    });

    // 点击删除按钮
    $("tbody").on("click", 'i', clickDeleteBtn);

    // 点击删除确认框的确认
    // 点击确定删除
    $(".sure-btn").on("click", deleteSure);
})

function clickDeleteBtn() {
    // 记录要删除的id
    $("html").attr("data-deleteid", $(this).data('id'))
}

function deleteSure() {
    // 发起请求
    $.ajax({
        type: "delete",
        url: "/article/deleteArticle",
        data: {
            // 注意这里必须用 attr 获取data-deleteid 使用data("deleteid")获取会出错
            id: $("html").attr("data-deleteid")
        },
        success: (result) => {
            // 删除成功后
            if (result.code == 200) {
                // 关闭模态框
                $('.confirm-modal').modal('hide');
                // 刷新当前页面
                getArticles($("html").data("pagenum"));
            }
        }
    })
}

/**
 * 请求分页数据
 * @param {*} pageNum 第几页
 * @param {*} pageSize 每页几条数据
 */
function getArticles(pageNum, pageSize) {
    // 发起请求
    $.ajax({
        type: "get",
        url: '/article/findArticles',
        data: {
            // 默认为第一页
            pageNum: pageNum || 1,
            // 默认为每页5条数据
            pageSize: pageSize || 5
        },
        success: (result) => {
            if (result.code == 200) {
                // 转换时间格式
                for (let i = 0; i < result.data.records.length; i++) {
                    // 修改时间格式
                    result.data.records[i].publishDate = moment(result.data.records[i].publishDate).format("YYYY-MM-DD");
                }
                let tableStr = template("table_template", result.data);
                $("tbody").html(tableStr);
                // 分页模板
                let pageStr = template("page_template", result.data);
                $(".pagination").html(pageStr);
                // // 在html记录页数
                $("html").attr("data-pagenum", result.data.page);
            }
        }
    })
}