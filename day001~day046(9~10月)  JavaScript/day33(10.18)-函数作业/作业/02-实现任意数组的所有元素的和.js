// 2. 写一个函数，求任意数组的所有元素的和

// 分析：先定义一个函数，函数名为getSum,声明形式参数为数组，然后在函数中使用for循环求出数组所有元素的和，return和的值，然后调用函数给一个任意数组求和输出

// 步骤：
// 先定义一个函数，函数名为getSum,声明形式参数为数组
function getSum (arr)
{
    // 声明一个变量作为元素和
    var sum = 0;
    // 循环遍历每个元素
    for (var i=0; i<arr.length; i++)
    {
        sum += arr[i];
    }
    // 返回 元素总和
    return sum;
}
// 声明一个任意数组
var arr = [1,2,3,4]
// 调用函数，并输出
console.log(getSum(arr));
