// 使用一个for循环实现：1-100之间所有偶数的打印
// 要求：使用两种方式实现（其中一个方式必须使用 `continue` 关键字）


//方法一
for (let i = 1; i <= 100; i++) {
    if (i % 2 != 0) {
        continue;
    }
    console.log(i);
}

//方法二
let num = 1
while (num <= 100) {
    if (num % 2 == 0) {
        console.log(num);
    }
    num++;
}