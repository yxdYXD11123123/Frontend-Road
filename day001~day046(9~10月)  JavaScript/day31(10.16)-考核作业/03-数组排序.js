// 3.按照从大到小的顺序排列 ，var arr= [10, 5, 34, 59, 98],最后打印排序后的数组。

// 分析：
// 第一种方法：可以用冒泡排序法
var arr= [10, 5, 34, 59, 98]
// 冒泡要比较4轮，并且i需要从0开始
for (var i=0; i<arr.length-1; i++)
{
    // 每轮要比较 0~arr.length-1-i次
    for (var j=0; j<arr.length-1-i; j++)
    {
        // 判断相邻的两个元素，上一个元素是否小于下一个元素，如果小于，
        if (arr[j]<arr[j+1])
        {
            // 用临时变量的方法互换位置
            var temp = arr[j]
            arr[j] = arr[j+1]
            arr[j+1] = temp
        }
    }
}
console.log(arr);
