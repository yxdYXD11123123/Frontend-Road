type StringOrNumber = string | number;
let some: StringOrNumber = 1;


type TOneOfFn = (x: number) => number;
// let fn2: TOneOfFn = function (y:string) { return 1 }; // 报错
let fn2: TOneOfFn = function (y: number) { return y }; // okay

