$(function () {
    // 获取第一页数据
    getListData();
    // 获取其它页数据
    $(".page").on("click", "a", clickPageBtn)
});

// 点击分页按钮，跳转分页
function clickPageBtn() {
    getListData($(this).data("pagenum"));
}

/**
 * 功能： 分页获取数据
 * @param {*} pageNum 第几页
 * @param {*} pageSize 每页显示多少条数据
 */
function getListData(pageNum, pageSize) {
    $.ajax({
        type: "GET",
        url: "/api/article",
        data: {
            // 默认为 1 
            pageNum: pageNum || 1,
            // 默认为 6
            pageSize: pageSize || 6
        },
        success: function (result) {
            if (result.code == 200) {
                console.log(result);
                // 修改时间格式
                for (let i = 0; i < result.data.records.length; i++) {
                    // 修改时间格式
                    result.data.records[i].publishDate = moment(result.data.records[i].publishDate).format("YYYY-MM-DD");
                }
                // 渲染文章
                let listStr = template("list_template", result.data);
                $(".list").html(listStr);
                // 渲染分页
                let pageStr = template("page_template", result.data);
                $(".page").html(pageStr);
            }
        }
    })
}