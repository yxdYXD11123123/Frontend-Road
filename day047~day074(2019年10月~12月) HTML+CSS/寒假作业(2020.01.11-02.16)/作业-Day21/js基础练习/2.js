// 随机产生一个十六进制的颜色值 ,格式：#9ab353
let color = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "c", "e"]
let get = "#"
for (let i = 0; i < 6; i++) {
    let random = Math.floor(Math.random() * (16));  //0,0.9  0,15.9
    get += color[random];
}
console.log(get);


