$(function () {
    $('#login-form').bootstrapValidator({
        // 表单框里右侧的icon
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                message: '用户名验证失败',
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {  //长度限制
                        min: 2,
                        max: 10,
                        message: '用户名长度必须在2到10位之间'
                    },
                    remote: { // ajax校验，获得一个json数据（{'valid': true or false}）
                        url: '/isUsernameRight',       //验证地址
                        message: '用户不存在',   //提示信息
                        type: 'POST',          //请求方式
                        data: function (validator) {  //自定义提交数据，默认为当前input name值
                            return {
                                act: 'is_registered',
                                username: $("input[name='username']").val()
                            };
                        }
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {  //长度限制
                        min: 5,
                        max: 18,
                        message: '密码长度必须在5到18位之间'
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        //点击提交之后
        e.preventDefault();
        let $form = $(e.target);
        let formdata = new FormData($form[0]);
        let username = formdata.get('username');
        let password = md5(formdata.get('password'));
        $.ajax({
            type: 'post',
            url: '/login',
            data: {
                username,
                password
            },
            success: (result) => {
                console.log(result);
                if (result.code == 200) {
                    location.href = '/';
                }
                if (result.code == 500) {
                    /*
                    NOT_VALIDATED 未校验的
                    VALIDATING 校验中的
                    INVALID 校验失败的
                    VALID 校验成功的
                    */
                    if (result.message == '密码错误') {
                        $form.data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
                    }
                    else {
                        alert('请正常输入用户名和密码');
                    }
                }
            }
        })
    });
})