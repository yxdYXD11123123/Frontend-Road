// Object.create()基于现有的原型创建新的原型对象
export const newPrototype = Object.create(Array.prototype);

// 重写数组变异方法
const methods = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
];

methods.forEach((method) => {
  newPrototype[method] = function (...args) {
    // 收集新增的数组元素
    let inserted = null;
    switch (method) {
      case "splice":
        inserted = args.slice(2);
        break;
      case "push":
      case "unshift":
        inserted = args;
        break;
    }

    // 劫持新增的元素
    if (inserted) {
      this.__ob__.observeArray(inserted);
    }

    // 实现原有功能（调用原方法）
    Array.prototype[method].call(this, ...args);

    // 通知 watcher 更新视图
    this.__ob__.dep.notify();
  };
});
