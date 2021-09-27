"use strict";
let getNewObject = (target, source) => {
    return Object.assign(target, source);
};
console.log(getNewObject({ a: 1 }, { b: '2' }));
