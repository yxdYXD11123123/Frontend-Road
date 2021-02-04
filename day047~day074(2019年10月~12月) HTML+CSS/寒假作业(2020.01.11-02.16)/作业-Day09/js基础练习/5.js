// 获取当前时间，判断今年是否为闰年(判断今年是否为闰年；  能被400整除 或 被4整除但不能被100整除)


let myDate = new Date();
let year = myDate.getFullYear();
if (year % 400 == 0 || year % 4 == 0 && year % 100 != 0) {
    console.log('今年是闰年');
}
else (
    console.log("今年不是闰年")
)
