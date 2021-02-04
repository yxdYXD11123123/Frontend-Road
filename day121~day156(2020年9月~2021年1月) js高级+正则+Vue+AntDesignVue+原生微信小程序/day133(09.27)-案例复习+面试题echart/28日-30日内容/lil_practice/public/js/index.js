$(document).ready(function () {
    // 请求第一页
    showDatas();

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
                showDatas();
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
                console.log(result);
                // 回显数据
                $("#modify-form input[name='username']").val(result.data.uname);
                $("#modify-form input[name='password']").val(result.data.password);
                $("#modify-form input[name='age']").val(result.data.age);
                $("#modify-form input[name='email']").val(result.data.email);
                $("#modify-form input[name='hobbies']").val(result.data.hobbies);
                // 显示模态框
                $("#modify-modal").modal("show");
                // 将用户id记录到表单隐藏的input中
                $("#modify-form input[name='id']").val(result.data.uid);
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
                showDatas();
            }
        }
    })
}

/**
 * 
 * @param {Number} pageNum 第几页
 * @param {Number} pageSize 每页几个
 */
function showDatas(pageNum, pageSize, callback) {
    $.ajax({
        type: "get",
        url: "/getUsers",
        success: function (result) {
            console.log(result);  // result.data.sum
            // 拿到数据渲染到页面里面
            let dataStr = template("template_users", {
                list: result.data.data
            });
            $("tbody").html(dataStr);
            if (callback) {
                callback();
            }
        }
    })
}