//  21. 用户输入“你是男人吗？”，回答如果是true，
//      那么输出“原来你是男人呀，呵呵”，  
//      如果回答是：false，那么输出“你的性别
//      难道是女?”。
console.log('你是男人吗？');
var a = false
if (a==true)
{
    console.log('原来你是男人呀，呵呵');
}
else if (a==false)
{
    console.log('你的性别难道是女？');
}


//   22. 输入两个整数，放入到a与b变量中去， 
//       如果a>=b就将a与b中的值进行交换，
//       否则就不交换
var a = 4
var b = 3
if(a>=b)
{
    var c = 0
    c = a
    a = b
    b = c
    console.log(a,b);
}
else 
{
    console.log(a,b);
}


//   23. 输入一个三位整数，判其是不是降序数如:
//       531是降序数 百位>十位>个位
var Jiang = 687
var gewei = Jiang%10
var shiwei = parseInt(Jiang%100/10)
var baiwei = parseInt(Jiang/100)
if (baiwei>shiwei && shiwei>gewei)
{
    console.log(`${Jiang}是降序数`);
}
else 
{
    console.log(`${Jiang}不是降序数`);
}


//   24. 用户输入”你爱我吗？”,如果回答的是”yes”,
//       则输出”你是爱我的”,如果回答的是”no”,
//       则输出”原来你不爱我”,如果回答的是其它，
//       则输出”你到底是爱还是不爱，自己也不清楚”
console.log('你爱我吗？');
var a = 'no'
if (a=='yes')
{
    console.log('你是爱我的');
}
else if (a=='no')
{
    console.log('原来你不爱我');
}
else 
{
    console.log('你到底是爱还是不爱，自己也不清楚');
}


//   25. 利用JavaScript编写程序：张三为他的手机设定了自动拨号
//       按 1：拨爸爸的号
//       按 2：拨妈妈的号
//       按 3：拨爷爷的号
//       按 4：拨奶奶的号
var num = 1
if (num==1)
{
    console.log('拨爸爸的号');
}
else if (num==2)
{
    console.log('拨妈妈的号');
}
else if (num==3)
{
    console.log('拨爷爷的号');
}
else if (num==4)
{
    console.log('拨奶奶的号');
}


//  26.利用JavaScript编写程序实现如下功能；
//     普通顾客购物满 100 元打 9 折；
//     会员购物打 8 折；会员购物满 200 打 7.5 折。
var VIP = false
var money = 200
var charge = 0
if (VIP==false && money>=100)
{
    charge = money*0.9
}
else if (VIP==true && money>=200)
{
    charge = money*0.75
}
else if (VIP==true && money>=100)
{
    charge = money*0.8
}
console.log(charge);


//   27. 利用JavaScript编写程序，根据用户
//       定义的运算符，如果是+号，则求出2个数的和；
//       如果是-号，则求出2个数的差；如果是*号，
//       则求出2个数的积;如果是/号，则求出2个数的商；
//       如果是%,求出2给数的余数；否则打印输入有误。
var a = 3
var b = 4
var sign = '*'
var end = 0
if (sign=='+')
{
    end = a + b
    console.log(end);
}
else if (sign=='-')
{
    end = a - b
    console.log(end);
}
else if (sign=='*')
{
    end = a * b 
    console.log(end);
}
else if (sign=='/')
{
    end = a / b
    console.log(end);
}
else if (sign=='%')
{
    end = a % b
    console.log(end);
}
else 
{
    console.log('打印输入有误');
}


//   28. 利用JavaScript编写程序，
//       定义一个变量num并且赋值,
//       1)如果 num 能同时被 3 和 5 整除，
//       返回字符串 fizzbuzz
//       2)如果 num 能被 3 整除，返回字符串 fizz
//       3)如果 num 能被 5 整除，返回字符串 buzz
//       4)如果num不是 Number 类型，返回 false
//       5)其余情况，返回参数 num
var num = 23
if (num%3==0 && num%5==0)
{
    console.log('fizzbuzz');
}
else if (num%3==0)
{
    console.log('fizz');
}
else if (num%5==0)
{
    console.log('buzz');
}
else if (typeof num != "number")
{
    console.log('false');
}
else 
{
    console.log(num);
}


// 29.有个人想知道，一年之内一对兔子能繁殖多少对？
//    于是就筑了一道围墙把一对兔子关在里面。
//    已知一对兔子每个月可以生一对小兔子，
//    而一对兔子从出生后第3个月起每月生一对小兔子。
//    假如一年内没有发生死亡现象，
//    那么，一对兔子一年内（12个月）能繁殖成多少对？ 
//   （不要看这些文字）这是著名的斐波那契数列
//    兔子的规律为数列，1，1，2，3，5，8，13，21    
//    斐波那契系数 前两个数的和等于后一个  (拔高题)
var shu1 = 1
var shu2 = 1
var x = 0    //定义这个变量作为一个容器，将上一个月的兔子对数数值保留下来，然后赋值给shu1,用于下次计算
for (var i=2;i<12;i++)//前两个月无法使用此规律，所以从第三个月开始
{
    x = shu2
    shu2 = shu2 + shu1
    shu1 = x
    // console.log(shu2);    //每个月兔子对数的变化
}
console.log(`第十二月能繁殖${shu2}对兔子`);




// 二、简答题
// 1. 什么情况下控制台会输出undefined
//    当我们定义了一个变量，但是没有赋值时，控制台会输出undefined


// 2. 字符串可以解析变量嘛？怎么解析
//    可以解析变量，需要用 `...`  来代替 “...”  然后使用 ${变量名}  来解析变量


// 3. Js中的‘+’有几层含义，分别是什么
//    2层，第一层：作为算术运算符, 让数字相加
//         第二层：作为字符串拼接符，起到字符串连接作用
  


// 4. console.log(1+’false’)和console.log(1+false)的值，并解释为什么
//    console.log(1+'false')       1false
//    'false'在这里被视为字符串，然后将数字1转为字符串'1'，用'+'拼接，所以输出1false

//    condole.log(1+false)         1   
//    false在这里被视为布尔值，与数字相加时，布尔值自动转为数字类型0，'+'作为算数运算符，所以两数相加，1+0等于1
