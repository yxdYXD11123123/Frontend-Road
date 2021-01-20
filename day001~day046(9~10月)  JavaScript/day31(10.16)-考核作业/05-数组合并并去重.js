// 引用Lodash, 扩充我们js的方法
var _ = require('./lib/lodash')

// 现在有2个数组，var arr1 = [1,7,9,11,8,15,10,19],var arr2 =[2,1,6,8,10]
// 将2个数组合并为一个数组，并将数组去重，然后按照升序进行排列


// 分析：
var arr1 = [1, 7, 9, 11, 8, 15, 10, 19];
var arr2 = [2, 1, 6, 8, 10];

// 合并
var arr3 = arr1.concat(arr2)
console.log(arr3);
// 去重
var uniqArr = _.uniq(arr3);
console.log(uniqArr);

// 排序
uniqArr.sort(function(a,b){return a-b})
console.log(uniqArr);





