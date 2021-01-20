// 打印图形
// 55555
// 4444
// 333
// 22
// 1
// 22
// 333
// 4444
// 55555

// 步骤：
// 循环5次，输出5行，让i从5到1
for (let i = 5; i >= 1; i--) {
    // 声明一个空字符串，保存每行输出内容
    let str = ''
    // 利用循环添加数字，添加次数随行数变化而变化
    for (let j = 1; j <= i; j++) {
        // 将内容加入字符串
        str += i
    }
    console.log(str);
}
for (let i = 2; i <= 5; i++) {
    let str = ''
    for (let j = 5 - i; j <= 4; j++) {
        str += i
    }
    console.log(str);
}