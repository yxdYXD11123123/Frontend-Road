//  需求： 9.定义一个整数数组，包含元素[1,3,4,7,8]，获取数组中数组角标和对应的元素都为偶数的元素与个数，并在控制台打印输出。

//  分析：用for循环遍历出所有元素，然后找出数组角标和对应元素都为偶数的元素，并统计个数。最后输出

// 步骤:
// 声明一个变量最为计数器
var time = 0
var arr = [1,3,4,7,8]
// for循环遍历出所有元素
for (var i=0; i<arr.length; i++)
{
    // 找出元素角标和对应元素都为偶数的元素，
    if (i%2==0 && arr[i]%2==0)
    {
        // 计数器加一
        time++
    }
}
// 输出次数
console.log(time);
