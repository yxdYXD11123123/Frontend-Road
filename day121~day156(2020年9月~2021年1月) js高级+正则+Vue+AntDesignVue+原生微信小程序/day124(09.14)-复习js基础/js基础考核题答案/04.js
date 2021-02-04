// 自定义构造函数，创建一个自己的信息，包含name,age,sex,hobbies(爱好,数组形式),say(方法,想说的一句话)

function myInfo(name, age, sex, hobbies) {
  this.name = name;
  this.age = age;
  this.sex = sex;
  this.hobbies = hobbies;
  this.say = function () {
    console.log("warframe天下第一");
  };
}
let result = new myInfo("罗志祥", 41, "男", "时间管理带师").say;
console.log(result);
