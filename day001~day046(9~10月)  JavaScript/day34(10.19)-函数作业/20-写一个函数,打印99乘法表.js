// 20.写一个函数，打印九九乘法表

function get99() 
{
    for (var i=1; i<=9; i++)
    {
        var str = ''
        for (var j=1; j<=i; j++)
        {
            str = str + j + 'x' + i + '='+i*j+' '
        }
        console.log(str);
    }    
}

get99();