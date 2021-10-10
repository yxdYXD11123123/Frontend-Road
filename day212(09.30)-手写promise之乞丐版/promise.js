const PENDING = 'PENDING' // 默认等待
const FULLFILLED = 'FULLFILLED' // 成功
const REJECT = 'FULLFILLED'  // 失败

class Promise {
  constructor(executor) {
    this.value = undefined;
    this.reason = undefined;
    this.status = PENDING;

    this.onResolveCallbacks = []; // 成功回调
    this.onRejectCallbacks = []; // 失败回调

    // 从 pending 变成 成功
    const resolve = (value) => {
      console.log('resolve');
      if (this.status === PENDING) {
        this.status = FULLFILLED;
        this.value = value;

        this.onResolveCallbacks.forEach(fn => fn())
      }
    }

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECT;
        this.reason = reason;

        this.onResolveCallbacks.forEach(fn => fn())
      }
    }

    executor(resolve, reject);
  }

  then(onResolve, onReject) {
    console.log('then');
    if (this.status === FULLFILLED) {
      onResolve(this.value)
    }
    else if (this.status === REJECT) {
      onReject(this.reason)
    }
    else if (this.status === PENDING) {
      this.onResolveCallbacks.push((() => {
        onResolve(this.value)
      }))
      this.onRejectCallbacks.push(() => {
        onReject(this.reason)
      })
    }
  }
}

module.exports = { Promise }