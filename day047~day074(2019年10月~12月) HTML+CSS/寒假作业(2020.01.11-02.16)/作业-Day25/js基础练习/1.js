// 使用循环打印九九乘法表

for (let i = 1; i <= 9; i++) {
    let str = ""
    for (let j = 1; j <= i; j++) {
        str += i + "x" + j + "=" + i * j + " "
    }
    console.log(str);
}

