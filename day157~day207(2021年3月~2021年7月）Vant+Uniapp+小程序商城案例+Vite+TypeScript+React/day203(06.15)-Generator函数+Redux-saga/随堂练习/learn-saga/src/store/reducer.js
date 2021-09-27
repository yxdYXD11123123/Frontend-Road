import { ADD_COUNT } from "./constants";

const initialState = {
  count: 1
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COUNT:
      return { ...state, count: action.newCount }

    default:
      return state;
  }
}

export default reducer;