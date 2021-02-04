// 3.求2000-3000年之间的所有的闰年以及个数

let count = 0;
for (let i = 2000; i <= 3000; i++) {
    if (i % 400 == 0 || i % 100 != 0 && i % 4 == 0) {
        count++;
        console.log(i);
    }
}
console.log(count);
