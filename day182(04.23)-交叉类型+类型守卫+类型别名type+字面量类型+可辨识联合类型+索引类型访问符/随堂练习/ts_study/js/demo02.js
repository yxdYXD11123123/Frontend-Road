"use strict";
class Pig {
    constructor() {
        this.name = 'pig';
    }
}
class Animal {
}
class Dog extends Animal {
    constructor() {
        super();
        this.age = 18;
    }
}
let newAnimal = new Animal();
let newDog = new Dog();
console.log(newAnimal instanceof Animal); // true
console.log(newDog instanceof Animal); // true
console.log(newAnimal instanceof Dog); // false
function fn() {
    // 生成随机数
    let r = Math.random();
    // 随机结果
    let res = r > 0.5 ? new Dog() : new Pig();
    // 使用 instanceof 守卫
    if (res instanceof Dog) {
        return res.age;
    }
    else { // 不是Dog就一定是Pig
        return res.name;
    }
}
console.log(fn());
