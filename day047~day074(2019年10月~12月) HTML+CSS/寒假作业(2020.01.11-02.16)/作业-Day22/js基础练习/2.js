// 编写function parseDatetime(var datetime)方法
// 功能描述：传入参数的日期对象与当前日期比较：

// - 参数日期比当前日期大，返回”日期不符合要求”。
// - 参数日期比当前日期小，范围小于1分钟：返回“刚刚”；
// - 参数日期比当前日期小，差值范围大于等于1分钟：返回“x分钟之前”；x代表分钟数，
// - 参数日期比当前日期小，差值范围大于等于1小时：返回“x小时之前”；x代表小时数，
// - 参数日期比当前日期小，差值范围大于等于1天：返回“x天之前”；
// - 参数日期比当前日期小，差值范围大于等于7天：返回“x周之前”；
// - 参数日期比当前日期小，差值范围大于等于30天：返回“x月之前”；
// - 参数日期比当前日期小，差值范围大于等于365天：返回“很久之前”。


function parseDatetime(datetime) {
    let getdate = new Date(datetime)
    let nowdate = new Date();
    if (getdate.valueOf() > new Date()) {
        return "日期不符合要求"
    }
    else {
        if (nowdate.valueOf() - getdate.valueOf() > (365 * 24 * 60 * 60 * 1000)) {
            return "很久之前"
        }
        else if (nowdate.valueOf() - getdate.valueOf() > (30 * 24 * 60 * 60 * 1000)) {
            let differ = (nowdate.valueOf() - getdate.valueOf()) / (30 * 24 * 60 * 60 * 1000)
            return `${parseInt(differ)}月之前`
        }
        else if (nowdate.valueOf() - getdate.valueOf() > (7 * 24 * 60 * 60 * 1000)) {
            let differ = (nowdate.valueOf() - getdate.valueOf()) / (7 * 24 * 60 * 60 * 1000)
            return `${parseInt(differ)}周之前`
        }
        else if (nowdate.valueOf() - getdate.valueOf() > (24 * 60 * 60 * 1000)) {
            let differ = (nowdate.valueOf() - getdate.valueOf()) / (24 * 60 * 60 * 1000)
            return `${parseInt(differ)}天之前`
        }
        else if (nowdate.valueOf() - getdate.valueOf() > (60 * 60 * 1000)) {
            let differ = (nowdate.valueOf() - getdate.valueOf()) / (60 * 60 * 1000)
            return `${parseInt(differ)}小时之前`
        }
        else if (nowdate.valueOf() - getdate.valueOf() > (60 * 1000)) {
            let differ = (nowdate.valueOf() - getdate.valueOf()) / (60 * 1000)
            return `${parseInt(differ)}分钟之前`
        }
        else if (nowdate.valueOf() - getdate.valueOf() > (1000)) {
            return "刚刚"
        }
    }


}
console.log(parseDatetime("2020-02-29 18:04:00"));
