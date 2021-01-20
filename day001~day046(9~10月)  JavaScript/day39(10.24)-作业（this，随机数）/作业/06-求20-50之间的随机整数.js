// 6. 求 20 到 50 之间的随机整数 [包括20 和 50]

// 步骤：
// 定义一个函数，声明两个形参作为最大值和最小值
function getRandom(min, max) {
    // 返回 最大值和最小值之间的随机整数
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// 调用随机整数，输入实参最大值为50，最小值为20， 并输出
console.log(getRandom(20, 50));
