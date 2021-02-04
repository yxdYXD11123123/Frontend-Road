import { createStore } from "vuex";

import axios from 'axios';
// 配置
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default createStore({
  state() {
    return {
      list: []
    }
  },
  mutations: {
    // 获取更新数据
    getList(state, payload) {
      state.list = payload;
    }
  },
  actions: {
    // 获取全部任务
    async getList(context) {
      let res = await axios.get('/getList');
      if (res.data.code == 200) {
        context.commit('getList', res.data.data);
      }
    },
    // 添加任务
    async addTask(context, task) {
      let res = await axios.post('/addTask', {
        task
      });
      if (res.data.code == 200) {
        context.dispatch('getList');
      }
    },
    // 删除任务
    async delTask(context, id) {
      let res = await axios.post('/delTask', { id });
      if (res.data.code == 200) {
        context.dispatch('getList');
      }
    },
    // 清除已完成任务
    async clearFinished(context) {
      let res = await axios.get('/clearFinished');
      if (res.data.code == 200) {
        context.dispatch('getList');
      }
    },
    // 改变任务状态
    async changeStatus(context, payload) {
      let res = await axios.put('/changeStatus', {
        id: payload.id,
        newStatus: payload.newStatus
      });
      if (res.data.code == 200) {
        context.dispatch('getList');
      }
    }
  },
  getters: {
    // 未完成任务数量
    unfinished(state) {
      return state.list.filter(ele => ele.done == 0).length;
    }
  }
});
