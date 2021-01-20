// 9.已知字符串："this is a test of java"
// (1) 取出子字符串"test"
// (2) 将'java'替换为'JAVASE'

// 步骤：
let str = "this is a test of java"
// 1. 取子字符串
let Tsecond = str.indexOf('t', 1)
let strSon = str.substr(Tsecond, 4)
console.log(strSon);

// 2. 将'java'替换为'JAVASE'
let arr = str.split(' ')
arr[arr.length - 1] = arr[arr.length - 1].toUpperCase()
arr[arr.length - 1] = arr[arr.length - 1].concat("SE")
str = arr.join(' ')
console.log(str);
