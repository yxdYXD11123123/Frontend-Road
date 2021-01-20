// 26.  将下面的数组元素前后互换
//          [11, 32，55, 47，79，23]	
//           置换后的数组元素为：
//           [23, 79, 47, 55, 32, 11]

// 步骤：
var arr = [11, 32,55, 47,79,23]
// 循环前半部分数组，将前半部分元素与后半部分元素对应位置依次互换
for (var i=0; i<arr.length/2; i++)
{
    // 用临时变量转换
    var temp = arr[i]
    arr[i]= arr[arr.length-1-i]
    arr[arr.length-1-i] = temp
}
console.log(arr);


// 方法二：
// 步骤：
var arr = [11, 32,55, 47,79,23]
// 用.reverse()反转数组
console.log(arr.reverse());
