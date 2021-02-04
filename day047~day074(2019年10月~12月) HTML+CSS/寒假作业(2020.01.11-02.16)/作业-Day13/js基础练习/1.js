// 1. 定义数组 var arr = [1,2,666,3,4],

// - 1） 给数组最后添加1个元素
// - 2）给数组最前面添加1个元素
// - 3）将元素666删除之后，添加一个元素"拉拉"

var arr = [1, 2, 666, 3, 4];
arr.push(8)
arr.unshift(8)
arr.splice(arr.indexOf(666), 1, "拉拉")
console.log(arr);
