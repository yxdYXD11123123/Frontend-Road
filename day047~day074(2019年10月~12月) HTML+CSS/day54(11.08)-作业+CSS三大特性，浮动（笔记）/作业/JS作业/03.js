// 斐波那契数列, 1,1,2,3,5,8,13,21

// 假设每轮的第一个月
let first = 1;
// 假设为每轮的第二个月
let second = 1;
// 从3月开始循环，循环到12月
for (let i = 3; i <= 12; i++) {
    // 将本轮第二月的值赋值给临时变量
    let temp = second;
    // 将本轮第一月与第二月相加赋值给下一轮的第二月
    second = first + second;
    // 将临时变量保留下的本轮第二月的值赋值给下一轮的第一月
    first = temp;
}
console.log(second);

