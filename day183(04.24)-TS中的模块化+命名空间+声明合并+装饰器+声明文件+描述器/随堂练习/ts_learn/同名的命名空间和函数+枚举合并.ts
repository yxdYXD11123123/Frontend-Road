function SpaceAndFn() {
  console.log(1);
}
// 命名空间声明不能位于与之合并的类或函数前
namespace SpaceAndFn {
  export let value = "值";
}

SpaceAndFn(); // 1 
console.log(SpaceAndFn.value); // 值




namespace SpaceAndEnum {
  export let value = "Enum"
}

enum SpaceAndEnum {
  One,
  Two
}
// 既可以当枚举使用，也可以当命名空间使用
console.log(SpaceAndEnum.value); // Enum
let num: SpaceAndEnum = SpaceAndEnum.One;
console.log(num); // 0 

// let num2: SpaceAndEnum = SpaceAndEnum.value; // 而且不会把value当作枚举成员


interface SapceAndInterface {
  self: string
}
interface SapceAndInterface {
  ss: string
}

namespace SapceAndInterface {
  export let fn = () => {
    console.log("fn");
  };
}


// 既可以当接口使用，又可以当命名空间使用
let obj: SapceAndInterface = {
  self: 'self',
  ss: 's'
}
SapceAndInterface.fn()


class SpaceAndClass { }
// 命名空间声明不能位于与之合并的类或函数前
namespace SpaceAndClass {
  export let some = "some";
}

let s = new SpaceAndClass();
console.log(SpaceAndClass.some);

