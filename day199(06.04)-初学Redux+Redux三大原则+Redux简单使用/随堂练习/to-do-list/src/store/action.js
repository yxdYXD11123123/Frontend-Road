// 导入 action类型
import { ADD_TASK, DEL_TASK, TOGGLE_STATUS, TOGGLE_VIEWKEY } from "./constants";

// 创建actions

// 添加任务
export const addTaskAction = (task) => {
  return {
    type: ADD_TASK,
    task
  }
}
// 删除任务
export const delTaskAction = (id) => {
  return {
    type: DEL_TASK,
    id
  }
}
// 切换任务状态
export const toggleStatusAction = (id) => {
  return {
    type: TOGGLE_STATUS,
    id
  }
}
// 切换分类
export const toggleViewKeyAction = (viewKey) => {
  return {
    type: TOGGLE_VIEWKEY,
    viewKey
  }
}