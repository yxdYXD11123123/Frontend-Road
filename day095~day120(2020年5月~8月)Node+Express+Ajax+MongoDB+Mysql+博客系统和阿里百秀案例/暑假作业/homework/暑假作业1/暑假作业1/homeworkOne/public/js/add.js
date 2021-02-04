$(function () {
    $('#add_form').bootstrapValidator({
        // 表单框里右侧的icon
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            hname: {
                validators: {
                    notEmpty: {
                        message: '英雄名不能为空'
                    }
                }
            },
            nickname: {
                validators: {
                    notEmpty: {
                        message: '英雄外号不能为空'
                    }
                }
            },
            skill: {
                validators: {
                    notEmpty: {
                        message: '英雄技能不能为空'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        //点击提交之后
        e.preventDefault();
        let $form = $(e.target);
        let data = $form.serialize();
        $.ajax({
            type: 'post',
            url: '/add',
            data,
            success: (result) => {
                if (result.code == 200) {
                    alert('英雄添加成功');
                    location.href = '/';
                }
                else {
                    alert('英雄添加失败，请您重新添加');
                    $('#heroName, #nickname, #skillName').val('');
                    $form.data('bootstrapValidator').updateStatus('hname', 'NOT_VALIDATED', null);
                    $form.data('bootstrapValidator').updateStatus('nickname', 'NOT_VALIDATED', null);
                    $form.data('bootstrapValidator').updateStatus('skill', 'NOT_VALIDATED', null);
                }
            }
        })
    })
})