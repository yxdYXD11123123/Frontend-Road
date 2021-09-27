import { GET_COUNT } from "./constants";
// 引入
import { call, put, takeEvery, all } from "redux-saga/effects";
import { addCount } from "./action";

// 返回 Promise 的函数 （模拟异步请求）
function request() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("666" + Math.random().toFixed(2))
    }, 1200);
  })
}

/**
 * 获取newCount的saga
 */
function* getNewCount() {
  // 异步请求 （sagaMiddleware的run方法，会先把 yield request()执行并拿到promise结果，然后才赋值给data ）
  const data = yield request(); // const data = 1 + 1
  // 或者 使用 call 方法 获取Promise结果
  // const data = yield call(request);

  // data已经有了数据
  // 同步触发action
  yield put(addCount(data));
}

// 导出 sagas
export function* mySaga() {
  // 一开始就会 执行 sagas
  console.log("helloSagas");
  // 一般在这里 返回所有 sagas 的 Effect 任务单元
  // 拦截 GET_COUNT action，执行 获取 newCount 的 saga
  yield all([takeEvery(GET_COUNT, getNewCount)])
}