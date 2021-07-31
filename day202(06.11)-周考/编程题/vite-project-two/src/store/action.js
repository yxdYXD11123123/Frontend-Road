import { CHANGE_GETTING, SET_NUM } from "./constants"

// 获取
export const getNum = async (dispatch) => {
  fetch("http://localhost:8080/getNum").then(function (res) {
    return res.json();
  }).then((res) => {
    dispatch(setNum(res.num));
    // 获取成功，修改状态
    dispatch(changeGetting(false))
  })
};

// 设置
export const setNum = (num) => {
  return {
    type: SET_NUM,
    num
  }
}

// 修改获取状态
export const changeGetting = (status) => {
  return {
    type: CHANGE_GETTING,
    status
  }
}