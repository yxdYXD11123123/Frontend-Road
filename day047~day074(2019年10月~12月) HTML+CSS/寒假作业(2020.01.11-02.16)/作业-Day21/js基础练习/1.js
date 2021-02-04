// 求 30 到 50 之间的随机整数 [包括30 和 50]
function getRandom(min, max) {
    let random = Math.floor(Math.random() * (max - min + 1)) + min
    return random;
}
for (let i = 0; i <= 100; i++) {
    console.log(getRandom(30, 50));
}