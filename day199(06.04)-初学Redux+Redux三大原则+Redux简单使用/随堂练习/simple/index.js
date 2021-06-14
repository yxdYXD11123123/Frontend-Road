// 引入redux
const redux = require("redux");

// 创建初始化状态
const initialState = {
  count: 0,
  aaaa: 1
}

// 创建 action （修改数据）
const editCount = (newCount) => ({ type: "Edit_COUNT", count: newCount })


/**
 * 创建 reducer  串联 数据和action
 * reducer会在创建时，执行第一遍，初始化数据
 * @param {*} state 现在的数据状态
 * @param {*} action 
 * @returns 
 */
function reducer(state = initialState, action) {
  console.log("==============");
  console.log(state);
  switch (action.type) {
    // 匹配action类型
    case "Edit_COUNT":
      // 修改数据
      return { ...state, count: action.count };
    default:
      return state;
  }
}

// 创建store 
// 参数是固定的 reducer
const store = redux.createStore(reducer);


// 获取数据
// console.log(store.getState());  // { count: 0, aaaa: 1 }

// 修改数据
store.dispatch(editCount(2))
console.log(store.getState());  // { count: 2, aaaa: 1 }

// 监听数据（订阅：subscribe）
store.subscribe(() => {
  console.log("000000000000000");
})
