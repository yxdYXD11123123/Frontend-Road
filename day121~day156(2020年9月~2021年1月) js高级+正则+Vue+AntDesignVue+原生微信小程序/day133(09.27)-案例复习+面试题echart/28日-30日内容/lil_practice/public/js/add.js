$(document).ready(function () {
    // 给添加按钮绑定事件
    $(".addbtn").on("click", clickAddBtn)
    // 给 表单绑定校验规则
    $("#add-form").validate({
        rules: {
            username: {
                required: true,
                minlength: 2,
                maxlength: 6
            },
            password: {
                required: true
            },
            age: {
                min: 1,
                max: 113
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            username: {
                required: "用户名必填",
                minlength: "用户名最少两个字",
                maxlength: "用户名最多6个字"
            },
            password: {
                required: "密码必须填"
            },
            age: {
                min: "年龄最小为1岁",
                max: "年龄最大为113岁"
            },
            email: {
                required: "邮箱必须填"
            }
        }
    })
})

function clickAddBtn() {
    // 通过 表单校验的 valid方法 得知是否通过校验 
    if ($("#add-form").valid()) {
        // 获取表单的序列化信息
        let formdata = $("#add-form").serialize();
        // 如果为true，即为通过验证，发起ajax请求添加用户信息
        $.ajax({
            type: "post",
            url: "/addUser",
            data: formdata,
            success: (result) => {
                if (result.code == 200) {
                    // 跳转页面
                    location.href = "/"
                }
            }
        })
    }
}