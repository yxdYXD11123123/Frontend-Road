// 1. 定义一个人的对象, 属性有姓名，年龄，性别，身高，方法有：能吃饭，能跑步，

// - 遍历对象，将对象的属性和值输出来，并且调用其中的一个方法，将结果在控制台输出
// - 将对象得`年龄`这个属性删除
// - 将对象的`身高`的值题换成"180cm"
// - 给对象添加属性`学号`，通过两种方式

let person = {
    name: "dong",
    age: 22,
    gender: 'man',
    height: 165,
    eat: function () {
        console.log("能吃饭");
    },
    run: function () {
        console.log("能跑步");
    }
}

// 遍历
for (let key in person) {
    console.log(key + "-" + person[key]);
}
person.eat();

//
delete person.age;

person.height = "180cm"

// person.studentId = 01;
person['studentId'] = 02

console.log(person);
