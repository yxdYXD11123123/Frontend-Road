// 5.编写一个add函数，实现如下效果:
//  // console.log(add(1, 2)); // 3
// // console.log(add(1)(2)); // 3 

// 分析：

// 步骤：

function add ()
{
    var sum = 0
    for (var i=0; i<arguments.length; i++)
    {
        sum += arguments[i]
    }
    sum = sum + add1
    function add1(sum)
    {
        var sum1 = 0 
        for (var j=0; j<arguments.length; j++)
        {
            sum1 += arguments[j]
        }
        sum1 = sum + sum1
        return sum1
    }
    
    return sum;
}

console.log(add(1)(2));





