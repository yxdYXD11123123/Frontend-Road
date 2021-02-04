$(function () {
    //#region 图片预览
    $('#feature').on('change', changeFeature)
    //#endregion

    //#region 校验表单
    $('#edit-form').bootstrapValidator({
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
        submitButtons: '#save-button',
        fields: {
            title: {
                validators: {
                    notEmpty: {
                        message: '标题不能为空'
                    }
                }
            },
            content: {
                validators: {
                    notEmpty: {
                        message: '内容不能为空'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        // $form就是表单
        var $form = $(e.target);
        let formData = new FormData($form[0]);
        // 发送请求
        $.ajax({
            type: 'post',
            url: '/admin/post-edit/saveEdit',
            contentType: false,
            processData: false,
            data: formData,
            success: (result) => {
                console.log(result);
            }
        })
    })
    //#endregion
})


//#region 图片预览
function changeFeature() {
    let src = URL.createObjectURL($(this)[0].files[0]);
    $(this).before(`<img class="help-block thumbnail" src=${src}>`);

}
//#endregion