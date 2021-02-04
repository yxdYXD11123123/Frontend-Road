// 1. 定义一个人的对象, 属性有姓名，年龄，性别，身高，方法有：能吃饭，能跑步，

// - 要求分别使用 `4` 种方式创建下面要求的对象
// - 遍历对象，将对象的属性和值输出来，并且调用其中的一个方法，将结果在控制台输出
// - 将对象得 `年龄` 这个属性删除
// - 将对象的 `身高` 的值题换成"180cm"
// - 给对象添加属性 `学号` ，通过两种方式


// 字面量方式
let person1 = {
    name: 'dong',
    age: 22,
    gender: "男",
    height: 165,
    eat: function () {
        console.log("吃饭")
    },
    run: function () {
        console.log("跑步")
    }
}

// 系统构造函数
let person2 = new Object();
person2.name = "dong"
person2.age = 23
person2.gender = '男'
person2.height = 167;
person2.eat = function eat() {
    console.log("吃饭");
}
person2.run = function run() {
    console.log("跑步");
}

// 工厂构造函数
function creatPerson(name, age, gender, height, eat, run) {
    let person = new Object();
    person.name = name;
    person.age = age;
    person.gender = gender;
    person.height = height;
    person.eat = eat;
    person.run = run;
    return person;
}
let person3 = creatPerson("xu", 21, "男", 170, function eat() { console.log('吃饭'); }, function run() { console.log("跑步") })

// 自定义构造函数
function CreatPerson(name, age, gender, height, eat, run) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.height = height;
    this.eat = eat;
    this.run = run;
}
let person4 = new CreatPerson("xu", 21, "男", 171, function eat() { console.log('吃饭'); }, function run() { console.log("跑步") })


// 遍历对象，将对象的属性和值输出来，并且调用其中的一个方法，将结果在控制台输出
for (let key in person1) {
    console.log(key + " ------ " + person1[key]);
}
person3.eat();


// - 将对象得 `年龄` 这个属性删除
// - 将对象的 `身高` 的值题换成"180cm"
// - 给对象添加属性 `学号` ，通过两种方式
delete person1.age;
console.log(person1);

person1.height = "180cm"
console.log(person1);

person1.id = 01
person2["id"] = 02
console.log(person1, person2);

