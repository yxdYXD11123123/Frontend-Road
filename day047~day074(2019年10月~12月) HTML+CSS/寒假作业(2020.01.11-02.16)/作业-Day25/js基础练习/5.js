// 使用循环打印图形
// `-***`
// `--**`
// `---*`

for (let i = 1; i <= 3; i++) {
    let line = ''
    for (let j = 1; j <= i; j++) {
        line += "-"
    }
    let star = ''
    for (let k = i; k <= 3; k++) {
        star += "*"
    }
    console.log(line + star);
}