// 需求: 使用for循环语句计算3+6+9+12+……+99的结果

// 分析：每个数相差3，从3开始， 到99介绍，想加到总的sum中

// 步骤：
// 声明一个变量，作为总和
var sum = 0
// 动用一个循环，起步值为3，范围到99，i每次递进3
for (var i=3; i<=99; i=i+3)
{
    // 将每次的i加入总和
    sum = sum + i
}
// 输出总和
console.log(sum);