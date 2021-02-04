$(function () {
    refreshCategories();

    // 添加分类
    $('#addCategory').on("click",)
})

//#region 局部刷新 refreshCategories
function refreshCategories() {
    // 发送请求
    $.ajax({
        type: 'get',
        url: '/admin/categories/refreshcategories',
        success: (result) => {
            if (result.code == 200) {
                let tbodyStr = template('template-tbody', result);
                $('tbody').html(tbodyStr);
            }
        }
    })
}
//#endregion

