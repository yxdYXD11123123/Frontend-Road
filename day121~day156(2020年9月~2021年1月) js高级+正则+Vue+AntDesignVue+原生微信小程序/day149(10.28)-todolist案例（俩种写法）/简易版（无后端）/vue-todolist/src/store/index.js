// 引入vuex
import { createStore } from "vuex";
// 引入axios
import axios from "axios";

// 创建store并导出
export default createStore({
  state() {
    return {
      list: [],
      viewKey: "all"
    };
  },
  mutations: {
    initData(state, payload) {
      state.list = payload.data;
    },
    // 添加任务
    addTask(state, task) {
      state.list.push({
        id: +new Date(),
        info: task,
        done: false
      });
    },
    // 删除任务
    delTask(state, id) {
      let index = state.list.findIndex(ele => ele.id == id);
      state.list.splice(index, 1);
    },
    // 改变任务状态
    changeDone(state, peyload) {
      let index = state.list.findIndex(ele => ele.id == peyload.id);
      state.list[index].done = peyload.status;
    },
    // 清除已完成任务
    clearFinished(state) {
      state.list = state.list.filter(ele => ele.done == false);
    },
    // 切换按钮状态
    tabBtn(state, newViewKey) {
      state.viewKey = newViewKey;
    }
  },
  actions: {
    async getDatas(context) {
      let res = await axios.get("/list.json");
      context.commit("initData", res);
    }
  },
  getters: {
    surplus(state) {
      let data = state.list.filter(ele => ele.done == false);
      return data.length;
    },
    filterList(state) {
      if (state.viewKey == "all") {
        return state.list;
      }
      if (state.viewKey == "undone") {
        return state.list.filter(ele => ele.done == false);
      }
      if (state.viewKey == "done") {
        return state.list.filter(ele => ele.done);
      }
    }
  }
});
