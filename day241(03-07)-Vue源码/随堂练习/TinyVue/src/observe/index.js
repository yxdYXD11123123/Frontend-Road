import { isArray, isObject } from "../utils";
import { newPrototype } from "./array";
import { Dep } from "./dep";

// 劫持引用类型数据
export function observe(data) {
  // 只有引用数据类型需要劫持，因为只要劫持了所有引用类型，就劫持了全部数据
  if (!isObject(data)) return;
  // 避免重复劫持
  if (data.__ob__) return;
  return new Observer(data);
}

// 因为 类的扩展性比较好，我们又需要劫持对象和数组，所以我们使用类来做数据劫持
class Observer {
  constructor(data) {
    // 给 data 提供 类的劫持数组方法
    Object.defineProperty(data, "__ob__", {
      value: this,
      // 使用defineProperty添加 __ob__ 就是为了
      // 设为不可遍历属性，以防下面遍历对象劫持属性时，添加__ob__又，到这里出现死循环
      enumerable: false,
    });

    // 为所有引用类型的__ob__添加dep
    // 给 this 添加 dep
    // 然后 dep 就可以通过 this/__ob__ 来获取 ，进行添加依赖
    this.dep = new Dep();

    // 如果是数组
    if (isArray(data)) {
      // 修改原型链
      data.__proto__ = newPrototype;
      // 劫持数组每个元素，因为数组元素可能还是引用类型
      this.observeArray(data);
    } else {
      // 如果是对象，遍历劫持
      this.walk(data);
    }
  }
  // 劫持对象属性
  walk(data) {
    // 遍历对象
    Object.keys(data).forEach((key) => {
      // 劫持对象中的每个属性
      defineReactive(data, key, data[key]);
    });
  }
  // 劫持数组元素
  observeArray(data) {
    data.forEach((item) => {
      observe(item);
    });
  }
}

// 劫持每个对象的每个属性
function defineReactive(data, key, value) {
  // 继续劫持 属性值
  const childOb = observe(value);

  // 创建 dep 对象， 为每个对象中的属性添加dep
  let dep = new Dep();

  // 下面不使用 data[key] 而使用 value，是为了形成闭包，缓存value
  // 相当于在函数内部 let value = value;
  // 如果直接使用 data[key]，当我们修改值时，会造成死循环，因为会不断的触发set函数，所以利用闭包，使用缓存好的value
  Object.defineProperty(data, key, {
    get() {
      // 如果有target说明是 挂载时期，构建依赖关系
      if (Dep.target) {
        dep.depend();
        // 如果childOb有值，说明是引用类型
        if (childOb) {
          // 使用 dep.depend 构建与 引用类型的dep 和 watcher之间的依赖关系
          childOb.dep.depend();

          // 如果值为数组
          if (isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set(newValue) {
      // 新值也需要劫持
      observe(newValue);
      value = newValue;
      // 通知 watchers 观察者们 更新视图
      dep.notify();
    },
  });
}

/**
 * 如果值为数组，递归遍历数组，给多维数组中的深层数组 建立依赖关系
 * @param {Array} value
 */
function dependArray(value) {
  for (let i = 0; i < value.length; i++) {
    const current = value[i];
    // 如果是引用类型，就收集依赖
    current.__ob__ && current.__ob__.dep.depend();
    // 如果还是个数组
    if (isArray(current)) {
      // 递归 收集数组依赖。
      dependArray(current);
    }
  }
}
