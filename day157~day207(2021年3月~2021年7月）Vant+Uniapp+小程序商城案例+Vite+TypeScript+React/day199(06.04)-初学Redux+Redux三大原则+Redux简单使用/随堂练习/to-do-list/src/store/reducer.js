import { ADD_TASK, DEL_TASK, TOGGLE_STATUS, TOGGLE_VIEWKEY } from './constants'

// 初始化数据
const initState = {
  list: [
    {
      id: 1,
      info: "我周六去白盟物流园",
      status: false
    }
  ],
  viewKey: 'all'
}

// 创建reducer（初始化数据）
export default function reducer(state = initState, action) {
  switch (action.type) {
    // 添加任务
    case ADD_TASK:
      return { ...state, list: [...state.list, action.task] };
    // 删除任务
    case DEL_TASK:
      return { ...state, list: state.list.filter(val => val.id !== action.id) };
    // 切换任务状态
    case TOGGLE_STATUS:
      return {
        ...state, list: state.list.filter(val => {
          if (val.id === action.id) {
            val.status = !val.status;
          }
          return true;
        })
      }
    // 切换分类
    case TOGGLE_VIEWKEY:
      return { ...state, viewKey: action.viewKey }
    default:
      return state;
  }
}