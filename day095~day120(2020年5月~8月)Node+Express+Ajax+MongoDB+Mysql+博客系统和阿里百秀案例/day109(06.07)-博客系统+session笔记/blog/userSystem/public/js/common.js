$(function () {
    // 校验登录框
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
    // 点击登录框中的登录按钮
    $(".login-btn").on("click", clickLogin);
})

function clickLogin() {
    // 如果校验通过
    if ($("#login-form").valid()) {
        // 发起请求
        let formdata = $("#login-form").serialize();
        // 如果为true，即为通过验证，发起ajax请求添加用户信息
        $.ajax({
            type: "post",
            url: "/api/login",
            data: formdata,
            success: (result) => {
                if (result.code == 200) {
                    // 刷新当前页
                    location.href = location.href;
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