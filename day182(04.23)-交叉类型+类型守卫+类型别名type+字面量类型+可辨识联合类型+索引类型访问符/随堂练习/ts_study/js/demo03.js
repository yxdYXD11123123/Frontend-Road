"use strict";
let p1 = {
    name: '',
    study() { }
};
let obj1 = {
    aaa: 'a',
    bbb: 1
};
let obj2 = {
    x: 1,
    y: '1'
};
let val = 1; // okay
/**
 * 没有被穷尽所有可能
 */
function noExhaust(x) {
    throw new Error('没有被穷尽所有可能');
}
function getArea(s) {
    switch (s.kind) {
        case "square":
            return s.size * s.size;
        case "rectangle":
            return s.width * s.height;
        case "circle":
            return Math.PI * s.radius ** 2; // ** 代表幂
        default:
            return noExhaust(s);
    }
}
let area = getArea({ kind: 'rectangle', width: 1, height: 2 });
console.log(area);
