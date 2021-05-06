"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * 参数装饰器
 * @param target 实例或类
 * @param propertyKey 参数所在的方法 方法名
 * @param parameterIndex 参数在参数列表中的索引位置
 */
function paramsDecorator(target, propertyKey, parameterIndex) {
    console.log(target); // 实例 或 类
    console.log(propertyKey); // run
    console.log(parameterIndex); // 1 
}
class Cat {
    // 给参数绑定装饰器
    static run(name, age) {
        console.log(name + "is" + age);
    }
}
__decorate([
    __param(1, paramsDecorator)
], Cat, "run", null);
