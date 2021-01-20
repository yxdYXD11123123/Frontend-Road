//  7. 已有数组var nums = [5,10,15],要求创建一个新数组
//     1.新数组的长度和已知数组相同
//     2.新数组每个元素的值，是已知对应位置元素的2倍
//     3.在控制台中打印新数组的所有元素

//  分析：
//  步骤：
var nums = [5,10,15]
// 定义一个新的数组，长度为3
var numsnew = new Array(3)
// 动用一个循环，遍历出旧数组的数
for (var i=0; i<nums.length; i++)
{
    // 将旧数组的每个元素*2 赋给新数组 对应位置
    numsnew[i] = nums[i]*2
}
// 输出numsnew
console.log(numsnew);
