// 鸡兔同笼
for (var j=1; j<=35; j++)
{
    var t = 35-j
    if (j*2+t*4==94)
    {
        console.log(j,t);
    }
}

var ji= 2
var tu= 4
for (var i=0;i<35;i++)
{
    for (var j=0; j<35; j++)
    {
        if (i*ji+j*tu==94 && j+i==35)
        {
            console.log(j,i);
            
        }
    }
}



// 等腰三角形
for (var i=1; i<=5; i++)
{
    var kong = ''
    for (var k=i+1; k<=5; k++)
    {
        kong = kong + ' '
    }

    var star = ''
    for (var s=1; s<=i; s++)
    {
        star = star + ' *'
    }
    console.log(kong+star);
}


// 钝角三角形
for (var i=1; i<=5; i++)
{
    var kong = ''
    for (var k=i; k<=5; k++)
    {
        kong = kong +" "
    }
    // console.log(kong);
    var star = '*'
    for (var s=i+1; s<=5; s++)
    {
        star =star + '**'
    }
    console.log(kong+ star);
}


// 菱形
for (var i=1; i<=4; i++)
{
    var xia = ''
    for (var x=4; x>=i+1; x--)
    {
        xia = xia + '-'
    }
    // console.log(xia);
    
    var star = '*'
    for (var s=1; s<=i-1; s++)
    {
        star = star + '**'
    }
    console.log(xia + star );
}
for (var j=1; j<=3; j++)
{
    var xia1=''
    for (var x1=1; x1<=j; x1++)
    {
        xia1 = xia1 + '-'
    }
    var star1 = '*'
    for (var s1=j+1; s1<=3; s1++)
    {
        star1 = star1 +'**'
    }
    console.log(xia1+ star1);
}


// 斐波那契数列  1，1，2，3，5，8，13，21
// 分析： 
// 第一个月： 1
// 第二个月： 1
// 第三个月： 未知数（第一个月 + 第二个月）
// 要声明三个变量：
// 以后： 第三个月兔子的数量等于前两个月的兔子数加前一个月的兔子数

// 步骤：
// 1. 声明一个变量，代表第一个月兔子的对数
// 2. 声明一个变量，代表第二个月兔子的对数
// 3. 声明一个变量，代表第三个月兔子的对数
// 4. 循环： 计算兔子的数量
// 4.1 因为我已经知道了日历中的1月和2月的兔子数量， 必须先求出3月的兔子数量
// 4.2 进行值的传递：m1=m2
// 4.3 进行值的传递：m2=m3
// 4.4 打印m3
var m1 = 1
var m2 = 1
var m3 = 0
for (var i=2; i<12; i++)
{
    m3 = m1 + m2
    m1 = m2
    m2 = m3
    console.log(m3);
}


//  1-1/2+1/3-1/4...-1/100的和
var a = 1
var sum = 0
for (var i=1 ; i<=100; i++)
{
    sum = sum + a/i
    a = -a // 转换正负！！！
}
console.log(sum);


// 2+22+222+2222+22222的和
var sum = 0
var a = 2
for (var i=1; i<=5; i++)
{
    sum = a+sum
    a =  a*10 + 2
    console.log(sum);
}


// 1+1/2!+1/3!+ ... 1/20!的和
var sum = 0
var one = 1
var jie = 1
for (var i=1; i<=20; i++)
{
    jie = jie *i
    sum += one/jie 
}
console.log(sum);


