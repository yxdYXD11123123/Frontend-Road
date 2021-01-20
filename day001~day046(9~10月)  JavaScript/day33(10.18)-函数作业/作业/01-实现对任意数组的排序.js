// 1. 写一个函数，实现对任意数组的排序

// 分析： 先定义一个函数，然后在函数中使用冒泡排序，return排序后的数组，然后输出

// 步骤：
// 定义一个函数，并添加一个形式参数（数组）
function paiXu(arr)
{
    // 使用冒泡从大到小排序
    for (var i=0; i<arr.length-1; i++)
    {
        for (var j=0; j<arr.length-1-i; j++)
        {
            if (arr[j]<arr[j+1])
            {
                var temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
            }
        }
    }
    // 返回 排序后的数组
    return arr
}
// 声明一个任意数组
var arr1 = [1,32,5,33,6,22,31,4]
// 输出 调用函数paiXu,将数组加入实际参数排序
console.log(paiXu(arr1));

