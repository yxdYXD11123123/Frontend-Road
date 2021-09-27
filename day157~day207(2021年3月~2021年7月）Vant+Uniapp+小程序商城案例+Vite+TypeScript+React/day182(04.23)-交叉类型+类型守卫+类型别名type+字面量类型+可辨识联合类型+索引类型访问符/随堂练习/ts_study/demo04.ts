interface ManInterface {
  'name': string,
  'age': number
}

// 声明一个类型，但是类型值 是通过 索引类型访问操作符 获取的
type str = ManInterface["name"];
type valuesOfManInterface = ManInterface[keyof ManInterface];
// 相当于
// type str = string;

// 需求：获取指定对象，部分属性的值，放到数组中返回
/**
 * 
 * @param obj 指定对象
 * @param whichKeys 部分属性
 * @returns 部分属性的值
 */
function getValues<T, K extends keyof T>(obj: T, whichKeys: K[]) {
  // 声明values数组中的元素类型为 T[K]  使用[]访问T对象类型的K索引类型
  let values: T[K][] = [];
  whichKeys.forEach(val => {
    values.push(obj[val]);
  })
  // 这样的话，返回的数组才有元素类型
  return values;
}

let res = getValues({ name: "dong", age: 23 }, ['age', 'name']);
console.log(res); // [ 23, 'dong' ]


