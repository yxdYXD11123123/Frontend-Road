//   30. 求200到300之间所有奇数的和
var sum = 0
for (var i=200; i<=300; i++)
{
    if (i%2!=0)
    {
        sum = sum + i
    }
}
console.log(sum);


//   31. for循环嵌套打印5行5列的正方形，如图所示(拔高题)
for (var i=0; i<5; i++)  // 控制共输出5行
{
    var hang = ''  // 注意定义每行的总内容时，必须将其放到行循环的内部，行内循环的外部，以起到每行开始时归零（不叠加）的效果
    for (var s=0; s<5; s++)  //控制每行输出5颗星
    {
        hang = hang + `* `
    }
    console.log(hang);
}


//  32. for循环嵌套打印一个直角三角形,如果所示(拔高题)
for (var i=0; i<5; i++) //控制输出5行
{
    var hang = ''
    for (var s=0; s<=i; s++) //使每行 “星数” 跟随 “行数” 变化
    {
        hang = hang + `* `
    }
    console.log(hang); 
}


//  33.	for循环嵌套打印一个倒的直角三角形,如果所示(拔高题)
for (var i=4; i>0; i--)  // 控制总共输出4行，并且将初始值改为4，设为i--，使其从大到小，便于下面每行“星数”跟随“行数”，从多到少
{
    var hang = ''
    for (var s=0; s<i; s++) //使每行 “星数” 跟随 “行数” 变化
    {
        hang = hang + `* `
    }
    console.log(hang);
}


//  34.	企业发放的奖金根据利润提成。利润(I)低于或等于10万元时，
//      奖金可提10%；利润高于10万元，低于20万元时，低于10万元
//      的部分按10%提成，高于10万元的部分，可可提成7.5%；
//      20万到40万之间时，高于20万元的部分，可提成5%；
//      40万到60万之间时高于40万元的部分，可提成3%；
//      60万到100万之间时，高于60万元的部分，可提成1.5%，
//      高于100万元时，超过100万元的部分按1%提成，用户定义变量
//      ，输入当月利润I，求应发放奖金总数？
var I = 10
var bonus = 0
if (I<=10)
{
    bonus = I * 10/100
}
else if (I>10 && I<=20)
{
    bonus = 10*10/100 + (I-10)*7.5/100
}
else if (I>20 && I<=40)
{
    bonus = 10*10/100 + 10*7.5/100 + (I-20)*5/100
}
else if (I>40 && I<=60)
{
    bonus = 10*10/100 + 10*7.5/100 + 20*5/100 + (I-40)*3/100
}
else if (I>60 && I<=100)
{
    bonus = 10*10/100 + 10*7.5/100 + 20*5/100 + 20*3/100 + (I-60)*1.5/100
}
else if (I>100)
{
    bonus = 10*10/100 + 10*7.5/100 + 20*5/100 + 20*3/100 + 40*1.5/100 + (I-100)*1/100
}
console.log(`应该发放奖金${bonus}万元`);


//  35. 找出1-99之间是7的倍数或者个位数字是7
//      或者是十位数字是7的数字，在控制台打印输出
for (var i=1; i<100; i++)
{
    if (i%7==0)
    {
        console.log(i);
    }
    else if (i>10 && i%10==7)
    {
        console.log(i);
    }
    else if (parseInt(i/10)==7)
    {
        console.log(i);
    }
}


//  36. 利用JavaScript编写程序实现如下功能，五个小朋友排成一队。
//      问第一个多大了，第一个说比第二个大两岁，
//      问第二个，第二个说比第三个大两岁，以此类推。
//      问第五个小朋友几岁了，第五个小朋友说3岁了。
//      问第一个小朋友几岁了？
var five = 3
var four = five + 2
var three = four + 2 
var two = three + 2
var one = two + 2 
console.log(`第一个小朋友${one}岁了`);


//  38. 使用for循环语句计算3+6+9+12+……+99的结果
var sum = 0
for (var i=1; i<100; i++)
{
    i = i + 2
    // console.log(i);   测试一下i每次的值是否符合要求
    sum = sum + i // 找一个容器将所有的i相加起来
}
console.log(sum);


//  39. 输出1加到100（去掉3的倍数）的和
var sum = 0 
for (var i=1; i<=100; i++)
{
    if (i%3 != 0) // 将3的倍数排除掉
    {   
        sum = sum + i
    }
}
console.log(sum);


//  40. 求1-100之间所有数的积
var ji = 1
for (var i=1; i<=100; i++)
{
    ji = ji * i
}
console.log(ji);


// 二、简答题
// 1. 转字符串类型的时候，有哪些限制？
//   用String()转字符串时，第一：没法转进制字符串
//                        第二：如果是对象，只能转为字符串： [object Object]
//                        第三：如果是数组，只能返回该数组的字符串形式
//   用 变量名.toString(进制) 转字符串时， undefined 和 null 不能用


// 2. 关于变量命名的规则有哪些
//   第一：变量名只能包含数字，字母，下划线
//   第二：不能以数字开头
//   第三：不能是一些关键字（比如var,if,for等等）
//   第四：不推荐使用中文


// 3. Console.log(true&&false||true)和
//    console.log(false || true&&false)
//    的结果分别是什么，并解释为什么
// 答案：
// console.log(true&&false||true);   结果为true 
// &&的优先级高于|| ，所以先判断true&&false, 又因为&&中只要有一个false结果就是false,所以true&&false==false
// 然后判断false || true,因为||中只要有一个true，结果就是true，所以最后结果为true。

// console.log(false || true&&false);   结果为false 
// &&的优先级高于|| ，所以先判断true&&false, 又因为&&中只要有一个false结果就是false,所以true&&false==false
// 然后判断false || false,因为||中都是false ，结果就是false，所以最后结果为false。



// 4. 将一行字符串分多行显示，有几种写法，分别是什么
// 两种
// 第一种：用反引号 `...` 在输入输出内容时直接分多行
// 例如：`xxxxx
//        xxxx
//        xxxx`

// 第二种：用 \n ，在字符串中加入\n来分多行
// 例如："xxxxx\nxxxx\nxxxx"





