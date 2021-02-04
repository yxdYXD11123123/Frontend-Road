// 写一个函数，该函数用于计算一个正数的因子和（比如6的因子和是1+2+3+6=12）

function getYinSum(num) {
    let sum = 0;
    for (let i = 1; i <= num; i++) {
        if (num % i == 0) {
            sum += i;
        }
    }
    console.log(`${num}的因子和是${sum}`);
}
getYinSum(6);