// 10.定义一个三位数，求各位数的平方和是多少，在控制台输出。

// 步骤：
// 声明一个变量，作为三位数
let num = 123
// 声明个位，十位，百位数的变量
let gewei = num % 10;
let shiwei = Math.floor(num % 100 / 10)
let baiwei = Math.floor(num / 100)
// 算出各位数的平方，并相加，输出和
console.log(gewei * gewei + shiwei * shiwei + baiwei * baiwei);
