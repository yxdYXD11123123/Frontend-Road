// 需求: 数组[10, 5, 34, 59, 98], 使用for循环找出里面的最大值? 使用while循环找出里面的最小值?

// 分析：分别用while 和 for 循环找出最大值，最小值，先准备两个变量保存最大值和最小值，然后在循环里判断出最大值，最后输出

// 步骤：
var arr = [10, 5, 34, 59, 98]
// 准备两个变量保存最大最小值
var max = arr[0]
var min = arr[0]
// 用for循环出最大值
for (var i=0; i<arr.length; i++)
{
    if (max<arr[i])
    {
        max = arr[i]
    }
}
// 用while循环出最小值
var a = 0
while(a<arr.length)
{
    if (min>arr[a])
    {
        min = arr[a]
    }
    // 步进表达式
    a++
}
console.log(`最大值为${max}，最小值为${min}`);
