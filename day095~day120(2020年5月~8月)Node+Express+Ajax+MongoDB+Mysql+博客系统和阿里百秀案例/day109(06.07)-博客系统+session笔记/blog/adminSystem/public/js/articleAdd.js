$(function () {
    // 当 type 为 file 的input内容发生变化的时候，预览图片
    $("input[type=file]").on("change", function () {
        // 获取图片文件信息，处理成url路径赋值给imgSrc
        let imgSrc = URL.createObjectURL($(this)[0].files[0]);
        $(".img-thumbnail").attr("src", imgSrc);
    })

    // 校验表单
    $("#add-form").validate({
        rules: {
            title: {
                required: true,
                minlength: 1,
                maxlength: 20
            },
            publishDate: {
                required: true,
            },
            content: {
                required: true
            },
            cover: {
                required: true
            }
        },
        messages: {
            title: {
                required: "标题必须填写",
                minlength: "标题必须在1-20个字符之间",
                maxlength: "标题必须在1-20个字符之间"
            },
            cover: {
                required: "封面图片必须选择"
            },
            publishDate: {
                required: "发布日期必须选择"
            },
            content: {
                required: "文章内容必须填写"
            }
        },
        submitHandler: function (form) {
            let formdata = new FormData(form);
            $.ajax({
                type: "post",
                url: '/article/addArticle',
                data: formdata,
                contentType: false,
                processData: false,
                success: (result) => {
                    if (result.code == 200) {
                        // 跳转
                        alert("文章添加成功");
                        location.href = '/article'
                    }
                }
            })
        }
    });
})