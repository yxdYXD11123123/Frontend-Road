// 需求：九九乘法表

for (var i=1; i<=9; i++)
{
    var str = ''
    for (var j=1; j<=i; j++)
    {
        str = str + j+'x'+i+'='+i*j + ' '
    }
    console.log(str);
}