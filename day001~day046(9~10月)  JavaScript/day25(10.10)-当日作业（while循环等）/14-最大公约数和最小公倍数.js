//  14. 求任意2个正数的最大公约数和最小公倍数。
var a = 6
var b = 16
var yue = 0
if (a>b)
{
    //最大公约数
    for (var i=1; i<=b; i++)
    {
        if (b%i==0 && a%i==0)
        {
            yue = i
        }
    }
    console.log(yue);

    // 最小公倍数
    var bei = a
    while (bei>=a) {
        if (bei%a==0 && bei%b==0)
        {
            console.log(bei);
            break
        }
        bei++
    }
}
else
{
    //最大公约数
    for (var i=1; i<=a; i++)
    {
        if (b%i==0 && a%i==0)
        {
            yue = i
        }
    }
    console.log(yue);

    // 最小公倍数
    var bei = b
    while (bei>=b) {
        if (bei%a==0 && bei%b==0)
        {
            console.log(bei);
            break
        }
        bei++
    }
}