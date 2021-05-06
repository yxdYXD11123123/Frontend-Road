/**
 * 创建一个指定长度，用任意指定内容填充的数组
 * @param length 数组长度
 * @param value 指定内容
 * @returns Array 数组
 */
// 使用 T 指定 泛型占位符
let createArrayFn = <T>(length: number, value: T): T[] => {
  return new Array(length).fill(value);
}

let arr3 = createArrayFn<number>(4, 4);
// let res3 = arr3.map((val) => val.length); // 报错提示 val 是nubmer类型
let res3 = arr3.map((val) => val.toFixed());
console.log(res3); // [ '4', '4', '4', '4' ]



interface lengthInterface {
  length: number
}

// 使用接口 约束泛型 必须有length属性
function oneFn<T extends lengthInterface>(params: T) {
  return params;
}

// 指定只能指定有 length属性 的类型
console.log(oneFn<string>('3')); // 1


let getValue = <T, K extends keyof T>(obj: T, key: K) => {
  return obj[key];
}

getValue({ s: "S" }, "s")