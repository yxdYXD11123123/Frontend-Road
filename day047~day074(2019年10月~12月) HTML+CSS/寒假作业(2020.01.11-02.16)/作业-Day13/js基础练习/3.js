// 定义数组var arr = [1,2,3,4,5,6,1,2,3,1,2],将数组重复的元素去重,(请使用2种方式实现)

var arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 1, 2];

// 方法一：
// for (let i = 0; i < arr.length; i++) {
//     for (let j = i + 1; j < arr.length; j++) {
//         if (arr[i] == arr[j]) {
//             arr.splice(j, 1);
//             j--;
//         }
//     }
// }
// console.log(arr);

// 方法二：
// let newArr = new Set(arr);
// arr = Array.from(newArr); // 将Set集合转换为数组结构
// console.log(arr);

// 方法三：
let newArr = []
for (let i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) != -1) {
        continue;
    }
    newArr.push(arr[i]);
}

console.log(newArr);

