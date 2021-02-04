// 1. 打印1-100中前三个是17的整数倍的数。

let time = 0;
for (let i = 1; i <= 100; i++) {
    if (time == 3) {
        break;
    }
    if (i % 17 == 0) {
        console.log(i);
        time++;
    }
}