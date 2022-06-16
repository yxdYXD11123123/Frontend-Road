type Callback = () => void;

// 事件管理系统
export class Eventing {
  // 用于保存事件名称和对应的事件处理程序
  events: { [key: string]: Callback[] } = {};

  // 绑定事件
  on = (eventName: string, callback: Callback): void => {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  };

  // 事件触发器
  trigger = (eventName: string): void => {
    const handlers = this.events[eventName];
    if (!handlers || handlers.length === 0) return;
    handlers.forEach((callback) => callback());
  };
}
