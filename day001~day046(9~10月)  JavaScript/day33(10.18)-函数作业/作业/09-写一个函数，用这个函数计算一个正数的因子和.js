// 9. 写一个函数，该函数用于计算一个正数的因子和（比如6的因子和是1+2+3+4+6=16）

// 分析：定义一个函数，形式参数为num, 在函数内用准备一个变量sum作为和， 然后用循环找出该数的因子，并将其加入和中，然后return因子和

// 步骤：
function yinSum(num) 
{
    var sum = 0;
    for (var i=1; i<num; i++)
    {
        if (num%i==0)
        {
            sum += i;
        }
    }    
    return sum
}
console.log("12的因子和为"+yinSum(12));
