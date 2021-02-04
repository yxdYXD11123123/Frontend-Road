// 数据
var datas = [
    { pName: '牛奶', src: './uploads/01.jpg', price: 10, count: 3 },
    { pName: '三只松鼠', src: './uploads/02.jpg', price: 30, count: 1 },
    { pName: '蓝牙播放器', src: './uploads/03.jpg', price: 100, count: 1 },
    { pName: '大米', src: './uploads/04.jpg', price: 50, count: 1 },
    { pName: '路由器', src: './uploads/05.jpg', price: 110, count: 1 },
    { pName: '罐头', src: './uploads/06.jpg', price: 20, count: 1 }
];


// 【功能1：生成表格】
// 1. 遍历数组datas，取出一个对象，就生成一个tr，追加到tbody中
for (var i = 0, len = datas.length; i < len; i++) {
    // 取出一个对象
    var obj = datas[i];
    // 生成tr
    var $tr = $('<tr></tr>'); 
    // 追加到tbody中
    $tr.appendTo('tbody');
    // 创建第1个td
    $('<td></td>').html('<input type="checkbox" >').appendTo($tr);
    // 创建第2个td
    $('<td></td>').html('<img src="'+obj.src+'"><p>'+obj.pName+'</p>').appendTo($tr);
    // 创建第3个td
    $('<td></td>').html(obj.price + '￥').appendTo($tr);
    // 创建第4个td
    $('<td></td>').html(' <div class="count-c clearfix"><a href="javascript:" class="reduce disabled">-</a><input type="text" value="'+obj.count+'"><a href="javascript:" class="add">+</a></div>').appendTo($tr);
    // 创建第5个td
    $('<td></td>').html(obj.count * obj.price + '￥').appendTo($tr);
    // 创建第6个td
    $('<td></td>').html('<a href="javascript:" class="del">删除</a>').appendTo($tr);
}

// 【功能2：全选→点击thead中的复选框时，tbody中的复选框同步变化】

// 【功能3：控制全选→点击tbody中的某一个复选框，控制thead中的复选框是否选中】
// 【功能4：封装计算选中的总数量和总价格】

// 【功能5：点击加按钮实现数量递增】

// 【功能6：点击减按钮实现数量递减】

// 【功能7：删除单项】

// 【功能8：删除所选项】

// 【功能9：清理购物车】




