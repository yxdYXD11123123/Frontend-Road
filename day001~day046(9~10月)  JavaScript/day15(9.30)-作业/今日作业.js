// 1. 1-100之间所有数的总和与平均值
var sum = 0
for (var i=1;i<=100;i++)
{
    sum = sum + i
}
var average = sum/100 
console.log(`总和为${sum},平均值为${average}`);


// 2. 1-100之间所有偶数的和
var sum1 = 0
for (var i=1;i<=100;i++)
{
    if (i%2==0)
    {
        sum1 = sum1 + i
    }
}
console.log(sum1);


// 3. 100以内7的倍数的总和
var sum2 = 0
for (var i=1;i<=100;i++)
{
    if (i%7==0)
    {
        sum2 = sum2 + i
    }
}
console.log(sum2);


// 4. 九九乘法表
for (var one =1; one<=9;one++)
{
    for (var two = 1; two<=one; two++)
    {
        var three = one * two 
        console.log(`${one}*${two}=${three}`);
    }
}


// 5. 用户输入一个数字，列出所有它能够整除的数字
var shu = 12
for (var i=1;i<=shu;i++)
{
    if (shu%i==0)
    {
        console.log(i);
    }
}


// 6. 求：1+2+3+...+100的和
var sum3 = 0
for (var i=1;i<=100;i++)
{
    sum3 = sum3 + i
}
console.log(sum3);


// 7. 要求在1~1000数字之中，找出所有能被5整除，或者被6整除的数字，在控制台输出
for (var i=1;i<=1000;i++)
{
    if (i%5==0||i%6==0)
    {
        console.log(i);
    }
}


// 8. 打印一个5行4列的矩形
for ( var i=1;i<=5;i++)
{
    console.log('****');
}


// 9. 
var zong = ''
for (var hang3=5;hang3>=1;hang3--)
{
    
    var kongge = ''
    for (var kong=1;kong<=hang3;kong++ )
    {
        kongge=kongge + ' '
    }
    zong =kongge
    var stars = ''
    for (var star=1;star<=(6-hang3);star++)
    {
        stars=stars+' '+"*"
    }
    zong=zong +stars
    console.log(zong);
   
}


// 11. 
for (var hang =5;hang>=1;hang--)
{
    var hangshu = ''
    for (var shu=1;shu<=hang;shu++)
    {
        hangshu = hangshu + `${hang}`
    }
    console.log(hangshu);
    
}
for (var hang2=2;hang2<=5;hang2++)
{
    var hangshu2 = ''
    for (var shu=1;shu<=hang2;shu++)
    {
        hangshu2 = hangshu2 + `${hang2}`
    }
    console.log(hangshu2);
}


// 12. 
// 正三角
console.log('*');

var xing = '*'
for (var i=1; i<=4; i++)
{
    xing = xing +'**'
    console.log(xing);
}

//倒三角
for (var xing = 4;xing>=1;xing--)
{
    var star = '*'//star 必须放到循环中，起到星数归零的作用
    for (var i=1; i<=xing; i++)
    {
        star = star +'**'  
    }
    console.log(star);
}
console.log('*');
