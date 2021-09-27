import { createStore } from "redux";
// 导入reducer
import reducer from "./reducer"
// 创建共享库导出
const store = createStore(reducer);

export default store;