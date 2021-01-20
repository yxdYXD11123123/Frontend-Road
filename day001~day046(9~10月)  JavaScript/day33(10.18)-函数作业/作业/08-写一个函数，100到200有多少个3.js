//8. 写一个函数,  100到200有多少3 ，解释：例如101中没有3；103中有一个3；133中有两个3。你要做的是统计出到200之间的整数一共有多少个3。

// 分析：先定义一个函数，在函数中声明一个计数器，用for循环100-200之间的数，个位数十位数出现一次3，则给计数器加1

function howMany3()
{
    // 计数器
    var count = 0;
    // 在循环内找出3出现的顺序
    for(var i=100; i<=200; i++)
    {
        var gewei = i%10
        var shiwei = parseInt(i%100/10)
        if (gewei == 3)
        {
            count++
        }
        if (shiwei == 3)
        {
            count++
        }
    }
    // 返回 计数器的值
    return count;
}
console.log(`100-200之间有${howMany3()}个3`);

