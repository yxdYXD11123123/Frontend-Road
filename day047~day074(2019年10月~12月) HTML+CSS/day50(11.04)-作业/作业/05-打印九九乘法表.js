// 5.打印九九乘法表

for (let i = 1; i <= 9; i++) {
    let str = ''
    for (let j = 1; j <= i; j++) {
        str = str + j + 'x' + i + '=' + j * i + ' ';
    }
    console.log(str);
}