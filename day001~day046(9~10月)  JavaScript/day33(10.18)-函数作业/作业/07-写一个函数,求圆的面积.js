// 7. 写一个函数,  求圆的面积：PI *r *r，圆的周长        const PI=3.14 / Math.PI

// 分析：先定义一个函数，声明一个形式参数作为半径，在函数中使用半径求出圆的面积，周长输出。调用函数，填入实际参数半径值

// 步骤：
// 先定义一个函数，声明一个形式参数作为半径
function area(r)
{
    // 求面积
    var area = Math.PI * r * r;
    // 求半径
    var perimeter = 2 * Math.PI * r;
    // 输出
    console.log(`圆的面积为${area}`);
    console.log(`圆的半径为${perimeter}`);
}
// 调用函数，实际参数设为1
area(1)