// 21.	录入月份，输出对应的季节
//     (1)键盘录入一个整数(代表月份,范围1-12)
//     (2)输出该月份对应的季节
//    	   3,4,5春季
//    	   6,7,8夏季
//    	   9,10,11秋季
//    	   12,1,2冬季
//     (3)演示格式如下:
//    	   请输入一个月份:3
//    	   控制台输出:3月份是春季"
var month = 3
if (month==3 || month==4 || month==5)
{
    console.log(`${month}月份是春季`);
}
else if (month==6 || month==7 || month==8)
{
    console.log(`${month}月份是夏季`);
}
else if (month==9 || month==10 || month==11)
{
    console.log(`${month}月份是秋季`);
}
else if (month==12 || month==1 || month==2)
{
    console.log(`${month}月份是冬季`);
}


//   22. 录入一个5位数,判断 该五位数是否为回文数。（判断第一位
//       和第五位是否一样，第二位和第四位是否一样）
var five = 54645
var gewei = five%10
var shiwei = parseInt(five%100/10)
var baiwei = parseInt(five%1000/100)
var qianwei = parseInt (five%10000/1000)
var wanwei = parseInt (five/10000)
// console.log(gewei,shiwei,baiwei,qianwei,wanwei);
if (gewei==wanwei && shiwei==qianwei)
{
    console.log(`${five}是回文数`);
}
else
{
    console.log(`${five}不是回文数`);
}


//   23. 利用JavaScript完成如下功能：如果今天是星期六，那么1000天后是星期几
var many = 1000
var day = 6
var which =(many%7+day)%7
if (which==1){
    which='一'
}
else if (which==2)
{
    which='二'
}
else if (which==3)
{
    which='三'
}
else if (which==4)
{
    which='四'
}
else if (which==5)
{
    which='五'
}
else if (which==6)
{
    which='六'
}
else if (which==7)
{
    which='七'
}
console.log(`${many}天后是星期${which}`);


//   24. 一个加油站为了鼓励车主多加油，所以加的多有优惠。
//       92号汽油，每升6元；如果大于20升，那么超出部分每升5.9；
//       95号汽油，每升7元；如果大于30升，那么超出部分每升6.95
//       编写JS程序，用户输入自己的汽油编号，然后输入自己加多少升，弹出价格。
var oil = 95
var L = 31
if (oil==92 )
{
    if (L>20)
    {
        console.log(6*20+(L-20)*5.9);
    }
    else 
    {
        console.log(6*L);
    }
}
else if (oil==95)
{
    if (L>30)
    {
        console.log(7*30+(L-30)*6.95);
    }
    else 
    {
        console.log(L*7);
    }
}


//  25. 先接收用户输入的用户名，判断该用户名是否是admin,
//      如果不是直接程序终止，如果是那么再次提示让用户输入密码,
//      如果密码是88888,那么提示登录成功，否则提示登录失败
var name = 'admin'
var secret = 88888
if (name =='admin')
{
    console.log('请输入密码');
    if (secret==88888)
    {
        console.log('登录成功');
    }
    else
    {
        console.log('登录失败');
    }
}


//   26. 100以内7的倍数的总和
var sum = 0
for (var i=0;i<100;i++)
{
    if(i%7==0)
    {
        sum = sum + i
    }
}
console.log(sum);  // 735


//   27.求1!+2!+3!+...+10!的和
var x = 1
var sum = 0 
for (var i=1; i<=10; i++)
{
    x = x*i
    //   1！=1
    //   2！=1*2 =2 = 1！*2
    //   3！=1*2*3 =6 = 2！*3
    //   4！=1*2*3*4 =32 = 3！*4
    sum = sum + x
}
console.log(sum); // 4037913


//  28.鸡兔同笼：鸡和兔子一共35只，笼子里一共有94只脚，
//     用程序计算出鸡和兔子分别多少只
var foot = 94
var head = 35
//chicken*2 + rabbit*4 = foot 
//chicken + rabbit = head 
//chicken*2 + (head-chicken)*4 = foot
//(head-rabbit)*2 + rabbit*4 = foot
var chicken = (4*head - foot)/2
var rabbit = (foot-2*head)/2
// if (chicken+rabbit==head && chicken*2+rabbit*4==foot)
// {
//     console.log(chicken,rabbit);
// }
console.log(chicken,rabbit); // 23,12


//  29.一个数如果恰好等于它的因子之和，这个数就称为 "完数 "。 
//     例如6=1＋2＋3.编程 找出1000以内的所有完数。

// wan = i+i+i+...+i
// if (shu%i==0)
for (var x=1;x<1000;x++)
{
    var sum = 0
    for (var yin=1;yin<x;yin++)
    {
    if(x%yin==0)
    {
        sum=yin+sum
    }
    }  
    if (sum==x)
    {
    console.log(x);
    }
}//6,28,496是完数


//  30.输出2-200之间的所有素数（素数就是只能被1和其本身整除的数）

for (var su =2 ; su<=200; su++)
{
    //13*13=169,17*17=289>200,所以只取值到13
    if (su%2!=0 && su%3!=0 && su%5!=0 && su%7!=0 &&su%11!=0 &&su%13!=0 || su==2 || su==3 || su==5 || su==7 || su==11 || su==13)
    {
        console.log(su);
        
    }
}


//  31.解释：例如101中没有3；103中有一个3；
//     133中有两个3。你要做的是统计出101到200之
//     间的整数一共有多少个3。

var n = 0
for (var Nums=101;Nums<200;Nums++)
{
    var gewei = Nums%10
    var shiwei = parseInt(Nums%100/10)
    
    if (gewei==3&&shiwei==3)
    {
        n=n+2
    }
    else if (shiwei==3)
    {
        n=n+1
    }
    else if(gewei==3)
    {
        n=n+1
    }
}
console.log(n);//20


// 32.某同学参加计算机大赛：
//  如果获得第1名，将参加清华大学组织的1个月夏令营；
//  如果或得第2名，将奖励联想笔记本电脑一部；
//  如果获得第3名，将奖励移动硬盘一个；
//  否则没有任何奖励；
var Ranking = 3
if (Ranking==1)
{
    console.log('参加清华大学组织的1个月夏令营');
}
else if (Ranking==2)
{
    console.log('奖励联想笔记本电脑一部');
}
else if (Ranking==3)
{
    console.log('奖励移动硬盘一个');
}
else 
{
    console.log('没有奖励');
}


//  33.利用JavaScript完成如下功能：要求在1~1000数字之中，
//     找出所有能被5整除，或者被6整除的数字，并在控制台输出这些数字


for (i=1;i<=100;i++)
{
    if(i%5==0)
    {
        console.log(i);
        
    }
    else if (i%6==0)
    {
        console.log(i);
    }
} 


//   34.求任意一个数字的约数有哪些
var Y = 22
for (yue=1;yue<=Y;yue++)
{
    if(Y%yue==0)
    {
        console.log(yue);
    }
}


//  35.1-100之间所有数的总和 与 平均值
var sum = 0
for (i=0;i<=100;i++)
{
    sum = sum + i
}
console.log(sum); //5050
console.log(sum/100);//50.5


// 36.求1~100以内(包含1和100)能同时被3，5整除的数的和，并将求出的和
//    打印到控制台上.
var sum1 = 0
for (var i=1;i<=100;i++)
{
    if (i%3==0 && i%5==0)
    {
        sum1 = sum1 + i
    }
}
console.log(sum1);//315


//  37.要求：圆的面积小于50，请打印出所有符合面积要求的整数半径。
for (var r=1;r<100;r++)
{
    if(r*r*3.14<50)
    {
        console.log(r);
        
    }
}//1,2,3


//   38.遍历1到100之间（包含1和100）的所有数字，统计能被5整除的偶数
//      的个数，最后将个数打印在控制台
var ge = 0
for (var i=1;i<=100;i++)
{
    if (i%5==0 && i%2==0) 
    {
        ge = ge + 1
    }
}
console.log(ge);//10
