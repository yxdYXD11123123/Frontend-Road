// 15.写一个函数，求任意两个数 之间所有数的和

function getSum(num1,num2) 
{
    var sum = 0;
    if (num1<num2){
        for (var i=num1; i<=num2; i++)
        {
            sum += i; 
        }
    }
    else 
    {
        for (var i=num2; i<=num1; i++)
        {
            sum += i; 
        }
    }    
    return sum;
}
console.log(getSum(100,200));
