// redux共享库
import { createStore } from 'redux';
// 导入 reducer
import reducer from "./reducer"

export default createStore(reducer);