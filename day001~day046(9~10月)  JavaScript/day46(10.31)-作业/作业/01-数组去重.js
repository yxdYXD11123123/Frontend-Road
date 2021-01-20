//  需求：给数组去重

//  分析：Set集合 相比于数组的优点就是没有重复的元素。
let arr = [1, 2, 3, 4, 5, 2, 3, 6]

// // 方法一：
// // 将arr数组转为Set集合，转为集合后会自动去除重复元素
// let set = new Set(arr)
// // 清空数组
// arr = []
// // 遍历Set集合，将每个元素添加到arr中
// for (let key of set.keys()) {
//     arr.push(key)
// }
// // 输出去重后的数组
// console.log(arr);

// 方法二：
// 循环遍历每一位数组元素
for (let i = 0; i < arr.length; i++) {
    // 在循环遍历每一位元素  之后的每位元素 
    for (let j = i + 1; j < arr.length; j++) {
        // 判断两数是否相等
        if (arr[i] == arr[j]) {
            // 如果相等，删除后面这位相同的元素
            arr.splice(j, 1)
            // 并且将遍历  之后每位元素的索引后退一位
            j--
        }
    }
}
console.log(arr);

