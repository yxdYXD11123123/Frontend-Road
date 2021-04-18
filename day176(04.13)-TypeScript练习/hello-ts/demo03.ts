// 类型断言
let someValue: unknown = "10";

// 因为someValue类型未知，所以使用length属性时会报错
// let strLength: number = someValue.length;  // 报错

// 尖括号语法
let strLength: number = (<string>someValue).length;  // okay

// as语法
let strLength1: number = (someValue as string).length; // okay

console.log(strLength, strLength1);  // 2 2

