import { CHANGE_STATUS, ADD_MSG } from "./constants"
// 创建 action
// 修改状态
export const changeStatus = (id) => {
  return {
    type: CHANGE_STATUS,
    id
  }
}

// 添加信息
export const addMsg = (msg) => {
  return {
    type: ADD_MSG,
    msg
  }
}