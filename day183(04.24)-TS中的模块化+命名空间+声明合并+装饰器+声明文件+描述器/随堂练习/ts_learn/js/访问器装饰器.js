"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 声明 装饰器工厂 （可以自定义参数）
function getterDecorator(value) {
    // 返回装饰器
    return function (target, propertyKey, descriptor) {
        console.log(target); // 实例
        console.log(propertyKey); // 访问器名
        console.log(descriptor); // 注意：这里拿到的是get\set，而不是value\writable, 所以拿不到value值
        // 替换原有的getter和setter
        descriptor.get = function () {
            return this.value + value;
        };
        descriptor.set = function (val) {
            console.log(`在设置${propertyKey}值`);
            this.value = val;
        };
    };
}
class Person {
    constructor(name) {
        this.name = name;
    }
    // 使用装饰器工厂（传入参数）
    get _name() {
        return this.name;
    }
    set _name(v) {
        this.name = v;
    }
}
__decorate([
    getterDecorator('-----装饰器添加的内容')
], Person.prototype, "_name", null);
let zs = new Person("zs");
// 因为descriptor中拿不到value值，所以第一次是undefined
console.log(zs._name); // undefined-----装饰器添加的内容 （获取值时触发了 替换后的getter）
zs._name = '新名字'; // 在设置_name值 （修改值时触发了 替换后的setter）
console.log(zs._name); // 新名字-----装饰器添加的内容
