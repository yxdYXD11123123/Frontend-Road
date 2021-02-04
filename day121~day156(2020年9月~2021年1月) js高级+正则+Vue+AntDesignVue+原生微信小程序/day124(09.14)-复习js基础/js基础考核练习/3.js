// 写一个(函数)，实现n的阶层的和求1+2!+3!+...+n!的和

function getJie(n) {
    let sum = 0;
    let jie = 1;
    for (let i = 1; i <= n; i++) {
        jie = jie * i;
        sum += jie;
    }
    return sum;
}

console.log(getJie(4));