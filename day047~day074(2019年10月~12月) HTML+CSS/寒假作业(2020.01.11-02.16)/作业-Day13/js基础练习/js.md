## js简答题
1. 怎么定义一个二维数组？

   var arr = [1,[1,2]]

2. 数组的方法有哪些？请列举10个，并说明方法的作用

   .push()在数组末尾添加一个新的元素

   .pop()将数组末尾最后一个元素删除

   .unshift()在数组开头添加一个新的元素

   .shift()将数组开头第一个元素删除

   .indexOf()查找某个元素在数组中的位置，如果存在

   .reverse()反转数组

   .splice(开始的索引，删除几个元素，在删除的位置插入) 用于对数组的增删改

   .slice() 切割数组，返回切割出来的数组

   .concat() 合并多个数组

   .forEach() 遍历数组

   .includes() 判断一个数组是否包含一个指定的值，返回布尔值

   .join(分隔符)  将数组拼接成一个字符串

    

3. 怎么获取二维数组里面的某一个元素，自己定义数组

   var arr = [1,2,[12,3]]

   `arr[2][1]`

4. 数组的长度和数组的下标(索引)的对应关系

   数组的长度-1 = 数组的最大索引

## js编程题

1. 定义数组 var arr = [1,2,666,3,4],

 - 1） 给数组最后添加1个元素
 - 2）给数组最前面添加1个元素
 - 3）将元素666删除之后，添加一个元素"拉拉"
```js
var arr = [1, 2, 666, 3, 4];
arr.push(8)
arr.unshift(8)
arr.splice(arr.indexOf(666), 1, "拉拉")
console.log(arr);
```
2. 定义数组var arr = [2,4,77,100,1]
 - 1）在控制台输出数组的最大值
 - 2）在控制台输出数组的最小值
 ```js
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
 ```
3. 定义数组var arr = [1,2,3,4,5,6,1,2,3,1,2],将数组重复的元素去重,(请使用2种方式实现)
```js
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

```

4. 现有二维数组，var  array=[[1,2,8,9],[2,4,9,12],[4,7,10,13],[6,8,11,15]];                                       
   - 1). 遍历打印二维数组的所有元素
   - 2). 计算二维数组中所有元素的和
   - 3). 求二维数组中所有元素的最大值。

  ```js
var array = [[1, 2, 8, 9], [2, 4, 9, 12], [4, 7, 10, 13], [6, 8, 11, 15]];
let sum = 0;
let max = [array[0][0]]
for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
        console.log(array[i][j]);
        sum += array[i][j];
        if (array[i][j] > max) {
            max = array[i][j];
        }
    }
}
console.log("所有元素的和为" + sum);
console.log("最大值为" + max);



  ```