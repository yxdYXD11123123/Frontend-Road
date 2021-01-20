// 13.  将下面的数组元素前后互换
//       [11, 32，55, 47，79，23]	
//      置换后的数组元素为：
//       [23, 79, 47, 55, 32, 11]

//  分析：用for循环遍历出所有数字，然后将元素下标重新排序

//  步骤：
var arr = [11, 32,55, 47,79,23]
var arrnew = [11, 32,55, 47,79,23]
for (var i=0; i<arr.length; i++)
{
    var j = arr.length-1-i
    arr[j] = arrnew[i]
}
console.log(arr);
