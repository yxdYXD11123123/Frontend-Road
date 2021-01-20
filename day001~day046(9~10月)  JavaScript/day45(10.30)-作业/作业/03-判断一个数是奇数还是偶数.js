// 3. 给一个数字赋值给一个变量num1，求出是奇数 还是 偶数

function which(num) {
    if (num % 2 == 0) {
        console.log(`${num}是偶数`);
    }
    else {
        console.log(`${num}是奇数`);
    }
}

let num1 = 0
which(num1)