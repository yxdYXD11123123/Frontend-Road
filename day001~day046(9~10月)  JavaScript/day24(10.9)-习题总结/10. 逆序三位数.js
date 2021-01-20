// 需求: 声明一个三位数，按逆序打印出各位数字。例如原数字为312，应输出213。
// 分析：将一个三位数逆序，那么需要将每一位数提取出来，重新排序

// 步骤：
// 首先声明一个变量 三位数
var a = 123
// 声明三个变量，将每一位数提取出来
var gewei = a%10
var shiwei = parseInt(a%100/10)
var baiwei = parseInt(a/100)
// console.log(gewei,shiwei,baiwei);    测试一下每一位数是否提取正确
// 方法一：引用一个空字符串， 将三位数逆序排列  用字符串+数字 将数字转化为字符串拼接输出的原理 逆序输出这个三位数
console.log(gewei+''+shiwei+baiwei);
// 方法二：将个位数乘100，十位数乘10，百位数   相加
console.log(gewei*100+shiwei*10+baiwei)