// 6、输出从2000年（含）到3000年（含）间的所有闰年（闰年是能被4整除且不能被100整除或者是能被400整除）

// 步骤：
for (var i=2000; i<=3000; i++)
{
    if (i%4==0 && i%100!=0 || i%400==0)
    {
        console.log(i);
    }
}