// 9. 录入一个三位数，按逆序打印出各位数字。例如原数字为321，应输出123。

// 步骤：
// 声明一个变量，作为录入的三位数
let num = 123
// 找出个位，百位，赋值给变量
let gewei = num % 10
let shiwei = Math.floor(num % 100 / 10)
let baiwei = Math.floor(num / 100)
// 换位置输出
console.log('' + gewei + shiwei + baiwei);
