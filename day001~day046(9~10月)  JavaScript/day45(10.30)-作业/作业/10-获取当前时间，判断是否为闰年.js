// 10. 获取当前时间，判断今年是否为闰年。两种方法判断 
//     1)判断今年是否为闰年；  能被400整除 或 被4整除但不能被100整除
//     2)判断本年2月是否为28天。闰年：2月有29天  平年：2月有28天

let date = new Date();
let year = date.getFullYear();
// console.log(year);
if (year % 400 == 0 || year % 4 == 0 && year % 100 != 0) {
    console.log(year + '是闰年');
}
else {
    console.log(year + '是平年');
}


// 方法二：判断本年2月是否为28天。闰年：2月有29天  平年：2月有28天
// var date = new Date();
// var year = date.getFullYear()
// let day_2month = new Date(year, 2, 0).getDate();
// alert(day_2month);
// if (day_2month == 29) {
//   alert(`${year}是闰年`)
// } else {
//   alert(`${year}是平年`);
// }

//方法二的原理是：
function getMonthDays(year, month) {
    var thisDate = new Date(year, month, 0);  //当天数为0 js自动处理为上一月的最后一天
    return thisDate.getDate();
}
console.log(getMonthDays(2019, 2));
