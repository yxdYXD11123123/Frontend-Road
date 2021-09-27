"use strict";
// ts 会按照类型规范，要求我们
let fn = (a, b) => {
    return a + b;
};
function doSome(x) {
    // console.log(x.substr(1)); // 报错：Property 'substr' does not exist on type 'number'.
    // 通过类型守卫，我们可以让ts推断出条件块中的变量类型
    if (typeof x === "string") {
        console.log(x.substr(1)); // okay
    }
    else {
        console.log(x.toFixed(2));
    }
}
function doSome2(x) {
    // console.log(x.substr(1)); // 报错：Property 'substr' does not exist on type 'number'.
    // 通过类型守卫，我们可以让ts推断出条件块中的变量类型
    if (typeof x === "string") {
        console.log(x.substr(1)); // okay
    }
    else {
        // 会推断为 never类型
        console.log(x);
    }
}
class Foo {
    constructor() {
        this.foo = 123;
    }
}
class Bar {
    constructor() {
        this.bar = 456;
    }
}
function doSomething(arg) {
    if (arg instanceof Foo) {
        console.log(arg.foo); // okay
        // console.log(arg.bar); 报错
    }
    else {
        console.log(arg.bar); // okay
    }
}
doSomething(new Foo());
doSomething(new Bar());
