//  1. 打印九九乘法表
//     分析：声明一个变量 作为每行的内容
//          需要两个for 循环 , 每个循环的变量
//          

for (var i=1; i<=9; i++)
{
    var hang = ''
    for (var j=1; j<=i; j++)
    {
        hang += j +'x' + i +"=" + i*j + ' '
    }
    console.log(hang);
}
for (var a=8; a>=1; a--)
{
    var hang1 = ''
    for (var b=1; b<=a; b++)
    {
        hang1 += b +'x' + a +"=" + a*b + ' '
    }
    console.log(hang1);
}


//  2. 打印闪电

//     分析：这个闪电应该是由 两个三角形加一个横线 拼接而成

// 第一步：第一个小三角形
for (var i=1; i<=3; i++)
{
    var hang = ''
    for (var j=1; j<=i; j++)
    {
        hang = hang + '*'
    }
    console.log(hang);
}
// 第二步： 横线
console.log('*******');
// 第三步: 第二个小三角形
for (var a=3; a>=1; a--)
{
    var hang1 = '   '
    for (var b=1; b<=a; b++)
    {
        hang1 = hang1 + '*'
    }
    console.log(hang1);
}


//  3. 打印如下图形
//     *********
//    *******
//   *****
//  ***
// *
for (var i=5; i>=1; i--)
{
    var kong = ''
    for (var j=1; j<=i; j++)
    {
        kong = kong + ' ' 
    }
    var star = '*'
    for (var j1=1; j1<=i-1; j1++)
    {
        star = star + '**'
    }
    console.log(kong+star);   
}


//  4. 打印金字塔
//     分析: 分成上下部分，分开完成
for (var i=1; i<=3; i++)
{
    var xia = ''
    for (var j=i; j<=3; j++)
    {
        xia = xia + '-'
    }
    var star = '*'
    for (var s=1; s<=i-1; s++)
    {
        star = star + '**'
    }
    console.log(xia+star);
}
for (var a=1; a<=4; a++)
{
    var xia2 = ''
    for (var b=1; b<=a-1; b++)
    {
        xia2 = xia2 + "-"
    }
    var star2 = '*'
    for (var c=a+1; c<=4; c++)
    {
        star2 = star2 + '**'
    }
    console.log(xia2+star2);
}


//  5. 5文钱可以买一只公鸡，3文钱可以买一只母鸡，
//     1文钱可以买3只雏鸡。现在用100文钱买100只鸡，
//     那么各有公鸡、母鸡、雏鸡多少只？
for (var gj=0; gj<=100; gj++)
{
    for (var cj=0; cj<=100-gj; cj++)
    {
        var mj = 100-gj-cj
        if (mj*3+gj*5+1/3*cj==100)
        {
            console.log(`有公鸡${gj}只，母鸡${mj}只，雏鸡${cj}只`);
        }
    }
}


//  6. 有一个棋盘，有64个方格，在第一个方格里面放1粒芝麻
//     重量是0.00001kg，第二个里面放2粒，第三个里面放4，
//     求棋盘上放的所有芝麻的重量  

for (var i=1; i<=64; i++)
{
    var li = 1
    for (var a=1; a<=i-1; a++)
    {
        li = li*2
    }
}
console.log(li*0.00001);  //92233720368547.77


//  7. 大马驮2石粮食，中马驮1石粮食，两头小马驮一石粮食，
//     要用100匹马，驮100石粮食，该如何调配？
for (var dm=0; dm<=100; dm++)
{
    for (var zm=0; zm<=100-dm; zm++)
    {
        var xm = 100-dm-zm
        if (dm*2+zm*1 + 1/2*xm==100)
        {
            console.log(`用${dm}只大马，${zm}只中马，${xm}只小马`);
        }
    }
}


//  8. 有1、2、3、4个数字，能组成多少个互不相同且无重复数字的三位数？
//     有多少个，有哪些三位数？
var sum = 0
for (var one=1; one<=4; one++)
{
    for (var two=1; two<=4; two++)
    {
        for (var three=1; three<=4; three++)
        {
            if (one !=two && two!=three && three!=one)
            {
                console.log(one+''+two + three);
                sum = sum + 1
            }
        }
    }
}
console.log(`共有${sum}个这样的数`);


//  9. 输入某年，某月，某日，判断这一天是一年中的第几天？
var whichyear = 2019
var whichmonth = 3
var whichday = 3
var day = 0
//是闰年
if (whichyear%400==0 || whichyear%4==0 && whichyear%100!=0)
{
    var month = [0,31,29,31,30,31,30,31,31,30,31,30,31]
    for (var i=1; i<=whichmonth; i++)
    {
        day = day + month[i]
    }
    day = day + whichday
    console.log(`这一天是一年中的第${day}天`);
    
}
else //不是闰年
{
    var month1 = [0,31,28,31,30,31,30,31,31,30,31,30,31]
    for (var j=1; j<=whichmonth; j++)
    {
        day = day + month1[j]
    }
    day = day + whichday
    console.log(`这一天是一年中的第${day}天`);
}



