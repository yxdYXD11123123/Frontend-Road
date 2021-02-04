$(function () {
    // 点击删除用户
    $("tbody").on("click", ".deleteUserBtn", clickDeleteUserBtn);

    // 点击添加用户
    $('.add-btn').on("click", clickAddUserBtn);

    // 显示批量删除
    $('tbody').on("click", 'input[type="checkbox"]', clickCheckbox);

    // 点击批量删除
    $(".delete_users").on("click", clickDeleteUsersByGroup);
})

//#region 点击删除用户
function clickDeleteUserBtn() {
    // 发起请求
    $.ajax({
        type: 'put',
        url: '/admin/users/deleteOne',
        data: {
            id: $(this).data('id')
        },
        success: (result) => {
            console.log(result);
            if (result.code == 200) {
                // 局部刷新所有用户
                refreshUsers();
            }
        }
    })
}
//#endregion


//#region 局部刷新所有用户
function refreshUsers() {
    $.ajax({
        type: 'get',
        url: '/admin/users/getAllUsers',
        success: (result) => {
            let tbodyStr = template('template_users', { users: result.data });
            $('tbody').html(tbodyStr);
        }
    })
}
//#endregion


//#region 点击添加用户
function clickAddUserBtn() {
    console.log($('#adduser-form').serialize());
}
//#endregion

//#region  显示批量删除
function clickCheckbox() {
    // 假设没有复选框被选中
    let flag = false;
    // 遍历每个复选框的选择状况
    $.each($("tbody input[type='checkbox']"), function (i, j) {
        // 这里的j 就是4个复选框 DOM对象
        if (j.checked == true) {
            flag = true;
        }
    })
    if (flag == true) {
        // 有复选框被选中，显示批量删除按钮
        $('.delete_users').show();
    }
    else {
        // 无复选框被选中，隐藏批量删除按钮
        $('.delete_users').hide();
    }
}
//#endregion

//#region 点击批量删除
function clickDeleteUsersByGroup() {
    let idArr = [];
    // 将选中的id记录到数组中
    $.each($('tbody input:checkbox'), (i, j) => {
        if (j.checked == true) {
            idArr.push(parseInt($(j).val()));
        }
    })
    // 发起请求
    $.ajax({
        type: 'put',
        url: '/admin/users/DeleteUsers',
        data: {
            idArr
        },
        success: (result) => {
            if (result.code == 200) {
                // 局部刷新所有用户
                refreshUsers();
            }
        }
    })
}
//#endregion