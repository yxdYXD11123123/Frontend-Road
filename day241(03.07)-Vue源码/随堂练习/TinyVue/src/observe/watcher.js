import { Dep } from "./dep";
import { queueWatcher } from "./scheduler";

let id = 0;

// 每个组件对应的Watcher
export class Watcher {
  constructor(updateComponent) {
    // 获取更新组件函数
    this.updateComponent = updateComponent;
    // 用来收集依赖
    this.deps = [];
    this.depsId = new Set();
    this.id = id++;
    this.initial();
  }
  // 初始化
  initial() {
    // 给Dep添加静态属性 target 指向 this， 方便 在 dep 中获取 watcher
    Dep.target = this;
    this.updateComponent();
    // 在组件渲染完成后，清理Dep的指向，因为只在挂载时收集依赖，之后更新时不需要每次收集
    Dep.target = null;
  }

  // 添加 deps 依赖
  addDep(dep) {
    // 如果当前deps没有被收集，再进行收集
    if (!this.depsId.has(dep.id)) {
      this.deps.push(dep);
      this.depsId.add(dep.id);
      // 每当添加 dep 时， 让 dep 反向收集 watcher
      dep.addSub(this);
    }
  }

  // 更新视图
  update() {
    // 这里不要直接调用重新渲染，使用queueWatcher来管理Watcher
    // 将 Watcher 放到 queueWatcher 队列中，等待执行
    // this.updateComponent();
    queueWatcher(this);
  }

  run() {
    this.updateComponent();
  }
}
