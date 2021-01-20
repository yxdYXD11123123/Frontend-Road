//  需求： 求数组[5,19,23,6,14,8]里面所有元素的和以及平均值

//  分析：用for循环遍历所有的数，加入一个总和里，再利用元素长度算出平均值
 
// 步骤：
var arr = [5,19,23,6,14,8]
var sum = 0
for (var i=0; i<arr.length; i++)
{
    sum += arr[i]
}
console.log(`和为${sum}，平均值为${sum/arr.length}`);
