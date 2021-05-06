/**
 * 创建一个指定长度，用任意指定内容填充的数组
 * @param length 数组长度
 * @param value 指定内容
 * @returns Array 数组
 */
let createArray = (length: number, value: unknown): any[] => {
  return new Array(length).fill(value);
}

let arr = createArray(3, "abc");
let res = arr.map((val) => val.length); // okay  [ 3, 3, 3 ]
// 但是
let arr2 = createArray(4, 4);
let res2 = arr2.map((val) => val.length); // [ undefined, undefined, undefined, undefined ]
// 明明getArray不能传入数字
