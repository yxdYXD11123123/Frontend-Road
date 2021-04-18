"use strict";
class Woman {
    constructor(name, sex, age) {
        // 只读属性
        this.hobby = ["篮球"];
        this.name = name;
        this.sex = sex;
        this.age = age;
    }
    printAge() {
        // 私有属性只能在 本类中使用
        console.log(this.age);
    }
}
// 继承 Man 类
class Actress extends Woman {
    constructor(name, sex, age) {
        super(name, sex, age);
    }
    act() {
        console.log("acting");
    }
    printInfo() {
        // 私有属性，在 派生类中不可访问
        // console.log(this.age);
        // 保护属性，在 派生类中可以访问
        console.log(this.sex);
    }
}
let actor = new Actress("frank", "女", 20);
// public属性，任意地方都可以直接访问
console.log(actor.name); // frank
// 私有属性 和 保护属性 在外界都不可以访问
// console.log(actor.age);
// console.log(actor.sex);
actor.printAge(); // 20 
actor.printInfo(); // 女
// readonly 
console.log(actor.hobby); // [ '篮球' ] 
// actor.hobby = ['1'] // 报错
