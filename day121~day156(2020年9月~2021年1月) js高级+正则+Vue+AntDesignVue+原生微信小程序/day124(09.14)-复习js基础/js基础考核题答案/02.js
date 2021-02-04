/**
 * 已有数组var nums = [5,10,15],要求创建一个新数组
 *  1.新数组的长度和已知数组相同
 *  2.新数组每个元素的值，是已知对应位置元素的2倍
 *  3.在控制台中打印新数组的所有元素
 */

var nums = [5, 10, 15];

var arr = new Array(nums.length);
console.log(arr);

for (let i = 0; i < nums.length; i++) {
  arr[i] = nums[i] * 2;
}
console.log(arr);
