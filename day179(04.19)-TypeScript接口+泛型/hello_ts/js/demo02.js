"use strict";
let specialCar = {
    color: '红色',
    run() { }
};
class Ben {
    constructor(color) {
        this.color = color;
    }
    run() {
        console.log("running");
    }
}
let ben = new Ben("蓝色");
console.log(ben); // Ben { color: '蓝色' }
ben.run();
