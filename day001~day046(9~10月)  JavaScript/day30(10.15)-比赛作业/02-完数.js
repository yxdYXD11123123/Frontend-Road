// 2、一个数如果恰好等于它的因子之和，这个数就称为"完数 "。 例如6=1＋2＋3.编程 找出100以内的所有完数。

for (var i=1; i<=100; i++)
{
    var sum =0
    for (var j=1; j<i; j++)
    {
        if (i%j==0)
        {
            sum = sum + j
        }
    }
    if (sum==i)
    {
        console.log(i);
    }
}