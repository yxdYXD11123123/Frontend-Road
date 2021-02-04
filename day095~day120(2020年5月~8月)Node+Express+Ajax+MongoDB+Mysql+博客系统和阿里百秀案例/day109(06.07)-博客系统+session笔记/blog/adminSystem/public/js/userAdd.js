$(function () {
    $("#add-form").validate({
        rules: {
            username: {
                required: true,
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 12
            },
            email: {
                required: true
            },
            role: {
                required: true
            },
            messages: {
                username: {
                    required: "用户名必须填写",
                    minlength: "用户名不得少于两位",
                    maxlength: "用户名不得超过10位"
                },
                password: {
                    required: "密码必须填写",
                    minlength: "用户名不得少于6位",
                    maxlength: "用户名不得超过12位"
                },
                email: {
                    required: "邮箱必须填写",
                    email: "邮箱格式不正确"
                },
                role: {
                    required: "角色必须选择"
                }
            }
        }
    })
    // 给添加按钮绑定事件
    $(".add-btn").on("click", clickAddBtn)
})

function clickAddBtn() {
    if ($("#add-form").valid()) {
        // 获取表单的序列化信息
        let formdata = $("#add-form").serialize();
        // 如果为true，即为通过验证，发起ajax请求添加用户信息
        $.ajax({
            type: "post",
            url: "/user/addUser",
            data: formdata,
            success: (result) => {
                if (result.code == 400) {
                    // 说明有错误
                    $(".title .tips").html("错误信息：" + result.msg).css("color", "red")
                }
                if (result.code == 200) {
                    // 用户添加成功
                    location.href = '/user'
                }
            }
        })
    }
}