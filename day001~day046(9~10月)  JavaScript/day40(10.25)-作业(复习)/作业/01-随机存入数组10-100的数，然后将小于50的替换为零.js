// 1、定义一个长度为5的数组，之后生成5个随机数存入数组，随机数范围为10到100（包含10和100），遍历数组，将数组中小于50的元素替换成0，之后打印修改后的数组

// 步骤：
// 定义一个长度为5的数组
let arr = new Array(5)
// 声明一个随机数的函数，随机最小值到最大值之间的数，包含最大值和最小值
function getRandom(max, min) {
    let num = Math.floor(Math.random() * (max - min + 1) + min)
    return num;
}
// 利用for循环向数组添加元素,添加5次
for (let i = 0; i < arr.length; i++) {
    // 调用随机函数，添加元素
    arr[i] = getRandom(100, 10)
}
// 遍历数组
for (let j = 0; j < arr.length; j++) {
    // 如果元素小于50
    if (arr[j] < 50) {
        // 用splice方法删除此元素，并替换成0
        arr.splice(j, 1, 0)
    }
}
// 打印输出
console.log(arr);

