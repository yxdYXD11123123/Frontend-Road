$(function () {
    // 获取id
    let id = new URLSearchParams(location.search).get("articleid");
    // 发送请求
    getArtcle(id);

    // 当 type 为 file 的input内容发生变化的时候，预览图片
    $("#modify-form").on("change", "input[type=file]", function () {
        // 获取图片文件信息，处理成url路径赋值给imgSrc
        let imgSrc = URL.createObjectURL($(this)[0].files[0]);
        $(".img-thumbnail").attr("src", imgSrc);
    })

    // 表单校验
    // 校验表单
    $("#modify-form").validate({
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
            }
        },
        messages: {
            title: {
                required: "标题必须填写",
                minlength: "标题必须在1-20个字符之间",
                maxlength: "标题必须在1-20个字符之间"
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
                url: '/article/modifyArticle',
                data: formdata,
                contentType: false,
                processData: false,
                success: (result) => {
                    if (result.code == 200) {
                        alert("文章修改成功");
                        location.href = "/article";
                    }
                }
            })
        }
    });
})

function getArtcle(id) {
    $.ajax({
        type: "get",
        url: '/article/findOneArticle',
        data: {
            id: id
        },
        success: (result) => {
            if (result.code == 200) {
                console.log(result);
                // 修改时间 格式
                result.data.publishDate = moment(result.data.publishDate).format("YYYY-MM-DD")
                let formStr = template("template-modify", result.data);
                $("#modify-form").html(formStr);
            }
        }
    })
}