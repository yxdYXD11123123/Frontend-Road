$(document).ready(function () {
    let id = new URLSearchParams(location.search).get("id");
    // 获取当前详情页信息
    getDetailDate(id);
    // 获取文章评论区内容
    getComments(id);

    // 校验评论区
    $(".comment-form").validate({
        rules: {
            content: {
                required: true
            }
        },
        messages: {
            content: {
                required: "你还没有填写评论内容"
            }
        },
        submitHandler: function (form) {
            // 使用 $.ajax 上传 formdata序列化的数据时，必须设置processData和contentType
            let formdata = new FormData(form);
            // 发送请求
            $.ajax({
                type: "post",
                url: "/api/addComment",
                data: {
                    uid: formdata.get("uid"),
                    content: formdata.get('content'),
                    aid: id,
                    commentTime: new Date()
                },
                success: function (result) {
                    if (result.code == 200) {
                        // 清空输入框
                        $(".comment-form textarea").val("");
                        // 刷新评论区
                        getComments(id);
                    }
                }
            })
        }
    })
})

// 获取详情页信息并插入页面
function getDetailDate(id) {
    // 发起ajax请求
    $.get("/api/details?id=" + id, null, function (result) {
        console.log(result);
        // 修改时间
        result.data.publishDate = moment(result.data.publishDate).format("YYYY-MM-DD");
        // 插入模板
        let articleStr = template("details_template", result.data);
        $(".container").prepend(articleStr);
    })
}

// 获取文章评论信息
function getComments(id) {
    $.get("/api/getComments", { id: id }, function (result) {
        if (result.code == 200) {
            // 修改时间格式
            for (let i = 0; i < result.data.length; i++) {
                // 修改时间格式
                result.data[i].commentTime = moment(result.data[i].commentTime).format("YYYY-MM-DD");
            }
            // 制作模板并插入
            let commentsStr = template("template_comments", result);
            $(".comment-list").html(commentsStr);
        }
    })
}