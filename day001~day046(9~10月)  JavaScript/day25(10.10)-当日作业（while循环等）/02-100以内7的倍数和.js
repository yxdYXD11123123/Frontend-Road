//  2. 100以内7的倍数的总和(while实现)

// 声明一个变量，并且赋予变量循环所需要的初始值
var i = 1
// 声明一个变量，作为总和
var sum = 0
// 动用while循环
while (i<=100) {
    // 判断出哪些是7的倍数
    if (i%7==0)
    {
        //加入总和
        sum += i 
    }
    // 让i递增1，作为步进表达式
    i++
}
// 输出总和
console.log(sum);

