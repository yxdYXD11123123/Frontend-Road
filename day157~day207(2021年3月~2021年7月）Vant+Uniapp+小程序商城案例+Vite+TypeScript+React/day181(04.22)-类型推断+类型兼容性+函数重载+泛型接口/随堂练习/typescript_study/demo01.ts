let value;
// 不会进行类型推断
value = 111;


// 会自动推断为字符串类型
let valus = "11";


// 接口
interface OneInterface {
  age: number
}

// 要求one满足OneInterface
let one: OneInterface;

let p1 = { age: 10 }
one = p1; // okay

let p2 = { name: "1", age: 10 };
one = p2; // okay  可多不可少，就可以兼容

let p3 = { name: "1" };
// one = p3; // 报错

// 递归检查
interface OneInterface2 {
  age: number;
  name: {
    firstName: string
  }
}

let one2: OneInterface2;

let p4 = {
  age: 99,
  name: {
    firstName: "Lin"
  }
}

one2 = p4; // okay 证明会递归

// 函数兼容性

// 参数个数
let fn1 = (x: number, y: number) => x;
let fn2 = (a: number) => a;

// fn2 = fn1;  // 报错：参数多的不能兼容给参数少的
fn1 = fn2;  // okay：说明参数少的可以兼容给参数多的  
// fn1 = (x:number) =>{} // okay

fn1(1, 1);

// 参数类型
let fn3 = (x: string, y: string): void => { };
// fn3 = fn1; // 类型不同不能兼容

let x = (a: string) => a;
let y = (a: number, b: string) => a;
// x = y; //Error
// y = x;  //OK

interface AInter {
  (a: number, b: string): void
}

let fn4: AInter = (a: number): void => { };


// 函数的双向协变

// 参数的双向协变
let fn5 = (x: number | string) => { };
let fn6 = (y: number): void => { };
fn6 = fn5; // okay
// fn5 = fn6; // 报错

// 返回值的双向协变
let fn7 = (x: boolean): (string | number) => x ? "aaa" : 123;
let fn8 = (x: boolean): string => "aaa";
fn7 = fn8; // okay
// fn8 = fn7; // 报错

// 函数重载
function add(paramA: number, paramB: number): void;
function add(paramC: number): void;

function add(paramAOrParamC: number, paramB?: number) {
  if (paramB) {
    console.log('我用了paramA和paramB');

  } else {
    console.log('我用了paramC');
  }
}


// 枚举兼容性

// 数字枚举
enum Gender {
  Male,
  Female
}
// 数字枚举和数值是兼容的
let val = Gender.Male;
val = 11;

// 字符串枚举和字符串 
enum EnumOne {
  One = "1",
  Two = "2"
}
// 字符串枚举和字符串不兼容
let str = EnumOne.One;
// str = "2"; // 报错

enum Gender2 {
  Male,
  Female
}
// 枚举与枚举之间不兼容
// Gender = Gender2;


// 类兼容性
class Person {
  private name = "a"
}
class Teacher {
  name = "b"
}

let person: Person;
// person = new Teacher(); // 报错


// 泛型接口
interface TypeInterface<T> {
  age: T
}


// class Father implements TypeInterface<number> {
//   age = 5
// }

// class Mother implements TypeInterface<string> {
//   age = "5"
// }

interface Empty<T> {
  data: T
}
let xxx: Empty<number> = { data: 1 };
let yyy: Empty<string> = { data: '1' };
let zzz: Empty<number> = { data: 2 };

xxx = zzz; // OK
// xxx = yyy;  // 报错
