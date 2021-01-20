// 1.用函数实现任意数组从小到大的排序，不允许使用sort 

// 分析：先定义一个函数，声明一个形式参数准备接收任意数组，在函数中使用冒泡排序，并且使return返回值为排序后的数组

// 步骤：
// 先声明一个函数，声明一个形式参数准备接收任意数组
function sort(arr)
{
    for (var i=0; i<arr.length-1; i++)
    {
        // 第一轮将数组中元素相邻两位依次对比交换，直到最后一位，
        // 第二轮将数组中元素相邻两位依次对比交换，直到倒数第二位。
        // 以此依次排出（冒泡出）排序好的数组
        for (var j=0; j<arr.length-1-i; j++)
        {
            if (arr[j]>arr[j+1])
            {
                var temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp
            }
        }
    }
    return arr
}

var arr1 = [14,2,31,4]
sort(arr1);
console.log(arr1);

