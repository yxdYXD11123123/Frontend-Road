$(function () {
    // 点击筛选
    $("#filterBtn").on("click", clickfilterBtn);

    // 点击分页按钮
    $("#pagination").on("click", 'a', clickPageBtn);

    // 点击文章删除按钮
    $("tbody").on("click", ".deletePostBtn", clickDeleteBtn);

    // 点击文章编辑按钮
})

//#region 点击筛选
function clickfilterBtn(e) {
    e.preventDefault();
    // 将筛选条件存起来
    window.category = $("#filterForm select[name='category']").val();
    window.status = $("#filterForm select[name='status']").val();
    getDataAndRenderByCondition();
}
//#endregion

//#region 点击分页按钮
function clickPageBtn() {
    // 获取页数，传入
    getDataAndRenderByCondition($(this).data('pagenum'));
}
//#endregion

//#region getDataAndRenderByCondition 通过条件获取分页数据并渲染
function getDataAndRenderByCondition(pagenum) {
    // 获取设定好的筛选条件
    let category = window.category;
    let status = window.status;
    // 发起请求
    $.ajax({
        type: 'get',
        url: '/admin/posts/findByFilter',
        data: {
            category,
            status,
            pagenum
        },
        success: (result) => {
            console.log(result);
            // 处理时间格式
            for (let i = 0; i < result.data.data.length; i++) {
                result.data.data[i].created = moment(result.data.data[i].created).format('YYYY-MM-DD HH:mm:ss');
            }
            // 制作模板
            // 1. 文章信息部分
            let tbodyStr = template("temp_tbody", result.data);
            // 2. 分页按钮部分
            let paginationStr = template("temp_pagination", result.data);
            // 插入模板
            $('tbody').html(tbodyStr);
            $("#pagination").html(paginationStr);
            // 记录第几页
            window.pagenum = result.data.pagenum;
        }
    })
}
//#endregion

//#region 点击文章删除按钮
function clickDeleteBtn() {
    $.ajax({
        type: 'put',
        url: '/admin/posts/deletePostById',
        data: {
            id: $(this).data('id')
        },
        success: (result) => {
            console.log(result);
            if (result.code == 200) {
                getDataAndRenderByCondition(window.pagenum);
            }
        }
    })
}
//#endregion