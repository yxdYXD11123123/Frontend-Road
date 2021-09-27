import { SET_CURAREA } from "./constants"

// 初始数据
const initialState = {
  // 当前地区信息
  curArea: {
    name: "上海",
    value: null
  }
}


// 创建 reducer 并导出
export default function reducer(state = initialState, action) {
  switch (action.type) {
    // 设置当前地区信息
    case SET_CURAREA:
      return Object.assign({}, state, {
        curArea: action.curArea
      });
    default:
      return state;
  }
}
