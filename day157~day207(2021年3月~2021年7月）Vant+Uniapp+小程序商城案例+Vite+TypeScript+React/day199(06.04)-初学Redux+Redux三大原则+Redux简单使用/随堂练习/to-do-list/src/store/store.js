import { createStore } from "redux";
// 导入 reducer
import reducer from "./reducer"
// 创建 共享库
const store = createStore(reducer);

// 导出
export default store;