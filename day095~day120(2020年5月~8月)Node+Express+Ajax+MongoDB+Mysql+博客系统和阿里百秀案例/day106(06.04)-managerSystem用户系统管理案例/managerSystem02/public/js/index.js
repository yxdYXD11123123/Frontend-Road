$(document).ready(function () {
    // 请求第一页
    showDatas(1, 5);

    // 给按钮分页按钮绑定点击事件
    $(".pager").on("click", "a", clickPageBtn)

    // 给删除按钮绑定事件
    $("tbody").on("click", ".delete-btn", clickDeleteBtn);

    // 给修改按钮绑定事件
    $("tbody").on("click", ".modify-btn", clickModifyBtn);

    // 给修改用户信息模态框中的保存按钮绑定点击事件
    $("#modify-modal .save-btn").on("click", clickSaveBtn);
})

// 点击修改模态框中的保存按钮
function clickSaveBtn() {
    // 序列化表单数据
    let formdata = $("#modify-form").serialize();
    // 发起请求
    $.ajax({
        type: "post",
        url: "/modifyUser",
        data: formdata,
        success: (result) => {
            if (result.code == 200) {
                // 关闭模态框
                $("#modify-modal").modal("hide");
                // 刷新当前页
                showDatas(parseInt($("html").attr("data-pageNum")), 5);
            }
        }
    })
}

// 点击修改按钮
function clickModifyBtn() {
    // 先请求用户当前数据信息，再显示模态框，并将用户信息回显到模态框中
    let userId = $(this).attr("data-id");
    // 发起请求
    $.ajax({
        type: "get",
        url: "findOne",
        data: {
            id: userId
        },
        success: function (result) {
            if (result.code == 200) {
                // 回显数据
                $("#modify-form input[name='username']").val(result.data.username);
                $("#modify-form input[name='password']").val(result.data.password);
                $("#modify-form input[name='age']").val(result.data.age);
                $("#modify-form input[name='email']").val(result.data.email);
                $("#modify-form input[name='hobbies']").val(result.data.hobbies);
                // 显示模态框
                $("#modify-modal").modal("show");
                // 将用户id记录到表单隐藏的input中
                $("#modify-form input[name='id']").val(result.data._id);
            }
        }
    })
}

// 点击删除按钮
function clickDeleteBtn() {
    // 获取id
    let id = $(this).data("id");
    // 发起请求
    $.ajax({
        type: "delete",
        url: "/deleteUser",
        data: {
            id: id
        },
        // 删除前询问
        beforeSend: function () {
            if (!confirm("您确定要删除本条数据吗？")) {
                return false;
            }
        },
        success: (result) => {
            if (result.code == 200) {
                // 刷新当前页
                showDatas(parseInt($("html").attr("data-pageNum")), 5, function () {
                    // 检测当前页是否已经没有用户信息
                    if ($("tbody").children().length == 0) {
                        // 如果没有用户信息就去上一页
                        showDatas(parseInt($("html").attr("data-pageNum")) - 1, 5);
                    }
                });
            }
        }
    })
}

// 点击分页按钮
function clickPageBtn() {
    // 判断是否可点
    if (!$(this).parent().hasClass("disabled")) {
        // 请求第 x 页数据
        showDatas(parseInt($(this).attr("data-pageNum")), 5);
    }
}

/**
 * 
 * @param {Number} pageNum 第几页
 * @param {Number} pageSize 每页几个
 */
function showDatas(pageNum, pageSize, callback) {
    $.ajax({
        type: "get",
        url: "/getList",
        data: {
            // 第几页
            pageNum: pageNum,
            // 获取多少条数据
            pageSize: pageSize
        },
        success: function (result) {
            console.log(result);  // result.data.sum
            // 拿到数据渲染到页面里面
            let dataStr = template("template_users", {
                list: result.data.data // 5条
            });
            $("tbody").html(dataStr);
            // 更新一下按钮模板
            let btnStr = template("template_btn", {
                // 数据总数量   页数  每页的有几个数据 
                // 去决定我们的按钮
                dataSum: result.data.sum,
                pageNum: pageNum,
                pageSize: pageSize,
                // 总页数
                pageSum: Math.ceil(result.data.sum / pageSize)
            })
            // 插入
            $(".pager").html(btnStr);
            // 在html中记录当前页
            $("html").attr("data-pageNum", pageNum);
            // 执行 完成后的回调函数
            if (callback) {
                callback();
            }
        }
    })
}