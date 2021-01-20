//  41. 入职薪水10K，每年涨幅5%，输出50年后工资多少
var start = 10000
for (var i=0; i<50; i++)
{
    start = start + start*5/100
}
console.log(`50年后工资为${start}`);


//  42. 求出1-1/2+1/3-1/4…..-1/100的和（拔高题）
var one = 1   // 设one为分子1
var fen = 0
var sum = 0
for (var mu=1; mu<=100; mu++) //设mu为分母数
{
    fen = one/mu
    if (mu%2==0) //根据上诉规律，当分母为偶数时，要被减去，所以从这里开始，先判断完奇偶数，然后被加入或者被减入sum总值
    {
        sum = sum - fen
    }
    else if (mu%2!=0)
    {
        sum = sum + fen
    }
}
console.log(sum);


//  43. 用for循环求2+22+222+2222+22222的和
var tt = 0
var sum = 0
for (var i=0; i<5; i++)
{
    tt = tt*10 + 2
    sum = sum + tt
}
console.log(sum);


//   44. 定义一个人的对象，有name,age,gender,height等属性，
//       要求：
//       1) 获取name的值
//       2)	通过2种方式给对象添加一个新的属性weight,值自己写
//       3)	删除属性名height
var person = {
    name : 'dong',
    age : 22,
    gender : '男',
    height : 165
}
//获取name值
console.log(person.name);
//给对象添加一个新的属性weight
// 方法一: person.weight = 50  
// 方法二：
var tiZhong = 'weight'
person[tiZhong] = 50
//删除属性名height
delete person.height
console.log(person);


//  45. 定义一个数组，取出下标是3的值，计算下表是2和下表是4对应的
//      元素的和，并且赋值给一个变量，在控制台输出
var a = [1,2,3,4,5,6]
console.log(a[3]);
var b = a[2] + a[4]
console.log(b);


//  46. 定义一个二维数组，var arr = [1,2,’3’,true,[22,33,55,66]],
//      将55输出在控制台上
var arr = [1,2,3,true,[22,33,55,66]]
console.log(arr[4][2]);


//  47. 猴子偷桃  第一天吃一半+1个，第二天吃剩下的一半+1个，
//      以后都吃剩下的一半+1个 到第10天只剩一个了 问第一天摘了多少桃子？
var day = 1  //day 设为每天桃子的数量
for (var i=1; i<10; i++) // day初始值为第10天，所以循环9次即可到第一天
{
    day = (day + 1)*2    // 根据题意，每个第二天剩下的桃子数加一个桃子 再乘2倍，即为上一天剩下的桃子数
}
console.log(`第一天摘了${day}个桃子`);


//  48. 控制台输出：计算 1+1/2!+1/3!+1/4!+...1/20!的和
var one = 1
var mu = 1
var sum = 0
for (var i=1; i<=20; i++)
{
    mu = mu * i
    // console.log(mu);  测试一下分母数值的阶乘变化是否正确
    sum = sum + one/mu   // one/mu即为20个数值
}
console.log(sum);


//  49. 控制台输出：求1 x 2 x 3 x 4 x ... x 19 x 20的结果
var result = 1
for (var i=1; i<=20; i++)
{
    result = result*i
}
console.log(result);


//  50. 控制台输出：从100到500所有自然数中不含数字4的自然数共有多少个？
var many = 0   //当作一个计数器
for (var i=100; i<=500; i++)
{
    if (i%10!=4 && parseInt(i%100/10)!=4 && parseInt(i/100)!=4)
    {
        many = many + 1  //每有一个符合条件的i出现，many值加一
    }
}
console.log(`从100到500所有自然数中不含数字4的自然数共有${many}个`);


// 二、简答题
// 1. 怎么将别的数据类型转换成字符串类型
//   用String(变量名)   或者  变量名.toString(进制)  转换
//                           注意.toString()不能转换null和undefined


// 2. 怎么定义一个对象，并且获取对象的属性，给对象添加和删除属性
//   定义对象：var person = {
            //    name : 'dong'
            //   }
//   获取对象属性: person.name    用.连接对象名和属性名，获取属性值
//   添加对象属性：
//                方法一：person.新属性名 = 新属性值
//                方法二：var 变量名 = '新属性名'  
//                       person[变量名] = 新属性值
//   删除对象属性：delete person.要被删除的属性名


// 3. == 和 === 的区别是什么？
//  区别是==只代表在转为同一类型数据时 值相同， 而===代表不只是同一数据类型下 值相同，数据类型也要相同

// console.log(1 == “1”)和console.log(1 === fasle)的结果是什么，并解释为什么
// console.log(1=="1");      结果为true   因为两个数值都转为数字类型时，数值相同，所以是true
// console.log(1===false);   结果为false  因为===要求数据类型也相同，数字类型和布尔类型不是同一数字类型，所以是false


// 4. 前++ 后++的区别是什么
// 前++ 和 后++ 的区别就是，前++需要在运算前加1，而后++是在每次运算完了再加1
