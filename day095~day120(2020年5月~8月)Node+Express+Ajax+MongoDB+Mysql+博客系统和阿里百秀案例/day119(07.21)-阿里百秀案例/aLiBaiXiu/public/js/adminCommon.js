// 公共的代码
$(function () {
    //#region  退出登录
    $("#logout-button").on("click", logOut);
    //#endregion

    //#region 控制侧边栏显示和隐藏
    $("#navbarButton").on("click", toggleAside);
    //#endregion
})

//#region  退出登录功能
function logOut() {
    $.ajax({
        tpye: 'get',
        url: '/admin/logout',
        data: null,
        success: function (result) {
            if (result.code == 200) {
                location.href = '/admin/login';
            }
        }
    })
};
//#endregion

//#region 控制侧边栏显示和隐藏
function toggleAside() {
    $(".main, .aside").toggleClass("toggle");
}
//#endregion