"use strict";
class Person {
    // 构造方法
    constructor(name) {
        // 初始化属性值（必须）
        this.name = name;
    }
    // 方法
    study(hours) {
        console.log("学习了" + hours + "个小时");
    }
}
let pdd = new Person("PDD");
console.log(pdd.name); // PDD
pdd.study(3); // 学习了3个小时
