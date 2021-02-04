// 2. 求1~100以内(包含1和100)能同时被3，5整除的数的和，并将求出的和打印到控制台上.(while实现)

// 步骤：
let i = 1;
let sum = 0
while (i <= 100) {
    if (i % 3 == 0 && i % 5 == 0) {
        sum += i
    }
    i++;
}
console.log(sum);
