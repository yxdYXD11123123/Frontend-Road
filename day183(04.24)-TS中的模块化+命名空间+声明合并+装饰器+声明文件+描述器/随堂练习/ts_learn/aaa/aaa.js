"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Object.defineProperty(obj, prop, descriptor)
// 作用：可以用来精确添加或修改对象的属性，只需要在descriptor对象中将属性特性描述清楚
// 数据描述符descriptor
// 有四个配置属性
// configurable: 数据是否可删除，可配置
// enumerable: 数据是否可枚举
// value: 属性值，默认为undefined
// writable: 属性是否可读写 
let o = { name: "zs" };
Object.defineProperty(o, "age", { value: 18, enumerable: true });
console.log(o); // { name: 'zs', age: 18 }
// export const exportOne: string = "导出数据";
// export function exportFn() {
//   console.log(111);
// }
System.register("demo01", [], function (exports_1, context_1) {
    "use strict";
    var exportOne, exportTwo;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exportOne = "One";
            exports_1("exportOne", exportOne);
            exportTwo = "Two";
            exports_1("exportTwo", exportTwo);
        }
    };
});
System.register("demo02", ["demo01"], function (exports_2, context_2) {
    "use strict";
    var demo01_1;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (demo01_1_1) {
                demo01_1 = demo01_1_1;
            }
        ],
        execute: function () {
            // console.log(exportOne);
            console.log(demo01_1.exportOne);
        }
    };
});
var XSpace;
(function (XSpace) {
    function fn() {
        return 666;
    }
    XSpace.fn = fn;
})(XSpace || (XSpace = {}));
/// <reference path="./aaa/aaa.ts"/>
console.log(spaceOne.fn);
// console.log(spaceOne.fn);
class Cat {
    // 检测参数是否符合规则
    run(name, age) {
        console.log(name + "is" + age);
    }
}
var spaceTwo;
(function (spaceTwo) {
    let a;
    // 命名空间导出数据后
    spaceTwo.params = "s";
})(spaceTwo || (spaceTwo = {}));
(function (spaceTwo) {
    let a;
    // 其他同名命名空间可以直接使用 上面数据 params
    function fn() {
        console.log(spaceTwo.params);
    }
    spaceTwo.fn = fn;
})(spaceTwo || (spaceTwo = {}));
spaceTwo.fn(); // s
function SpaceAndFn() {
    console.log(1);
}
// 命名空间声明不能位于与之合并的类或函数前
(function (SpaceAndFn) {
    SpaceAndFn.value = "值";
})(SpaceAndFn || (SpaceAndFn = {}));
SpaceAndFn(); // 1 
console.log(SpaceAndFn.value); // 值
var SpaceAndEnum;
(function (SpaceAndEnum) {
    SpaceAndEnum.value = "Enum";
})(SpaceAndEnum || (SpaceAndEnum = {}));
(function (SpaceAndEnum) {
    SpaceAndEnum[SpaceAndEnum["One"] = 0] = "One";
    SpaceAndEnum[SpaceAndEnum["Two"] = 1] = "Two";
})(SpaceAndEnum || (SpaceAndEnum = {}));
// 既可以当枚举使用，也可以当命名空间使用
console.log(SpaceAndEnum.value); // Enum
let num = SpaceAndEnum.One;
console.log(num); // 0 
var SapceAndInterface;
(function (SapceAndInterface) {
    SapceAndInterface.fn = () => {
        console.log("fn");
    };
})(SapceAndInterface || (SapceAndInterface = {}));
// 既可以当接口使用，又可以当命名空间使用
let obj = {
    self: 'self',
    ss: 's'
};
SapceAndInterface.fn();
class SpaceAndClass {
}
// 命名空间声明不能位于与之合并的类或函数前
(function (SpaceAndClass) {
    SpaceAndClass.some = "some";
})(SpaceAndClass || (SpaceAndClass = {}));
let s = new SpaceAndClass();
console.log(SpaceAndClass.some);
var spaceOne;
(function (spaceOne) {
    let a = "2";
    const b = 1;
    // 导出之后
    function fn() {
        console.log("我是spaceOne的fn");
    }
    spaceOne.fn = fn;
})(spaceOne || (spaceOne = {}));
// spaceOne.a // 报错
// 外界才可以访问到
spaceOne.fn();
function propsDecorator(target, propertyKey) {
    console.log(target); // 实例对象
    console.log(propertyKey);
    target[propertyKey] = 'xxx';
}
class Dog {
    constructor(kind) {
        this.kind = '111';
        if (kind)
            this.kind = kind;
    }
}
__decorate([
    propsDecorator
], Dog.prototype, "kind", void 0);
let dog = new Dog();
console.log(dog);
function decoratorFn(target, propertyKey, descriptor) {
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);
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
    decoratorFn
], People.prototype, "fnOne", null);
__decorate([
    decoratorFn
], People, "fnTwo", null);
/**
 * 装饰器函数
 * @param target 默认唯一的参数target就是被修饰的类
 * @returns 如果返回新的类，会替换原有的类（注意：新的类必须实现原有类的东西）
 */
function decoratorOne(target) {
    // 可以在这里操作类
    console.log(target.prototype.aa == 1);
    // 也可以返回一个新的类，替换原来的类
    return class NewClass {
        constructor() {
            // 必须实现原有类的age属性
            this.age = 1;
            this.name = "添加一些东西";
        }
    };
}
// 类声明前，绑定类装饰器
let Class = class Class {
    constructor(age) {
        this.age = age;
    }
};
Class = __decorate([
    decoratorOne
], Class);
console.log(new Class(11));
function getterDecorator(value) {
    return function (target, propertyKey, descriptor) {
        // console.log(target);
        console.log(propertyKey);
        console.log(descriptor); // 访问器装饰器和方法装饰器的区别关键就在 descriptor 的四个属性不一样，这里拿到的是get\set
        descriptor.get = function () {
            return descriptor.value + value;
        };
    };
}
class Person {
    constructor(name) {
        this.name = name;
    }
    get _name() {
        return this.name;
    }
    set _name(v) {
        this.name = v;
    }
}
__decorate([
    getterDecorator('zzz')
], Person.prototype, "_name", null);
let zs = new Person("zs");
console.log(zs._name);
System.register("\u9ED8\u8BA4\u5BFC\u51FA", [], function (exports_3, context_3) {
    "use strict";
    var exportThree, exportFour;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            exportThree = "111";
            exportFour = 111;
            exports_3("default", {
                exportFour,
                exportThree
            });
        }
    };
});
System.register("\u9ED8\u8BA4\u5BFC\u5165", ["\u9ED8\u8BA4\u5BFC\u51FA"], function (exports_4, context_4) {
    "use strict";
    var ____1;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (____1_1) {
                ____1 = ____1_1;
            }
        ],
        execute: function () {
            console.log(____1.default.exportFour);
        }
    };
});
