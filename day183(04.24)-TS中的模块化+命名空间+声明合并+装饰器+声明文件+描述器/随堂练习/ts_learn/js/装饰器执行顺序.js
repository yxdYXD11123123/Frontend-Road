"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function decoratorA(constructor) {
    console.log("我是装饰器A");
}
function decoratorFactoryA() {
    console.log("我是装饰器工厂A");
    return function (constructor) {
        console.log("我是装饰器工厂A的装饰器");
    };
}
function decoratorFactoryB() {
    console.log("我是装饰器工厂B");
    return function (constructor) {
        console.log("我是装饰器工厂B的装饰器");
    };
}
function decoratorB(constructor) {
    console.log("我是装饰器B");
}
// 类声明前，绑定类装饰器
let Stuff = class Stuff {
};
Stuff = __decorate([
    decoratorA,
    decoratorFactoryA(),
    decoratorB,
    decoratorFactoryB()
], Stuff);
// 我是装饰器工厂A
// 我是装饰器工厂B
// 我是装饰器工厂B的装饰器
// 我是装饰器B
// 我是装饰器工厂A的装饰器
// 我是装饰器A
