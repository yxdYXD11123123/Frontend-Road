// 14.将一个一维数组，var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
//     通过一定方法，转成二维数组 var newarr = [[1,2,3,4,5,6],[7,8,9,10,11,12],[13,14,15,16,17,18]]

var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
// 用slice()切割数组
var one = arr.slice(0,6)
console.log(one);
var two = arr.slice(6,12)
console.log(two);
var three = arr.slice(12,18)
console.log(three);
// 声明新数组，将三个小数组加入新数组
var newarr = []
newarr[0] = one 
newarr[1] = two
newarr[2] = three
console.log(newarr);




