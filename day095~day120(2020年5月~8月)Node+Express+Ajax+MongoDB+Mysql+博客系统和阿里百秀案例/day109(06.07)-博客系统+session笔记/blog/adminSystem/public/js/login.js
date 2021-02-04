$(document).ready(function () {
    // 给添加按钮绑定事件
    $(".login-btn").on("click", clickAddBtn)
    // 给 表单绑定校验规则
    $("#login-form").validate({
        rules: {
            password: {
                required: true
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            password: {
                required: "密码必须填"
            },
            email: {
                required: "邮箱必须填",
                email: "请填写正确的邮箱格式"
            }
        }
    })
})

function clickAddBtn() {
    // 通过 表单校验的 valid方法 得知是否通过校验 
    if ($("#login-form").valid()) {
        // 获取表单的序列化信息
        let formdata = $("#login-form").serialize();
        // 如果为true，即为通过验证，发起ajax请求添加用户信息
        $.ajax({
            type: "post",
            url: "/api/login",
            data: formdata,
            success: (result) => {
                if (result.code == 200) {
                    location.href = "/user";
                }
            },
            error: (err) => {
                if (err.responseJSON.code == 400) {
                    alert(err.responseJSON.msg);
                    $("#login-form").find("input").val("");
                }
            }
        })
    }
}