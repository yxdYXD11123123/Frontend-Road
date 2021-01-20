//  61. 计算从1到100临近两个整数的合并依次输出3(1+2),
//      第二次输出5(2+3),最后一次输出199(99+100)
for (var a=1; a<=99; a++)
{
    var b = a+1
    console.log(`${a+b}(${a}+${b})`);
}


//  62. 把1-100之间的数字，10个数字为一组，在控制台打印出每组的和，
//      例如，1-10的和为一组，输出来，11-20的和为一组输出来，依次类推
var sum = 0
var xun = 0     // 控制循环内 已循环的次数
for (var i=1; i<=100; i++)
{
    sum = sum + i
    xun = xun + 1
    if (xun==10)     // 每循环到10次 输出一次，并将sum 和 xun 归零一下
    {
        console.log(sum);
        sum = 0
        xun = 0
    }
}


// 63.开发一个标题为“ FlipFlop”的游戏应用程序。
// 它从 1 计数到100 ，遇到3的倍数输出单词“ Flip”，
// 遇到5的倍数就输出单词“Flop”，遇到即使 3 又是 5 的倍数时
// 则输出单词“ FlipFlop” ，其余情况下输出当前数字
for (var i=1; i<=100; i++)
{
    if (i%3==0 && i%5==0)
    {
        console.log('FlipFlop');
    }
    else if (i%3==0)
    {
        console.log('Flip');
    }
    else if (i%5==0)
    {
        console.log('Flop');
    }
    else 
    {
        console.log(i);
    }
}


//  64. 将下列文字分成多行显示, 春眠不觉晓，处处闻啼鸟。 夜来风雨声，花落知多少。
console.log('春眠不觉晓，\n处处闻啼鸟。 \n夜来风雨声，\n花落知多少。');


//  65. 定义一个四位数，按逆序打印出各位数字。
//      例如原数字为4321，应输出1234
var a = 4321
var gewei = a%10
var shiwei = parseInt(a%100/10)
var baiwei = parseInt(a%1000/100)
var qianwei = parseInt(a/1000)
var b = gewei*1000 + shiwei*100 + baiwei*10 + qianwei
console.log(b);


//  66. 定义一个三位数，求各位数的总和是多少，在控制台输出
var a = 789
var gewei = a%10
var shiwei = parseInt(a%100/10)
var baiwei = parseInt(a/100)
var b = gewei + shiwei + baiwei
console.log(`个位数的总和是${b}`);


//  67. 计算1+1/4+1/9+….+1/400，并且在控制台输出结果
var one = 1
var sum = 0
for (var i=1; i<=20; i++)
{
    sum = sum + one/(i*i)
}
console.log(sum);


//  68. 计算1-100能被3整除，但是不能被5整除的数，
//      在控制台打印出来，并且统计出个数
var many = 0
for (var i=1; i<=100; i++)
{
    if (i%3==0 && i%5!=0)
    {
        many = many + 1
        console.log(i);
    }
}
console.log(`共有${many}个这样的数`);


//  69. 输出从2000年（含）到3000年（含）间的所有闰年
for (var i=2000; i<=3000; i++)
{
    if (i%400==0)
    {
        console.log(i);
    }
    else if (i%4==0 && i%100!=0)
    {
        console.log(i);
    }
}


// 70.计算下列表达式的结果：，并写出详细步骤
 var a = 10;
 var b = 2;
 a %=b;   // a = a%b = 10%2 = 0
console.log(a);   // 0
console.log(b++); // 2 



// 二、简答题
// 1. console.log(0.1+.03)结果是什么，为什么
//    结果是0.13    因为.03 其实是0.03,虽然省略了.前面的0 ，但是还会识别为数字0.03


// 2. 怎么将一个小数，取小数点的后2位
//    用  小数.toFixed(2)   取小数点后的两位
//    例如:  console.log(10.435.toFixed(2));


// 3. 什么是隐式类型转换，什么时候发生
//    当两个不同类型数据进行计算时，Js 会自动转成相同类型再计算，这个过程被称为隐式类型转换


// 4. 类型转换时，Number和parseInt的区别是什么
//    parseInt() 必须以数字开头 并且 必须有数字才能转换
//               而且会将小数转成整数，直接去掉小数部分
//    Number()   还可以将空数组，空字符串，布尔值，null转为数字
//               并且会保留小数