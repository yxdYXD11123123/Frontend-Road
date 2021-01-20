//   51. 我们正在玩一个猜数字游戏。 游戏规则如下：
//       我从 1 到 100选择一个数字。 你需要猜我选择了哪个数字。
//       每次你猜错了，我会告诉你这个数字是大了还是小了,
//       如果你猜大了，输出”猜大了”；如果猜小了，输出”猜小了”；
//       如果猜对了，则输出“恭喜你，猜对了”
var answer = 44
var a = 44
if (a>answer) 
{
    console.log('猜大了');
}
else if (a<answer)
{
    console.log('猜小了');
}
else if (a==answer)
{
    console.log('恭喜你，猜对了');
}


//  52. 求出100-1000中，各个数字之和是12,这样的三位数有多少个，
//      在控制台打印出来
var sum = 0
for (var i=100; i<1000; i++)
{
    var gewei = i%10
    var shiwei = parseInt(i%100/10)
    var baiwei = parseInt(i/100)
    if (gewei+shiwei+baiwei==12)
    {
        sum = sum + 1
    }
}
console.log(`这样的三位数有${sum}个`);


//  53. 输入一个数，判断这个数是否是素数；
var a = 12
var b = true 
for (var i=2; i<a; i++) 
{
    if (a%i==0)
    {
        b = false   // 如果2到这个数本身有任何一个数可以将其整除，那么说明它不是素数，此时 b 的值就会变为 false 
    }
}
if (b==false)
{
    console.log(`${a}不是素数`);
}
else if (b==true)  //  如果 b 的值还为 true, 说明2到这个数本身没有数可以将其整除，所以 a 一定是素数
{
    console.log(`${a}是素数`);
}


//  54. 找出一个数的所有因子数
var a = 34
for (var i=1; i<=a; i++)
{
    if (a%i==0)
    {
        console.log(i);
    }
}


//  55. 输入一个整数放入到变量n中，如果这个整数大于0，
//      那么计算1+2+3+……+(n-1)+n的结果，否则输出“输入的数据有错误
var a = 2
var n = 10
var sum = 0
if (a>0)
{
    for (var i=a; i<=n; i++)
    {
        sum = sum + i
    }
    console.log(sum);
}
else 
{
    console.log('输入的数据有错误');
}


//  56. 输入年份和月份，例如：输入2019 ,9，控制台输出‘时间是2019年9月’
var year = 2019
var month = 9
console.log(`时间是${year}年${month}月`);


//  57. 根据条件确定公司是否已经为司机投保
//      如果司机满足下列条件之一，公司则为他们投保；
//      1)	司机已婚。
//      2)	司机为30岁以上的未婚男性
//      3)	司机为25岁以上的未婚女性。
//      如果以上条件一个也不满足，则公司不为司机投保。
//      请编写一个程序，根据用户输入司机的婚姻状况、性别和年龄，
//      判定该司机是否已经投保。
var married = false
var age = 26
var gender = 'woman'
if (married == true)
{
    console.log('该司机已投保');
}
else if (married==false && age>=30 && gender=='man')
{
    console.log('该司机已投保');   
}
else if (married==false && age>=25 && gender=='woman')
{
    console.log('该司机已投保');   
}
else 
{
    console.log('该司机未投保');
}


//  58. 求任何一个数的阶乘
var a = 4
var A = 1
for (var i=1; i<=a; i++)
{
    A = A * i 
}
console.log(`${a}的阶乘为${A}`);


//  59. 在控制台倒序输出100,99,98,97,96,95.....1
for (var i=100; i>=1; i--)  // 将初始值设为100，用i--完成倒序
{
    console.log(i);
}


//  60. 计算10个99相加后的值并输出。
var sum = 0
for (var i=0; i<10; i++)   // 控制循环10次
{
    sum = sum + 99   // 每次循环加99
}
console.log(sum);



// 二、简答题
// 1. null和undefined分别代表的含义是什么
//    null 代表 这个变量的值为 空      undefined 代表 定义了一个变量但是没有赋值


// 2. 布尔类型有几个值？分别代表什么
//    两个值
//    true 代表 真
//    false 代表 假


// 3. 说出至少三种执行js代码的方式
//    第一种：在vscode中终端里，用node执行
//    第二种：在vscode中用 调试 执行
//    第三种：在网页中执行


// 4. 怎么定义一个数组，并且获取数组小标对应的某一项的值
//    定义数组：var a = []    (用中括号)
//    数组里 每个元素 对应的 元素下标 从 0 开始递增，0对应第一个元素，1对应第二个元素，... 
//    获取元素下标对应的某一值时:  数组变量名[对应的元素下标]   (同样用中括号)
//    例如： 
//    获取a中的第二个元素： console.log(a[1])
