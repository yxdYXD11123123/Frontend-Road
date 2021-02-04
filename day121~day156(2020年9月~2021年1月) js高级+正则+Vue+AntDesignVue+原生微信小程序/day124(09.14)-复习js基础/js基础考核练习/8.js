// 随机产生一个十六进制的颜色值 ,例如：#90E353

let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
let colorStr = '#'
for (let i = 0; i < 6; i++) {
    colorStr += arr[Math.floor(Math.random() * arr.length)];
}
console.log(colorStr);