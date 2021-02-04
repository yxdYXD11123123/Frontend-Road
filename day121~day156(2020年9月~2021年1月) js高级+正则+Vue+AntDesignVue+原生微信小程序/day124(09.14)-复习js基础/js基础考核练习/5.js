//	输入一个年份判断是否是闰年
// (能被400整除 且 被4整除同时不能被100整除)

/**
 * 输入一个年份判断是否是闰年
 * @param {*} year 输入一个年份
 */
function isRun(year) {
    if (year % 400 == 0) {
        console.log(year + '是闰年');
    }
    else if (year % 100 != 0 && year % 4 == 0) {
        console.log(year + '是闰年');
    }
    else {
        console.log(year + '不是闰年');
    }
};

isRun(2200);

