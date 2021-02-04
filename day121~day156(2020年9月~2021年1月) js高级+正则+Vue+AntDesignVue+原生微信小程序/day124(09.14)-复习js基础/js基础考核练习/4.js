// 自定义构造函数，创建一个自己的信息，
// 包含name,age,sex,hobbies(爱好,数组形式),say(方法,想说的一句话)

function Student(name, age, sex, hobbies, say) {
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.hobbies = hobbies;
    this.say = say;
}

let me = new Student('dong', 22, '男', ['敲键盘', '敲代码'], function () {
    console.log('keep moving');
});

console.log(me);