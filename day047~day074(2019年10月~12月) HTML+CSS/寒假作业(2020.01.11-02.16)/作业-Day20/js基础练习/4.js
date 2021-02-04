// 操作数组 var arr = [2,3,4,5,6] 
// 1) 将1放到数组中2的前面
// 2) 删除数组中的6
// 3) 将数组的所有剩余元素求和
// 4) 在 3) 的基础上通过length求出数组元素和的平均值
// 5) 用方法判断数组中是否有6这个元素，有返回索引，无则返回false

let arr = [2, 3, 4, 5, 6];
arr.unshift(1)
console.log(arr);
delete arr.splice(arr.indexOf(6), 1);
console.log(arr);

let sum = 0;
for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
}
console.log(sum);
console.log(sum / arr.length);

if (arr.indexOf(6) == -1) {
    console.log(false);
}
else {
    console.log(arr.indexOf(6));
}
