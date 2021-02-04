// 使用循环打印图形
// `*** `
// `** `
// `*`

for (let i = 3; i >= 1; i--) {
    let str = ""
    for (let j = i; j >= 1; j--) {
        str += "*"
    }
    console.log(str);
}