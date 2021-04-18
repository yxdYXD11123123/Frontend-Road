"use strict";
class ClassOne {
    constructor(name) {
        this.name = name;
    }
    // 使用存取器
    get getName() {
        return this.name;
    }
    set setName(v) {
        this.name = v;
    }
}
let obj = new ClassOne("rank");
// 注意：使用get、set关键字后，用法不是调用方法的方式
// get时，直接使用 对象.get方法名
console.log(obj.getName); // rank
// set时，直接使用 对象.set方法名 = 新值
obj.setName = "dong";
console.log(obj.getName); // dong
