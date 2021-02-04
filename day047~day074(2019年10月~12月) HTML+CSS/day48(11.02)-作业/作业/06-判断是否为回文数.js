// 6. 录入一个5位数,判断 该五位数是否为回文数。（判断第一位和第五位是否一样，第二位和第四位是否一样）

// 步骤：
// 声明一个变量，作为我们要判断的5位数
let num = 54345;
// 声明4个变量，分别作为5位数的个位数，十位数，千位数，万位数
let gewei = num % 10
let shiwei = Math.floor(num % 100 / 10)
let qianwei = Math.floor(num % 10000 / 1000)
let wanwei = Math.floor(num / 10000)
// console.log(gewei, shiwei, qianwei, wanwei);  检查数字是否找对
// 使用if判断，个位是否与万位相等，十位是否与千位相等
if (gewei == wanwei && qianwei == shiwei) {
    // 输出判断结果
    console.log(`${num}是回文数`);
}
else {
    console.log(`${num}不是回文数`);

}
