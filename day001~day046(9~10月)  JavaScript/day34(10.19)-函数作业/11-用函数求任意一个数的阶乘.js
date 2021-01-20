// 11.写一个函数，求任意一个数的阶乘

// 分析：先定义一个函数，声明形式参数为num，在函数内使用for循环求出这个数的阶乘，然后返回阶乘值

// 步骤：
function getJie(num) 
{
    var jie = 1;
    for (var i=1; i<=num; i++)
    {
        jie = jie * i
    }     
    return jie;
}
console.log(getJie(4));
