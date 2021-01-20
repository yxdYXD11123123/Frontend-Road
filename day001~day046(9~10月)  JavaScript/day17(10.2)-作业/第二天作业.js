// 11.商场推出幸运抽奖活动，抽奖规则如下：
//   (1)用户输入一个四位数字(1000-9999的数字),作为顾客的会员卡号
//   (2)该会员卡号(四位数字)各位数字之和大于20，则为幸运客户
//   (3)打印格式：
//      请输入4位会员卡号：3569
//      会员卡号3569各位之和：23
//      会员卡号3569是幸运客户
var card = 7777
var gewei = card%10
var shiwei = parseInt(card%100/10)
var baiwei = parseInt(card%1000/100)
var qianwei = parseInt(card/1000)
if(gewei+shiwei+baiwei+qianwei>20)
{
    console.log(
        `请输入4位会员卡号：${card}
会员卡号${card}各位之和：${gewei+shiwei+baiwei+qianwei}
会员卡号${card}是幸运客户`); 
}
else
{
    console.log(
        `请输入4位会员卡号：${card}
会员卡号${card}各位之和：${gewei+shiwei+baiwei+qianwei}
会员卡号${card}不是幸运客户`); 
}


// 12.用户定义一个数字，数字的范围在 1-9999之间，
// 然后输入的数字是 3，则前面补全 3个0，使之成为”0003”
// 如果输入的数字是25，则前面补全2个0,  使之成为”0025”
// 如果输入的数字是146，则前面补全1个0，使之成为”0146”
// 如果输入的数字是1235，则不用补全。
// 最后将结果打印出来。
var num = 2224
if(num>=1000)
{
    console.log(num);
}
else if (num>=100)
{
    console.log('0'+num);
}
else if (num>=10)
{
    console.log('00'+num);
}
else 
{
    console.log('000'+num);
}


//   13. 在控制台打印出，数字在1000-9999范围内，包括9000，
//       4位数中能被6整除不能被12整除的所有的数
for (var i=1000; i<=9999;i++)
{
    if(i%6==0 && i%12!=0)
    {
        console.log(i);
    }
}


// 14.请按如下要求编写程序,打印菜单:
//   当数字为1时输出菜单"新建";
//   当数字为2时输出菜单"打开文件";
//   当数字为3时输出菜单"保存";
//   当数字为4时输出菜单"刷新";
//   当数字为5时输出菜单"退出",
var a = 1
if (a==1)
{
    console.log('新建');
}
else if (a==2)
{
    console.log('打开文件');
}
else if (a==3)
{
    console.log('保存');
}
else if (a==4)
{
    console.log('刷新');
}
else if (a==5)
{
    console.log('退出');
}


//  15.控制台输出九九乘法表
for(var a=1; a<=9; a++)
{
    for (var b=1; b<=a; b++)
    {
        console.log(`${b}*${a}=${a*b}`);
    }
}


//  16.控制台输出1-100能被7整除的所有数字
for (var i=1; i<=100;i++)
{
    if (i%7==0)
    {
        console.log(i);
    }
}


//  17.利用JavaScript完成如下功能：用户输入日期，(例如：周一)，
//     如果是周一，则‘去郊游’；如果是周日，则‘去动物园喽’，如果是
//     周一到周五的任意一天，则‘去上班，加油’，否则‘请输入正确的日期！！！！’
var day = '周一'
if (day=='周六')
{
    console.log('去郊游');
}
else if (day=='周一'||day=='周二'||day=='周三'||day=='周四'||day=='周五')
{
    console.log('去上班，加油');
}
else if (day=='周日')
{
    console.log('去动物园喽');
}
else 
{
    console.log('请输入正确的日期！');
}


//   18. 利用JavaScript编写程序：通过用户输入的时间来判断哪个时间段，
//       请输入 24 小时制的时间，0-24 如果超出“时间输入有误”，
//       如果时间是0点到6点，在控制台输出，现在时间为凌晨"+s+'点，
var time = 24
if (time>24)
{
    console.log('时间输入有误');
}
else if (time>=22)
{
    console.log(`现在时间为深夜${time-12}点`);
}
else if (time>=12)
{
    console.log(`现在时间为下午${time-12}点`);
}
else if (time>=7)
{
    console.log(`现在时间为上午${time}点`);
}
else if (time>=0)
{
    console.log(`现在时间为凌晨${time}点`);
}


//  19. 判断一个整数，属于哪个范围：大于0；小于0；等于0，
//      如果输入的不是数字，则输出，“输入的数值有误”
var nums = 3
if (nums<0)
{
    console.log('小于0');
}
else if (nums==0)
{
    console.log('等于0');
}
else if (nums>0)
{
    console.log('大于0');
}
else 
{
    console.log('输入数值有误');
}


//   20. 输入一个整数，如果此数为0，则输出"石头", * 
//       如果此数为1，则输出"剪刀",如果此数为2，则输出"布",
//       * 如果为其它，则输出"错误"
var num1 = 2
if (num1==0)
{
    console.log('石头');
}
else if (num1==1)
{
    console.log('剪刀');
}
else if (num1==2)
{
    console.log('布');
}
else 
{
    console.log('错误');
}


// 二、简答题
// 1. if分支的语法结构是什么
//    if(条件表达式) {满足条件后要执行的代码块}
//    else if (条件表达式) {满足条件后执行的代码块}
//    else {以上条件都不满足后执行的代码块}


// 2. for循环语句的语法结构是什么
//    for (变量初始值；循环的条件；自增/自减)
//        {重复执行的代码块}


// 3. 逻辑运算符有哪些，分别有哪些规则
//    &&：只要有一个false,结果就是false,并且返回第一个false值，如果都是true,返回最后一个true值
//    ||：只要有一个true,结果就是true,并且返回第一个true值，如果都是false,返回最后一个false值
//    ！：取反，如果一个值是true,那么结果就是false,如果一个值是false,那么结果就是true


// 4. 怎么声明一个常量，常量的值是否可以修改，常量的命名规则有什么？
//    const 常量名 = 值
//    常量值不可以修改
//    一般常量名使用大写


