// 写一个函数，判断一个数是否是素数，并返回结果true 或 false(又叫质数，只能被1和自身整数的数)

function isSuShu(num) {
    let isSu = true;
    for (let i = 2; i < num; i++) {
        if (num % i == 0) {
            isSu = false;
        }
    }
    return isSu;
}

console.log(isSuShu(11));
