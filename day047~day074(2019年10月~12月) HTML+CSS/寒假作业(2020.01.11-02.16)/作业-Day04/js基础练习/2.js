console.log(Number(""));  // 0 
console.log(Number("666"));  // 666
console.log(Number("88&"));  // NaN
console.log(Number(true));  // 1
console.log(Number(false));  // 0
console.log(Number(null));  // 0
console.log(Number(undefined));  // NaN
console.log(Number({}));  // NaN
console.log(Number({ name: "9", age: 9 }));  // NaN
console.log(Number([]));  // 0
console.log(Number([1]));  // 1
console.log(Number([1, 1]));  // NaN
console.log(Number([[]]));  // 0
console.log(Number([[1]]));  // 1





