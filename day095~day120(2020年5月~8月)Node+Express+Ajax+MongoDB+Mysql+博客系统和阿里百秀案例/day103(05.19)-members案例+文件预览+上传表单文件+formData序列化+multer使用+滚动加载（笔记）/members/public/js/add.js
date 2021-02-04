$(document).ready(function () {
    // 文件预览效果
    $("#input_avatar").on("change", fileChange)
    // 给sava按钮添加点击事件
    $("#btn_add").on("click", clickAdd)
})

function fileChange() {
    // 获取文件 url
    let file = $(this)[0].files[0]
    // 将文件信息转换为url，赋值给图片src属性，达到预览效果
    let imgSrc = URL.createObjectURL(file);
    $("#avatar").attr('src', imgSrc);
}

function clickAdd(e) {
    // 先阻止默认的浏览器行为
    e.preventDefault();
    // 获取表单内容
    let dataName = $("#input_name").val().trim();
    let dataBio = $("#input_bio").val().trim();
    let dataAvatar = $("#input_avatar")[0].files[0];
    // 序列化一个表单对象
    let formData = new FormData();
    formData.append("name", dataName);
    formData.append("bio", dataBio);
    formData.append("avatar", dataAvatar);
    if (formData.get("name") == "") {
        // 请输入名字
        alert("请您输入名字")
    }
    else if (formData.get("bio") == "") {
        // 请输入描述
        alert("请您输入描述")
    }
    else {
        // 发起请求
        $.ajax({
            type: "post",
            url: "/addData",
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                if (result.code == 200) {
                    // 跳回首页
                    location.href = "/index.html"
                }
            }
        })
    }
}