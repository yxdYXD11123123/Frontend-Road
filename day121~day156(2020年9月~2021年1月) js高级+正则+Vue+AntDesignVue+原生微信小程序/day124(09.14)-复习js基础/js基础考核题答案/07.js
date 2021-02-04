/**
 * 根据当前时间编写一个函数，做出相应问候语：
 *早上 等于8点~小于12点 “早上好，欢迎登陆系统”
 *中午 等于12点~小于14点 “中午好，该休息了”
 *下午 等于14点~小于18点 “下午好！欢迎登录系统”
 *晚上 等于18点~小于0点 “晚上好，该休息了”
 */

function getNow() {
  let date = new Date();
  // 得到时间
  let hours = date.getHours();
  // 测试代码
  // hours = 20;
  if (hours >= 8 && hours < 12) {
    return "早上好，欢迎登陆系统";
  } else if (hours >= 12 && hours < 14) {
    return "中午好，该休息了";
  } else if (hours >= 14 && hours < 18) {
    return "下午好！欢迎登录系统";
  } else if (hours >= 18 && hours < 24) {
    return "晚上好，该休息了";
  } else {
    // 0到8点
    return "该猝死了";
  }
}
let result = getNow();
console.log(result);
