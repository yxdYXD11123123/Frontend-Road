import { createStore, applyMiddleware } from "redux";
// 引入 创建 saga 中间件的方法 
import createSagaMiddleware from "redux-saga";
// 引入 sagas 
import { mySaga } from "./sagas";

// 创建 saga 中间件
const sagaMiddleware = createSagaMiddleware();

import reducer from "./reducer";

// 应用 saga 中间件
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

// 执行 sagas (必须在创建store后，执行sagas)
sagaMiddleware.run(mySaga);

export default store;