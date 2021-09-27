// 布尔
let flag: Boolean = true;
// 数字
let num: Number = 10;
let num1: Number = 0b10001; // 二进制
let num2: Number = 0x001; // 16进制

// 字符串
let str: String = "abcd";
// 可以使用模板字符串
let str2: String = `${str}+abcd`

// 数组
// 方式一：在元素类型后面接上 []
// 表示由此类型元素组成的一个数组
let arr: Number[] = [1, 2, 3];
// 方式二：使用数组泛型, Array<元素类型>
let arr1: Array<String> = ['1', '2', '3'];


// 元组 Tuple
// 正确
let tuple: [String, Number] = ['100', 11];

// 错误
// let tuple2: [String, Number] = [100, '11'];

// 枚举
enum Color { Red, Green, Blue };
console.log(Color.Red); // 0  默认是从 0 开始
console.log(Color[0]); // Red

// 或者，我们可以手动改成从 2 开始编号
enum Colors { Red = 2, Green, Blue };
console.log(Colors.Green); // 3

// 也可以全部手动赋值
console.log(Colors);
// {2: "Red", 3: "Green", 4: "Blue", Red: 2, Green: 3, Blue: 4}


// Any
let notSure: any = 4;
console.log(notSure.toFixed(2));

notSure = "true";
console.log(notSure.indexOf("r"));

// 数组里使用
let list: any[] = [1, true, "free"];
console.log(list);

// void
function fn1(): void {
  // 只能return undefined 和 null
  return undefined;
}

// Null 和 Undefined
let u: undefined = undefined;
let n: null = null;

// Never
let nev: never;
// 遇到一个联合类型时
// 可以使用 never 收窄类型

// Object

