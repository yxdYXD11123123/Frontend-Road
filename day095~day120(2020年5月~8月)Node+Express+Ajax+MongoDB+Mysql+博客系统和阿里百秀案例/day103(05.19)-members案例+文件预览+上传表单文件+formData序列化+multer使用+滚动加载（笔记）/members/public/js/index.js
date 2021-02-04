// 设置一个请求数据的节流阀
let reqPartFlag = true;
$(document).ready(function () {
    // 进入页面，请求一次
    requestPart(6);
    // 监听页面滚动
    $(document).on("scroll", scrollPage);
    // 绑定删除功能
    $("#members").on('click', ".deletebtn", deleteData)
})

/**
 *  页面滚动事件
 */
function scrollPage() {
    // 通过计算，如果页面即将到达members底部，申请更多数据插入页面
    let distance = $("main").height() + $("header").height();
    if ($(this).scrollTop() > distance - $(window).height() - 120) {
        requestPart(6);
    }
}

// 请求数据
function requestPart(amount) {
    if (reqPartFlag) {
        reqPartFlag = false;
        // 获取当前页面中最后一成员的信息
        let lastId;
        // 如果 members大盒子中没有一个子盒子，说明页面中还没有获取信息，让lastId为null
        if ($("#members").children().length == 0) {
            lastId = null
        }
        // 如果有，那就将最后盒子中信息的id 赋值给 lastId 
        else {
            lastId = $("#members").children().eq(-1).find("p").next().attr("data-id")
        }
        // 向后台申请部分数据
        $.ajax({
            type: "get",
            url: "/getPart",
            // 把当前的最后一个id传给后端
            data: {
                last: lastId,
                amount: amount
            },
            success: function (result) {
                // 如果返回的code属性为200，说明获取成功
                if (result.code) {
                    console.log(result.data);
                    // 如果到后面数据为空数据了，解绑滚动事件
                    if (result.data.length == 0) {
                        $(document).off("scroll")
                    }
                    // 获取成功后，用获取的数据制作模板
                    let htmlStr = template("template_members", {
                        list: result.data
                    })
                    // 插入
                    $("#members").append(htmlStr);
                    // 打开阀门
                    reqPartFlag = true;
                }
            }
        })
    }
}

// 删除功能
function deleteData(e) {
    // 取消默认行为
    e.preventDefault();
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
                    // 淡出
                    $(this).parents(".member").fadeOut(function () {
                        // 删除
                        $(this).remove();
                        // 向后台再申请一条数据
                        requestPart(1);
                    })
                }
            }
        })
    }
}