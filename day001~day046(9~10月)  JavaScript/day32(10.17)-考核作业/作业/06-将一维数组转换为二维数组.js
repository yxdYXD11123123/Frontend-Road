// 35.将一个一维数组，var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
//     通过一定方法，转成二维数组 var newarr = [[1,2,3,4,5,6],[7,8,9,10,11,12],[13,14,15,16,17,18]]

// 分析：使用splice,将数组分为6个一组,截取出来,依次push给newarr
var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
// 准备一个新数组
var newarr = []
for (var i=0; i<arr.length; i++)
{
    //使用splice,将数组分为6个一组,截取出来,依次push给newarr
    var a = arr.splice(0,6)
    newarr.push(a)
}
console.log(newarr);

// 方法二:
// 分析: 使用slice,拷贝部分数组
var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
// 准备一个新数组
var newarr = []
// 用for循环遍历数组中元素,步进为6,因为每个小新组需要6个元素,每下一次循环需要从后移6位开始拷贝
for (var i=0; i<arr.length; i+=6)
{
    // 给新数组中添加拷贝下的小数组,拷贝索引为i到i+6的元素
    newarr.push(arr.slice(i,i+6))
}
console.log(newarr);


