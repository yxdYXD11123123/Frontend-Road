"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * 方法装饰器
 * @param target 类 或者 实例
 * @param propertyKey 被绑定方法的名字
 * @param descriptor 被绑定方法的属性描述符
 */
function decoratorFn(target, propertyKey, descriptor) {
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);
    // 使用描述符 替换原来的方法
    descriptor.value = function () {
        console.log("我是被篡改的方法");
    };
}
class People {
    fnOne() {
        console.log("我是fnOne");
    }
    static fnTwo() {
        console.log("我是fnTwo");
    }
}
__decorate([
    decoratorFn // 对于动态方法，target就是对象
], People.prototype, "fnOne", null);
__decorate([
    decoratorFn // 对于静态方法，target就是类
], People, "fnTwo", null);
People.fnTwo(); // 我是被篡改的方法
new People().fnOne(); // 我是被篡改的方法
