import { CHANGE_NUM } from "./contants";

const initialState = {
  num: 108
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_NUM:
      return { ...state, num: action.num };
    default:
      return state;
  }
};

export default reducer;