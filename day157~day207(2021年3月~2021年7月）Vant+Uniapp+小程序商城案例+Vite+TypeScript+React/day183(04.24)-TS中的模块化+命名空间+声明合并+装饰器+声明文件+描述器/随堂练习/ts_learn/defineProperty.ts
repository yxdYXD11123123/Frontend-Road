// Object.defineProperty(obj, prop, descriptor)
// 作用：可以用来精确添加或修改对象的属性，只需要在descriptor对象中将属性特性描述清楚
// 数据描述符descriptor
// 有四个配置属性
// configurable: 数据是否可删除，可配置
// enumerable: 数据是否可枚举
// value: 属性值，默认为undefined
// writable: 属性是否可读写 


let o = { name: "zs" }
Object.defineProperty(o, "age", { value: 18, enumerable: true })
console.log(o); // { name: 'zs', age: 18 }
