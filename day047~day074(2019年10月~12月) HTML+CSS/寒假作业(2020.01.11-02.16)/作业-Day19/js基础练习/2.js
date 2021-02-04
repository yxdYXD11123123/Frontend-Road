// 2. 定义一个车的对象，属性有颜色，大小，型号，方法有：能行驶

// - 获取对象的`颜色`，在控制台输出
// - 调用方法，在控制台输出格式要求`马路上正在行驶的是一辆xx色的xx型号的车`

let car = {
    color: "red",
    size: "normal",
    style: "中",
    drive: function () {
        console.log(`马路上正在行驶的是一辆${this.color}色的${this.style}型号的车`);
    }
}

console.log(car.color);

car.drive();

