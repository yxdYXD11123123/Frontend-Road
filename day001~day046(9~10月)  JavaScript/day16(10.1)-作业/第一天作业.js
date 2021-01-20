//  1. 定义若干个js变量，需表现出js中的各种数据类型，
//     并在页面中输出每个变量的值和其对应类型。
var a = 1
var b = 'b'
var c = true
var d = null
var e 
var f = {
    name:'dong'
}
var g = [1,2]
console.log(a,typeof a);
console.log(b,typeof b);
console.log(c,typeof c);
console.log(d,typeof d);
console.log(e,typeof e);
console.log(f,typeof f);
console.log(g,typeof g);


//  2. 用户输入一个数字，列出所有它能够整除的数字。
//     比如用户输入48，那么控制台中将显示：
//     比如，用户输入19，那么控制台显示
var num = 14
for (var i=1;i<=num;i++)
{
    if (num%i==0)
    {
        console.log(i);
    }
}


//  3. 读程序，写结果：
// var v1 = 'abc'
// var v2 = v1
// var v2 = '123' + v2
// alert.log(v2); //  123abc
// alert.log(v1); //  abc

// var a = {
//     name:'张三',
//     age:22
// }
// var b = a 
// console.log(b.age); //  22
// b.age = 23
// console.log(a.age); //  23


//  4. 已知任意两个正整数（a，b），将其作为直角三角形的直角边长，求斜边长
var a = 12
var b = 14
var xie = Math.sqrt(a*a+b*b)
console.log(xie);


//  5. 一个小球从空中掉下来，求如下问题：
//     如果已知小球掉落时高度（1000m），求其触地瞬间的速度；
//     如果已知小球落地瞬间的速度（1000m/s），求其掉落时的高度）
//     附自由落体公式：自由落体运动的规律：2gh=v^2。；
//    （其中g是重力加速度，在地球上g≈9.8m/s2；v是速度，h高度)
var g = 9.8
var h = 1000
var v = Math.sqrt(2*g*h)
console.log(`触地瞬间速度为${v}m/s`);

var v1 = 1000
var h1 = (v1*v1)/(2*g)
console.log(`掉落时高度为${parseInt(h1)}m`);


//  6. 写一个程序打印1到100这些数字。但是遇到数字为3的倍数的时候，
//     打印“Fizz”替代数字，5的倍数用“Buzz”代替，既是3的倍数
//     又是5的倍数打印“abcde”。
for (i=0;i<=100;i++)
{
    if (i%3==0 && i%5==0)
    {
        console.log('abcde');
    }
    else if (i%3==0)
    {
        console.log('Fizz');
    }
    else if (i%5==0)
    {
        console.log('Buzz');
    }
    else
    {
        console.log(i);
    }
}



//  7.求两个正数的最大公约数
var zheng1 = 12
var zheng2 = 24
if (zheng1>zheng2)
{
    var da = 0
    for (var i=1;i<=zheng2;i++)
    {
        
        if (zheng2%i==0 && zheng1%i==0)
        {
           da=i
        }
    }
    console.log(da); 
}
else
{
    var da = 0
    for (var i=1;i<=zheng1;i++)
    {
        
        if (zheng2%i==0 && zheng1%i==0)
        {
           da=i
        }
    }
    console.log(`最大公约数为${da}`); 
}


//  8.求两个正数的最小公倍数
var zheng3= 14
var zheng4= 12
if (zheng3>zheng4)
{
    for (i=zheng3;i<=zheng3*zheng4;i++)
    {
        if (i%zheng3==0&&i%zheng4==0)
        {
           console.log(`最小公倍数为${i}`);
           i=zheng3*zheng4+1 //让i只输出一次即可
        }
    }
}



// 9.水果店LED屏幕
var liulian = {
    name : '榴莲',
    Id : 1,
    price : 32.0,
    quality : 'A' 
}
var apple = {
    name : '苹果',
    Id : 2,
    price : 6.5,
    quality : 'B'
}
var mihoutao = {
    name : '猕猴桃',
    Id : 3,
    price : 6.0,
    quality : 'A'
}
console.log('编号','名称','单价','品质');

console.log(liulian.Id,liulian.name,liulian.price,liulian.quality);
console.log(apple.Id,apple.name,apple.price,apple.quality);
console.log(mihoutao.Id,mihoutao.name,mihoutao.price,mihoutao.quality);


// 10、超市购物小票
var a = {
    name : '少林寺酥饼核桃',
    price : 15.5,
    id : 090115,
    amount : 22,
    xiang : 1
}
var b = {
    name : '然光O移',
    price : 16,
    id : 090028,
    amount : 55,
    xiang : 1
}
var c = {
    name : '尚康杂粮牡丹饼',
    price : 14.5,
    id : 090027,
    amount : 24,
    xiang : 1
}
console.log(`${a.name}(${a.id})${a.price}*${a.amount}=${a.price*a.amount}`);
console.log(`${b.name}(${b.id})${b.price}*${b.amount}=${b.price*b.amount}`);
console.log(`${c.name}(${c.id})${c.price}*${c.amount}=${c.price*c.amount}`);
console.log(`${a.xiang+b.xiang+c.xiang}项商品  共计：${a.amount+b.amount+c.amount}件
共计：${a.amount*a.price+b.amount*b.price+c.amount*c.price}
`);



// 二、简答题

// 1. 数据类型有几种,分别是哪些
// 7种：数字，布尔，字符串，null，undefined，对象 （数组）

// 2. 怎么判断一个变量的数据类型
// 用console.log(typeof 变量名)查看数据类型

// 3. 怎么判断一个变量是否是数字
//用isNaN（）判断，如果是数字返回false，如果不是数字返回true

// 4. 怎么将其他数据类型转换成数字类型
// Number (变量名) 或者 +（变量名）或者 parseInt（变量名）

