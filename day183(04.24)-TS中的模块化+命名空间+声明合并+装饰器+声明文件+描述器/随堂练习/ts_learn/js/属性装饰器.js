"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function propsDecorator(target, propertyKey) {
    console.log(target); // 实例
    console.log(propertyKey); // color
    // 给实例上添加属性
    target.newProps = 'newProps';
}
function staticPropsDecorator(target, propertyKey) {
    console.log(target); // 类
    console.log(propertyKey); // belong
    // 给类上添加属性
    target.newStaticProps = 'newStaticProps';
}
class Dog {
    constructor() {
        // 装饰一个动态属性
        this.color = "red";
    }
}
// 装饰一个静态属性
Dog.belong = '动物';
__decorate([
    propsDecorator
], Dog.prototype, "color", void 0);
__decorate([
    staticPropsDecorator
], Dog, "belong", void 0);
let dog = new Dog();
// console.log(dog.newProps); // newProps
// console.log(Dog.newStaticProps); // newStaticProps
