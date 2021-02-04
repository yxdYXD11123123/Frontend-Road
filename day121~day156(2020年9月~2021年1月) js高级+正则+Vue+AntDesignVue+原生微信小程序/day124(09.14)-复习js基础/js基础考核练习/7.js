// 根据当前时间编写一个函数，做出相应问候语：
// 早上8点~12点 “早上好，欢迎登陆系统”
// 中午 12点~14点 “中午好，该休息了”
// 下午14点~18点 “下午好！欢迎登录系统”
// 晚上19点~0点 “晚上好，该休息了”

function greeting() {
    let hour = new Date().getHours();
    if (hour >= 8 && hour < 12) {
        console.log('早上好，欢迎登陆系统');
    }
    else if (hour >= 12 && hour < 14) {
        console.log('中午好，该休息了');
    }
    else if (hour >= 14 && hour <= 18) {
        console.log('下午好！欢迎登录系统');
    }
    else if (hour >= 19 && hour < 24) {
        console.log('晚上好，该休息了');
    }
    else {
        console.log('凌晨');
    }
}

greeting();