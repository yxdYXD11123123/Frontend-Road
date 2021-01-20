// 1. 利用JavaScript打印出所有的"水仙花数"，
//    所谓"水仙花数"是指一个三位数，其各位 数字立方和等于该数本身。

for (i=100;i<1000;i++)
{
    //i的个位数是 i%10  十位数是parseInt(i%100/10)    百位数是 parseInt(i/100)
    // 例如：i = 345 
    // console.log(i%10);   5
    // console.log(parseInt(i%100/10));  4
    // console.log(parseInt(i/100));  3
    var gewei = i%10
    var shiwei = parseInt(i%100/10)
    var baiwei = parseInt(i/100)
    if (i == gewei*gewei*gewei+shiwei*shiwei*shiwei+baiwei*baiwei*baiwei)
    {
       console.log(i);
    }
}//水仙花数：153，370，371，407


// 2.求任意三个数字的最大值和最小值
var a = 99
var b = 100
var c = 111
if (a>b && a>c)
{
    console.log(a);
}
else if(b>a&&b>c)
{
   console.log(b);
}
else if(c>a&&c>b)
{
    console.log(c);
}//求出最大值
if (a<b && a<c)
{
    console.log(a);
}
else if(b<a&&b<c)
{
   console.log(b);
}
else if(c<a&&c<b)
{
    console.log(c);
}//求出最小值


//  3. 给一个数字赋值给一个变量num1，求出是奇数还是偶数
var num1 = 5
if(num1%2==1)
{
    console.log('奇数');
}
if(num1%2==0)
{
    console.log('偶数');
}


//  4. 利用JavaScript完成如下功能：给出一个数判断是属
//       于小数还是整数，如：var a= 3.14输出：3.14是小数 
var wh = 12.6
if (wh*10%10!=0)
{
    console.log(wh+"是小数");
}
else
{
    console.log(wh+'是整数');
}


//  5.提示用户输入年龄，若用户的年龄大于等于18岁，则弹出“恭喜
//    您，您已经成年”，否则以弹出框的方式提示用户年龄太小。
// var a = prompt('请您输入年龄');
// if (a >= 18)
// {
//     alert('恭喜您，您已成年');
// }
// else
// {
//     alert('抱歉，您的年龄太小');
// }



//  6. 利用JavaScript完成如下功能：判断如果a>60，则b=1；如果a>70，
//     则b=2；如果a>80，则b=3；如果a>90，则b=4 ,在页面弹出对应b的值
var a = 99
if(a>90){
    b=4
}
else if (a>80){
    b=3
}
else if (a>70){
    b=2
}
else if (a>60){
    b=1
}
console.log(b);


//   7. 利用JavaScript编写程序：通过用户输入的年龄判断是哪个年龄段的人
//     （儿童：年龄＜14；青少年：14<=年龄＜24；青年：24<年龄＜40; 
//      中年：40＜=年龄＜60; 老年：年龄>=60），并在页面上输出判断结果。
var age = 40

if (age<14)
{
    console.log('年龄');
}
else if (24>age&&age>=14)
{
    console.log('青少年');
}
else if (40>age&&age>=24)
{
    console.log('青年');
}
else if (60>age&&age>=40)
{
    console.log('中年');    
}
else if (age>=60)
{
    console.log('老年');
}


//  8. 接收班长口袋里的钱数？若大于等于2000，请大家吃西餐。若小于2000，
//     大于等于1500，请大家吃快餐。若小于1500，大于等于1000，请大家喝饮料。
//     若小于1000，大于等于500，请大家吃棒棒糖。否则提醒班长下次把钱带够
var money = 1500
if (money>=2000)
{
    console.log('请大家吃西餐');
}
else if (money>=1500)
{
    console.log('请大家吃快餐');
}
else if (money>=1000)
{
    console.log('请大家喝饮料');
}
else if (money>=500)
{
    console.log('请大家吃棒棒糖');
}
else {
    console.log('下次把钱带够');
}


//  9. 分数转换,给一个分数，判定等级。大于等于90  A，大于等于80小于90 
//     B，大于等于70小于80  C ，大于等于60小于70 
var score = 78
if (score>=90)
{
    console.log('A');
}
else if (90>=score&&score>=80)
{
    console.log('B');
}
else if (80>=score&&score>=70)
{
    console.log('C');
}
else if (70>=score&&score>=60)
{
    console.log('D');
}



//10. 获取当前时间，判断今年是否为闰年。两种方法判断 
//    1）判断今年是否为闰年；  能被400整除 或 被4整除但不能被100整除
var year = 1999
if(year%400==0 || (year%4==0 && year%100!=0))
{
    console.log('是闰年');
}
else 
{
    console.log('不是闰年');
}


// 11. 本金10000元存入银行，年利率是千分之三，每过1年，将本金和
//     利息相加作为新的本金。计算5年后，获得的本金是多少？ 
var much = 10000
for (var i=0;i<5;i++){
    much = much*3/1000+much
}
console.log(much.toFixed(2));     //10150.90


//  12. 根据输入的数字，判断如果是1-5打印工作日，如果是6，7打印休息日。
var day = 5
if (day>=1&& day<=5)
{
    console.log('工作日');
}
else if (day==7 || day==6)
{
    console.log('休息日')
}


//   13. 录入姓名和性别根据输入的姓名，性别，打印欢迎XX先生/女士。
//      （性别用0和1区别。0表示女士，1表示男士）
var gender = 0
var name = 'dong'
if(gender==1)
{
    console.log(`欢迎${name}先生`);
}
else if(gender==0)
{
    console.log(`欢迎${name}女士`);
}


// 14. 输出该数字打头的一个成语，视为你今天的状态
//     1：一帆风顺
//     2：二话不说
//     3：三心二意
//     4：四面楚歌
//     5：五湖四海
//     6：六亲不认
//     7：七上八下
var c = 5
if (c==1)
{
    console.log('一帆风顺');
}
else if (c==2)
{
    console.log('二话不说');
}
else if (c==3)
{
    console.log('三心二意');
}
else if (c==4)
{
    console.log('四面楚歌');
}
else if (c==5)
{
    console.log('五湖四海');
}
else if (c==6)
{
    console.log('六亲不认');
}
else if (c==7)
{
    console.log('七上八下');
}


//  16. 录入一个整数,判断它能否被3,5,7整除,并输出以下信息
    // (1)能同时被3,5,7整除
    // (2)能被其中两个数整除(要指出那两个数)
    // (3)只能被其中一个数整除(指出那一个)
    // (4)不能被3,5,7任一个整除
var nums = 17
if(nums%3==0 && nums%5==0 && nums%7==0)
{
    console.log('能同时被3,5,7整除');
}
else if (nums%3==0 && nums%5==0)
{
    console.log('能同时被3,5整除');
}
else if (nums%5==0 && nums%7==0)
{
    console.log('能同时被5,7整除');
}
else if (nums%7==0 && nums%3==0)
{
    console.log('能同时被3,7整除');
}
else if (nums%7==0)
{
    console.log('只能被7整除');
}
else if (nums%5==0)
{
    console.log('只能被5整除');
}
else if (nums%3==0)
{
    console.log('只能被3整除');
}
else
{
    console.log('不能被3，5，7任一个数整除');
}


//   17. 录入两个整数a和b,若a+b大于100,
//       则输出a+b大于100的部分,否则输出两数之和.
var a = 67
var b = 13
if (a+b>100)
{
    console.log(a+b-100);
}
else 
{
    console.log(a+b);
}


//   18. 输入三角形的三边，根据输入的三角形的三边判断是否能
//       组成三角形，如果可以进一步 判断三角形的类型等边三角形(三边
//       相等) 等腰三角形(两边相等)  直角三角形(a平方+b平方=c平方)  
//       其他三角形（不满足上面的）
var side1 = 3
var side2 = 4
var side3 = 5
if (side1 == side2 && side2==side3)
{
    console.log('等边三角形');
}
else if (side1==side2 || side1==side3 || side2==side3)
{
    if (side1*side1==side2*side2+side3*side3 || side1*side1==side3*side3+side2*side2 || side3*side3==side2*side2+side1*side1)
    {
        console.log('直角三角形');
    }
    else 
    {
        console.log('等边三角形');
    }
}
else if (side1*side1==side2*side2+side3*side3 || side1*side1==side3*side3+side2*side2 || side3*side3==side2*side2+side1*side1)
{
    console.log('直角三角形');
    
}
else {
    console.log('其它三角形');
    
}
