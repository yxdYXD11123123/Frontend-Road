// 7.将字符串变成驼峰法var str = "get-element-by-id"， 结果是 "getElementById"

// 步骤：
var str = "get-element-by-id"
var arr = str.split('-')
// console.log(arr);
for (let i = 1; i < arr.length; i++) {
    arr[i] = arr[i].replace(arr[i][0], arr[i][0].toUpperCase())
}
// console.log(arr);
str = arr.join('')
console.log(str);
