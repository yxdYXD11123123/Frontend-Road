// 需求： 5. 分析以下需求并实现
//    1.定义一个用于存放班级分数的数组var score = [80,90,85,90,78,88,89,93,98,75];
//    2.求出班级不及格人数(分数低于60分的就是不及格) ?? 
//    3.求出班级的平均分
//    4.求出班级的总分数

// 分析：先用for循环将所有名单遍历出来，然后声明一个变量作为不合格的计算器

// 步骤：
// 定义数组
var score = [80,90,85,90,78,88,89,93,98,75];
var sum = 0
var people = 0 
// 用for循环遍历出所有元素
for (var i=0; i<score.length; i++)
{
    if (score[i]<60)
    {
        people++
    }
    sum += score[i]
}
console.log(`班级不及格人数为${people}人,总分数为${sum}，平均分为${sum/score.length}`);
