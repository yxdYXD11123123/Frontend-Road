// 使用循环打印图形
// `* ==== `
// `**  === `
// `***   == `
// `****    =`

for (let i = 1; i <= 4; i++) {
    let star = ""
    for (let s = 1; s <= i; s++) {
        star += "*"
    }
    let kong = ""
    for (let k = 1; k <= i; k++) {
        kong += " "
    }
    let deng = ""
    for (let d = i; d <= 4; d++) {
        deng += "="
    }
    console.log(star + kong + deng);
}