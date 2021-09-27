"use strict";
// 定义一个抽象类（特殊的基类）
class SpeicalFather {
    constructor(name) {
        this.name = name;
    }
}
// 继承一个抽象类
class Son extends SpeicalFather {
    constructor(name) {
        super(name);
    }
    // makeMoney必须实现，不然报错
    makeMoney() {
        console.log("抽象基类要求我必须实现此方法");
    }
}
let richSon = new Son('frank');
console.log(richSon); // Son { name: 'frank' }
richSon.makeMoney(); // 抽象基类要求我必须实现此方法
