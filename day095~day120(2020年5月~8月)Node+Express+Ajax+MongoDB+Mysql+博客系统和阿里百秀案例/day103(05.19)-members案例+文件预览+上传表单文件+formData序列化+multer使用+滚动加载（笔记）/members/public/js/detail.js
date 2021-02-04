$(document).ready(function () {
    // 获取id
    let id = new URLSearchParams(location.search).get("id");
    // 请求当前的id的对应数据
    $.ajax({
        type: 'get',
        url: '/getDetail',
        data: {
            id: id
        },
        success: (result) => {
            if (result.code == 200) {
                // 制作模板并插入
                let htmlStr = template("template_detail", {
                    detail: result.data
                })
                // 插入
                $("#detail").html(htmlStr);
            }
        }
    })
    // 绑定删除功能
    $("#detail").on("click", ".deletebtn", clickDelete)
})

function clickDelete(event) {
    event.preventDefault();
    // 询问确认
    let isSure = confirm("您确认要删除这个成员信息？");
    if (isSure) {
        // 获取id
        let deleteId = $(this).attr("data-id")
        // 发起请求
        $.ajax({
            type: "get",
            url: "/deleteData",
            data: {
                id: deleteId
            },
            // 删除成功后，删除当前页面中的这条数据
            // 这里最好用箭头函数
            success: (result) => {
                if (result.code == 200) {
                    // 跳回首页，
                    location.href = "/index.html";
                }
            }
        })
    }
}
