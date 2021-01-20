// 打印菱形

for (var i=1; i<=4; i++)
{
    var xia = ''
    for (var x=i ; x<=3; x++)
    {
        xia = xia + '-'
    }
    // console.log(xia);
    var star = '*'
    for (var s=1; s<=i-1; s++)
    {
        star = star +'**'
    }
    console.log(xia+star);
}
for (var j=1; j<=3; j++)
{
    var xia1 = ''
    for (var x1=1;x1<=j;x1++)
    {
        xia1 = xia1 +'-'
    }
    var star1 = '*'
    for (var s1=j; s1<=2; s1++)
    {
        star1=star1+'**'
    }
    console.log(xia1+star1);
    
}