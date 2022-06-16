class Boat {
  @logError2("pilot发生错误")
  pilot() {
    console.log("pilot");
    throw new Error("发生了错误");
  }
}

/**
 * @param target 构造函数
 * @param key 目标方法名
 * @param desc
 */
function logError(target: any, key: string, desc: PropertyDescriptor) {
  const method = desc.value;
  // 重写方法
  desc.value = function () {
    try {
      method();
    } catch (e) {
      console.log(key + "方法调用时，发生了错误");
    }
  };
}

/**
 * @param target 构造函数
 * @param key 目标方法名
 * @param desc
 */
function logError2(errMsg: string) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    const method = desc.value;
    // 重写方法
    desc.value = function () {
      try {
        method();
      } catch (e) {
        console.log(errMsg);
      }
    };
  };
}

const boat = new Boat();
boat.pilot();
