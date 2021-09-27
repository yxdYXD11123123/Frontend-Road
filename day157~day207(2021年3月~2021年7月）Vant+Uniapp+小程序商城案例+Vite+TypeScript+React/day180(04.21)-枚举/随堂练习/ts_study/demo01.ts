type obj = {
  a: 1,
  b: '2'
}
type x = keyof obj;
let y = "a";


enum Gender {
  Male = "male",
  Female = "female"
}

console.log(Gender.Male); // male
// console.log(Gender['male']);  // 报错

enum enumOne {
  One = "one",
  Two = One
}

console.log(enumOne.One == enumOne.Two); // true

enum enumTwo {
  Male,
  Female
}

interface someInterface {
  gender: Gender.Female
}

class Some implements someInterface {
  gender: Gender.Female = Gender.Female
}

// 常量枚举，不会生成真实的对象
const enum Animal {
  Monkey,
  Bird
}

console.log(Animal.Monkey);  // 直接转换为 console.log(0)

const enum Food {
  Fruits,
  Meat
}

// Food 实际上是每个枚举成员并集的联合类型
let f: Food = Food.Fruits;
// 所以当我们指定了一个枚举为一个变量的类型时，那么这个变量的值只能是枚举成员之一
f = Food.Meat // okay
// f = Animal.Monkey; // 报错： 不能将类型“Animal.Monkey”分配给类型“Food”
