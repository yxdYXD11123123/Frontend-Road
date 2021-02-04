$(function () {
    $('#login-form').bootstrapValidator({
        // 默认为边写边校验  disabled为点击提交时校验
        // live: 'disabled',
        // 默认的提示消息
        message: 'This value is not valid',
        // 表单框里右侧的icon （反馈图标）
        feedbackIcons: {
            // 合法的
            valid: 'glyphicon glyphicon-ok',
            // 不合法的
            invalid: 'glyphicon glyphicon-remove',
            // 校验中
            validating: 'glyphicon glyphicon-refresh'
        },
        // 提交按钮
        submitButtons: '#login-button',
        fields: {
            email: {
                validators: {
                    notEmpty: {
                        message: '邮箱不能为空'
                    },
                    stringLength: {  //长度限制
                        min: 6,
                        max: 200,
                        message: '邮箱长度必须在6到200位之间'
                    },
                    emailAddress: {
                        message: '邮箱地址格式有误'
                    },
                    // 当服务器验证过之后再来重新校验
                    // 注意每个字段只能用一个自定义校验，并且只能是callback
                    callback: {
                        message: '邮箱错误'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {  //长度限制
                        min: 6,
                        max: 200,
                        message: '密码长度必须在6到200位之间'
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {//点击提交之后
        // 阻止默认提交
        e.preventDefault();
        // $form就是表单
        var $form = $(e.target);
        // 发起请求
        $.ajax({
            type: 'post',
            url: '/admin/login',
            data: $form.serialize(),
            success: function (result) {
                // 回显错误信息
                if (result.code == 500) {
                    /*
                        NOT_VALIDATED 未校验的
                        VALIDATING 校验中的
                        INVALID 校验失败的
                        VALID 校验成功的
                    */
                    if (result.message == '邮箱错误') {
                        // 提示 邮箱在后台的再次校验中失败
                        $form.data('bootstrapValidator').updateStatus('email', 'INVALID', 'callback');
                    }
                    if (result.message == '密码错误') {
                        // 提示 密码在后台的再次校验中失败
                        $form.data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
                    }
                }
                // 邮箱密码正确，跳转页面
                if (result.code == 200) {
                    location.href = '/admin/';
                }
            }
        })
    })
})