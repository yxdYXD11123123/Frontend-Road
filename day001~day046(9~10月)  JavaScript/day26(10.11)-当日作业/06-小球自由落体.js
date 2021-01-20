// 需求： 6. 一球从100米高度自由落下，每次落地后反跳回原高度的一半；再落下，编程实现获取它在 第10次落地时，共经过多少米？第10次反弹多高？

// 分析：声明一个变量作为小球每次到最高点时与地面的距离，再声明一个变量记录小球坠落次数，输出小球第10次落地时的高度，以及第10次反弹的高度

// 步骤：
// 声明变量计数器
var time = 0
// 声明变量小球每次最高点时距离地面的高度
var gaodu = 100
var sum = 0
// 动用一个while循环
while (true) 
{
    // 加上坠落的高度
    sum += gaodu
    gaodu= gaodu/2
    // 加上弹起的高度
    sum += gaodu
    time++
    // console.log(gaodu, sum, time);  // 测试每次数据是否对应正确值
    if (time==10)
    {
        // 第10次弹起时的高度
        console.log(`第10次弹起时的高度为${gaodu}米`);
        break 
    }
}
// 第10次弹起后经过的总高度-第10次弹起的高度=第10次落地时经过的总高度，输出
console.log(`第10次落地时经过的距离为${sum-gaodu}米`);
