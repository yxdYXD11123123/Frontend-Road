//  1.将字符串 var str="abcdefgh"进行反转，结果是 "hgfedcba"

//  步骤：
var str = "abcdefgh"
// 逆序遍历字符串添加到一个新数组中
let arr = []
for (let i = str.length - 1; i >= 0; i--) {
    arr.push(str[i])
}
// 使用join（）将数组变为字符串，字符之间加空字符串连接起来， 并输出
console.log(arr.join(''));
