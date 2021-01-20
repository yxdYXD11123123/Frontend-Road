// 17.写一个函数，实现无论用户传入几个数字，都可以求和

function getSum() 
{
    var sum = 0;
    // 循环遍历arguments对象
    for (var i=0; i<arguments.length; i++)
    {
        sum += arguments[i]
    }    
    return sum;
}

console.log(getSum(1,2,3));
