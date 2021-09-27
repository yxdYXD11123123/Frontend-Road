import { CHANGE_GETTING, SET_NUM } from "./constants";

const initialState = {
  // 正在获取
  getting: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NUM:
      return { ...state, num: action.num };
    case CHANGE_GETTING:
      return { ...state, getting: action.status }

    default:
      return state;
  }
}

export default reducer;