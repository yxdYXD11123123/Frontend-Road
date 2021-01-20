// 5.删除一个字符串中出现最多的字符, var str="assdfscfwssseee"

// 步骤：
var str = "assdfscfwssseee"
// 准备一个空对象，记录每个字符的出现次数
var obj = {}
// 循环遍历字符串
for (let i = 0; i < str.length; i++) {
    // 将 字符串 中的每个字符 以键值对的方式记录出现次数存入对象属性中
    if (obj[str[i]] >= 1) {
        obj[str[i]]++
    }
    else {
        obj[str[i]] = 1
    }
}
// 声明一个变量为最大的出现次数
let max = 0
// 遍历对象键值，求出最大的出现次数
for (let key in obj) {
    if (obj[key] > max) {
        max = obj[key]
    }
}
// 遍历对象键值对，找出键值最大的键，也就是出现最多的字符
for (let key in obj) {
    if (obj[key] == max) {
        // 赋值给max
        max = key
    }
}
// console.log(max);
// 循环，将字符串中出现最多的字符，替换为空字符串，相当于删除
for (let i = 0; i < obj[max]; i++) {
    str = str.replace(max, '')
}
console.log(str);
