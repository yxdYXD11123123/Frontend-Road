$(function () {
    // 先显示所有的
    $.ajax({
        type: 'get',
        url: '/findAllHeros',
        success: (result) => {
            if (result.code == 200) {
                // 制作模板
                let tbodyStr = template('tempHeros', result);
                // 插入
                $('tbody').html(tbodyStr);
            }
        }
    });

    // 给搜索按钮绑定点击事件
    $('#searchBtn').on('click', clickSearchBtn);

    // 给删除按钮绑定点击事件
    $('tbody').on('click', '#deleteBtn', clickDeleteBtn);
})

// 点击查询
function clickSearchBtn() {
    let searchKey = $('#searchInput').val().trim();
    // if (searchKey.trim().length == 0) {
    //     return alert('请您输入查询关键字');
    // };
    // 发起请求 
    $.ajax({
        type: 'post',
        url: '/likeSearch',
        data: {
            searchKey
        },
        success: (result) => {
            if (result.code == 200) {
                // 制作模板
                let tbodyStr = template('tempHeros', result);
                // 插入
                $('tbody').html(tbodyStr);
            }
        }
    })
}

// 点击删除
function clickDeleteBtn() {
    // 发送请求
    $.ajax({
        type: 'delete',
        url: '/deleteHero',
        data: {
            id: $(this).data('id')
        },
        success: (result) => {
            console.log(result);
        }
    })
}