// /**
//  * reduce 函数的 参数一：
//  * 用于执行每个数组元素的函数
//  * @param {*} total 每次执行函数的初始值（上次计算后的返回值）
//  * @param {*} curVal 数组元素，每次遍历的当前元素
//  * @param {*} curIndex 当前索引
//  * @param {*} arr 整个数组
//  * @returns 返回结果作为下次函数的初始值
//  */
// function reducer(total, curVal, curIndex, arr) {
//   console.log(total);
//   console.log(curVal);
//   console.log(curIndex);
//   console.log(arr);
//   // 返回一个结果，作为下一次函数的初始值
//   return ++total;
// }

// // reduce 函数
// // 参数二： 开始执行函数的初始值total（第一次函数的初始值）
// const res = ['post', 'put', 'patch'].reduce(reducer, 1)

// // 返回值为最终计算结果
// console.log(res);


const target = { a: 1, b: 2 }
const source = { b: 4, c: 5 }
const sourceMore = { xx: 88 }

// target 拷贝到哪个对象
// source 从哪个资源对象中拷贝
const returnedTarget = Object.assign(target, source, sourceMore);

console.log(target);  // { a: 1, b: 4, c: 5, xx: 88 }
// 返回了 拷贝后的源对象
console.log(target === returnedTarget); // true
