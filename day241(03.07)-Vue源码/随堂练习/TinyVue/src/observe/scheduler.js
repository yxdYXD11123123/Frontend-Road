import { nextTick } from "../utils";

// 存储 watcher
const queue = [];
// 存储 已有的 watcherId
let has = {};
// 表示 是否 队列中的 Watcher 是否在等待状态
let pending = false;

/**
 * 缓存 Watcher 队列
 * 用来优化减少更新次数
 * @param {*} watcher 组件的观察者
 */
export function queueWatcher(watcher) {
  // 避免添加重复的watcher
  if (!has[watcher.id]) {
    has[watcher.id] = true;
    queue.push(watcher);

    // 如果不在等待状态
    if (!pending) {
      // 开启等待状态
      pending = true;
      // 等主线程任务都执行完成， 将当前的组件统一更新，异步 宏任务 执行队列中的所有 Wacher
      // 添加一个异步微任务，等所有同步代码执行完成，一起更新
      nextTick(() => {
        // 去遍历 watcher 更新DOM
        queue.forEach((watcher) => watcher.run());
        // 更新完成后，
        // 恢复队列状态
        queue.length = 0;
        has = {};
        // 恢复 不在等待状态
        pending = false;
      });
    }
  }
}
