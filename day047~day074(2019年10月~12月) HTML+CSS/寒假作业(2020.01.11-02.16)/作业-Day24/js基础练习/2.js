// 定义2个数组，let arrA = [1,2,3,3]; let arrB = [2,4,5,6]求2个数组的并集，交集

let arrA = [1, 2, 3, 3];
let arrB = [2, 4, 5, 6];
let jiaoJi = []
for (let i = 0; i < arrA.length; i++) {
    if (arrB.includes(arrA[i]) == true) {
        jiaoJi.push(arrA[i])
    }
}
console.log(jiaoJi);

let bingJi = [...new Set(arrA.concat(arrB))]
console.log(bingJi);
