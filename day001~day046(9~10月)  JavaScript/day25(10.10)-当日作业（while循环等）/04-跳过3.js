//  4. 求整数1～100的累加值，但要求跳过所有个位为3的数(while实现)

// 声明一个变量作为总和
var sum = 0
// 声明一个初始值
var i = 1
// 动用一个while
while (i<=100) {
    // 利用判断，如果i的个位数不为3，则累加
    if(i%10!=3)
    {
        sum += i
    }
    i++
}
console.log(sum);
