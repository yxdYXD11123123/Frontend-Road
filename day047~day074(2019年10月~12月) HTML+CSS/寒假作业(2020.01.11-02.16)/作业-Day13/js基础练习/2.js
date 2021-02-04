// 2. 定义数组var arr = [2,4,77,100,1]

// - 1）在控制台输出数组的最大值
// - 2）在控制台输出数组的最小值

var arr = [2, 4, 77, 100, 1];
var max = arr[0]
for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
        max = arr[i]
    }
}
console.log("数组的最大值为" + max);

var min = arr[0]
for (let i = 0; i < arr.length; i++) {
    if (arr[i] < min) {
        min = arr[i]
    }
}
console.log("数组的最大值为" + min);

