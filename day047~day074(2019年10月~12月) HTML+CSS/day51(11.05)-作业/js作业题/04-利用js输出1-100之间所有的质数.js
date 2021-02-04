// 4. 利用JavaScript的for循环输出1-100之间所有的质数（只能被1和自身整除的数，不包括1）

// 步骤：

// 循环1-100之间的数
for (let i = 1; i <= 100; i++) {
    // 准备一个布尔值，假设是质数，值为true
    let isSu = true;
    // 循环2到这个数本身之间的所有数
    for (let j = 2; j < i; j++) {
        // 判断是否有数能将这个数本身整除
        if (i % j == 0) {
            // 如果有，那么这个数不是质数
            isSu = false;
        }
    }
    // 如果isSu是true，那么输出这个数
    if (isSu == true) {
        console.log(i);
    }
}
