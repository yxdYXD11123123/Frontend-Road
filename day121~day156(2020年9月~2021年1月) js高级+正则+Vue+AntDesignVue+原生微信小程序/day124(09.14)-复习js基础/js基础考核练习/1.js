// 定义数组
let arr = [
    [11, 11, 22, 33, 44, 55],
    [22, 11, 22, 33, 44, 55, 88],
    [33, 11, 22, 33, 44],
    [44, 11, 22, 44, 55],
    [55, 55],
];

// 求出和, 平均数, 数字 11 出现的次数
let times = 0;
let sum = 0;
let count = 0;
arr.forEach((value, index) => {
    value.forEach((i, j) => {
        i === 11 ? times += 1 : times;
        sum += i;
        count += 1;
    })
})
console.log(times);
console.log(sum);
console.log(sum / count);