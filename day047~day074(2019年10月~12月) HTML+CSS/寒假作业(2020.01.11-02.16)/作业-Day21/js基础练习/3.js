// 产生5个20到30之间的随机整数[包括20和30]，并且通过Math方法，求出这5个数中的最大值和最小值
let arr = []
for (let i = 0; i < 5; i++) {
    let random = Math.floor(Math.random() * (30 - 20 + 1) + 20)
    arr.push(random);
}
let max = Math.max(...arr);
let min = Math.min(...arr);
console.log(arr, max, min);
