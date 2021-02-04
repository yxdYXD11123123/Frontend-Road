// 2.求1-100之间所有偶数的和，以及偶数的个数

let sum = 0
let count = 0
for (let i = 1; i <= 100; i++) {
    if (i % 2 == 0) {
        sum += i;
        count++;
    }
}
console.log(sum, count);
