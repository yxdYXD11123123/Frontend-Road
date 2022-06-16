let id = 0;

// Dep 可以理解为 watcher收集器，要通过 dep 通知 watcher 更新视图
export class Dep {
  constructor() {
    // 用来存储 watcher
    this.subs = [];
    // 添加id，帮助 我们避免对同一数据依赖进行重复收集
    this.id = id++;
  }

  // 依赖 watcher
  depend() {
    // 让 watcher 收集 dep
    Dep.target.addDep(this);
  }

  // 添加 sub ，添加 watcher
  addSub(watcher) {
    this.subs.push(watcher);
  }

  // 通知 watcher 更新视图
  notify() {
    this.subs.forEach((watcher) => watcher.update());
  }
}
