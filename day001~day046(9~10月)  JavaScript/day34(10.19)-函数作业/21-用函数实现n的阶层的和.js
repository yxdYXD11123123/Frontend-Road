// 21.写一个函数，实现n的阶层的和求1+2!+3!+...+n!的和

function getJieSum(n) 
{
    var sum = 0;
    var jie = 1;
    for (var i=1; i<=n; i++)
    {
        jie = jie * i
        sum += jie 
    }    
    return sum;
}

console.log(getJieSum(3));
