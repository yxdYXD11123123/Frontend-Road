import { createStore } from "redux";
// 导入
import reducer from "./reducer"
// 创建共享库
const store = createStore(reducer);

export default store;