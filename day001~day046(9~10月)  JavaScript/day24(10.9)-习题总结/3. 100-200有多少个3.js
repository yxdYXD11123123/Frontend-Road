// 需求: 你要做的是统计出100到200之间的整数一共有多少个3。 解释：例如101中没有3；103中有一个3；133中有两个3。

// 分析：首先要用循环 将100-200 之间的数都找出来，然后需要挑出 每个数 中的个位 或者 十位 为3 的 ，只要出现一个3，我们将给声明的计数器变量里+1 

// 步骤：
// 声明一个变量 a 作为 3的个数的计数器
var a = 0
// 动用一个循环找出100-200之间的所有数
for (var i=100; i<=200; i++)
{
    // 如果这个数的个位数为3，让 计数器a + 1
    if (i%10==3)
    {
        a += 1
    }
    // 如果这个数的十位数为3，让 计数器a + 1
    if (parseInt(i%100/10)==3)
    {
        a += 1
    }
}
// 输出计算结果
console.log(a);