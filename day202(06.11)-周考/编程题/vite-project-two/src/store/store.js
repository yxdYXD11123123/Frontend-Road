import { createStore, applyMiddleware } from "redux";
// 引入thunk
import thunk from "redux-thunk";

// 引入reducer
import reducer from "./reducer"
// 创建共享库 （应用thunk）
const store = createStore(reducer, applyMiddleware(thunk));

// 导出
export default store;