import { ADD_MSG, CHANGE_STATUS } from "./constants"

// 创建初始数据
const initialState = {
  // 信息列表
  msgList: [
    {
      id: 1,
      updateTime: new Date(),
      msg: "默认信息 first",
      status: false,
    }
  ]
}

// 创建renducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 标记已读，修改状态
    case CHANGE_STATUS:
      return {
        ...state, msgList: state.msgList.filter(val => {
          if (val.id === action.id) {
            // 标记已读
            val.status = true;
            // 更新时间
            val.updateTime = new Date()
          }
          return true;
        })
      }
    // 添加信息
    case ADD_MSG:
      return {
        ...state, msgList: [...state.msgList, {
          id: new Date(),
          updateTime: new Date(),
          msg: action.msg,
          status: false
        }]
      }

    default:
      return state;
  }
}

// 导出
export default reducer;