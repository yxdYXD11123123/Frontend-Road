"use strict";
class Man {
    constructor(name) {
        this.name = name;
    }
}
// 继承 Man 类
class Player extends Man {
    constructor(name, age) {
        // 派生类的构造函数必须包含 "super" 调用 (也就是只要有继承，constructor中必须有super)
        super(name); // 相当于 在调用 基类： Man类的constructor函数 (constructor Man(name: string): Man)
        this.age = age;
    }
    play() {
        console.log("playing");
    }
}
let playerOne = new Player("frank", 20);
console.log(playerOne.name); // frank
