$(function () {
    // 获取第一页数据
    getUsers();
    // 点击按钮 进行分页
    $(".pagination").on("click", 'li', function () {
        if ($(this).hasClass("disabled")) {
            return false;
        }
        getUsers(parseInt($(this).data("pagenum")));
    });
    // 点击删除按钮
    $("tbody").on("click", 'i', clickDeleteBtn);
    // 点击确定删除
    $(".sure-btn").on("click", deleteSure);

    // 点击编辑按钮
    $("tbody").on("click", ".modify-btn", clickModifyBtn);

    // 点击修改框中的保存按钮
    $("#modify-form").on("click", ".modify-save-btn", clickModifySaveBtn);
})

// 点击修改框中的保存按钮
function clickModifySaveBtn() {
    // 获取id
    let userId = $(this).data("id");
    // 获取所有信息
    let formdata = $("#modify-form #add-form").serialize() + "&id=" + userId;
    // 发起请求 增post删delete改put查get
    $.ajax({
        type: "put",
        url: "/user/modifyUser",
        data: formdata,
        success: (result) => {
            if (result.code == 200) {
                $("#modify-modal").modal("hide");
                let pagenum = $("html").data("page");
                getUsers(pagenum);
            }
        }
    })
}

// 点击编辑按钮 (回显用户信息)
function clickModifyBtn() {
    // 获取用户id
    let userId = $(this).data('id');
    // 先发起请求
    $.ajax({
        type: "get",
        url: '/user/findOneUser',
        data: {
            id: userId
        },
        success: function (result) {
            if (result.code == 200) {
                // 插入模态框并打开
                let modifyStr = template("modify_template", result.data);
                $('#modify-form').html(modifyStr);
                $('#modify-form').modal('show');
            }
        }
    })
}


// 点击删除按钮
function clickDeleteBtn() {
    // 将删除id存入html标签
    $("html").attr("data-id", $(this).data('id'));
}

// 点击确认删除
function deleteSure() {
    // 发起请求
    $.ajax({
        type: "get",
        url: "/user/deleteUser",
        data: {
            id: $("html").attr("data-id")
        },
        success: (result) => {
            // 删除成功后
            if (result.code == 200) {
                // 关闭模态框
                $('.confirm-modal').modal('hide');
                // 刷新当前页面
                getUsers($("html").data("pagenum"));
            }
        }
    })
}

/**
 * 请求分页数据
 * @param {*} pageNum 第几页
 * @param {*} pageSize 每页几条数据
 */
function getUsers(pageNum, pageSize) {
    // 发起请求
    $.ajax({
        type: "get",
        url: '/user/findAll',
        data: {
            // 默认为第一页
            pageNum: pageNum || 1,
            // 默认为每页5条数据
            pageSize: pageSize || 5
        },
        success: (result) => {
            if (result.code == 200) {
                console.log(result.data);
                let tableStr = template("table_template", result.data);
                $("tbody").html(tableStr);
                // 分页模板
                let pageStr = template("page_template", result.data);
                $(".pagination").html(pageStr);
                // 在html记录页数
                $("html").attr("data-pagenum", result.data.page);
            }
        }
    })
}