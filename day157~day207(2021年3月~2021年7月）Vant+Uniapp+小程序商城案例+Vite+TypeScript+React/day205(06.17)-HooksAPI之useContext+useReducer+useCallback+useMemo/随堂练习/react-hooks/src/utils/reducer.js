// 创建 计算reducer
export const calcReducer = (state, action) => {
  // 注意：这个reducer和 redux的reducer不同的是，
  //      这个reducer初始化时是不会执行的
  switch (action.type) {
    case "ADD":
      // 返回值会给到对应的变量
      return state + 1;

    case "MINUS":
      return state - 1;

    default:
      throw new Error("没有匹配action.type")
  }
}