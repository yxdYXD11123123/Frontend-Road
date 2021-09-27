// 导入
import { ADD_COUNT } from "./contants"
// 创建初始数据
const initialState = {
  count: 99
}

// 创建reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COUNT:
      return { ...state, count: ++state.count }
    default:
      return state;
  }
}

// 导出
export default reducer;