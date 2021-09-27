"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * 装饰器函数
 * @param target 默认唯一的参数target就是被修饰的类
 * @returns 如果返回新的类，会替换原有的类（注意：新的类必须实现原有类的东西）
 */
function decoratorOne(constructor) {
    // 可以在这里操作类
    // 给 类 添加 静态属性或方法
    constructor.some = "some";
    constructor.what = "which";
    // 也可以添加 动态属性或方法
    constructor.prototype.age = 'red';
    console.log(constructor);
    // 也可以返回一个新的类，替换原来的类
    // return class NewClass {
    //   // 必须实现原有类的age属性
    //   age = 1;
    //   name = "添加一些东西"
    // }
}
// 类声明前，绑定类装饰器
let Class = class Class {
    constructor(age) {
        this.age = age;
    }
};
Class.what = "what";
Class = __decorate([
    decoratorOne
], Class);
console.log(new Class(0)); // NewClass {age: 1, name: "添加一些东西"}
// console.log(Class.some);
