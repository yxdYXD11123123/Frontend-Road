import { createStore } from "redux";

// 引入reducer
import reducer from "./reducer"

// 创建共享库
const store = createStore(reducer);

// 导出
export default store;