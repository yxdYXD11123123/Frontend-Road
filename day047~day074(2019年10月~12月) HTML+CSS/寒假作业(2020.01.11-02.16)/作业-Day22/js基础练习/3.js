// 利用JavaScript打印出所有的"水仙花数"，所谓"水仙花数"是指一个三位数，其各位 数字立方和等于该数本身。

for (let i = 100; i < 1000; i++) {
    let gewei = i % 10;
    let shiwei = parseInt(i % 100 / 10);
    let baiwei = parseInt(i / 100);

    if (Math.pow(gewei, 3) + Math.pow(shiwei, 3) + Math.pow(baiwei, 3) == i) {
        console.log(i);
    }
}

