// 2.数组[10, 5, 34, 59, 98], 使用for循环找出里面的最大值? 使用while循环找出里面的最小值?

// 分析：使用for循环遍历所有元素，准备一个变量存储最大值，然后在循环里面依次比较大小，找出最大值；使用while循环找最小值时，先声明一个变量值为0的变量作为循环的初始值，元素索引的第一个值，然后再循环中判断出最小值

// 步骤：
var arr = [10,5,34,59,98]
// 用for循环找出最大值
var max = arr[0]
for (var i=0; i<arr.length; i++)
{
    if (max<arr[i])
    {
        max = arr[i]
    }
}
console.log(`最大值为${max}`);

// 用while循环找出最小值
var min = arr[0]
// 声明一个变量，作为索引初始值
var i = 0
while(i<arr.length)
{
    if (min>arr[i])
    {
        min = arr[i]
    }
    // 步进表达式！！！
    i++
}
console.log(`最小值为${min}`);


