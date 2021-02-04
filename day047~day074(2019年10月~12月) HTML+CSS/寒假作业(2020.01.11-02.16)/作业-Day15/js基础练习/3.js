// 写一个函数，求任意一个数的阶乘

function getJie(num) {
    let jie = 1;
    for (let i = 1; i <= num; i++) {
        jie *= i;
    }
    console.log("这个数的阶乘为" + jie);
}

getJie(5);