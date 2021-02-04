// 已有数组var nums = [5,10,15],要求创建一个新数组


let nums = [5, 10, 15];
// 1.新数组的长度和已知数组相同
let newArr = new Array(nums.length);
console.log(newArr.length);
// 2.新数组每个元素的值，是已知对应位置元素的2倍
nums.forEach((value, index) => {
    newArr[index] = value * 2;
});
console.log(newArr);

// 3.在控制台中打印新数组的所有元素
newArr.forEach((value, index) => {
    console.log(value);
});