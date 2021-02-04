import { createStore } from "vuex";

import axios from 'axios';

export default createStore({
  state() {
    return {
      // 所有问题
      questions: [],
      // 第几题
      itemNum: 1,
      // 用户选择答案
      answers: {},
      // 分数
      score: 0
    }
  },
  getters: {
    level(state) {
      if (state.questions.length > 0) {
        return state.questions[0].active_topic_phase
      }
    }
  },
  mutations: {
    // 存储数据
    storeData(state, payload) {
      state.questions = payload;
    },
    // 记录答案
    recordAnswer(state, payload) {
      state.answers[payload.topic_id] = payload.topic_answer_id;
    },
    // 下一题
    nextQuestion(state) {
      state.itemNum += 1;
    },
    // 上一题
    lastQuestion(state) {
      state.itemNum -= 1;
    },
    // 加分
    addScore(state, payload) {
      state.score += payload;
    },
    // 清除分数
    clearScore(state) {
      state.score = 0;
    },
    // 回到第一题
    backFirst(state) {
      state.itemNum = 1;
    },
    // 清空答案
    clearAnswers(state) {
      state.answers = {}
    }
  },
  actions: {
    // 获取数据
    async getData(context) {
      let res = await axios.get('/data/question.json');
      context.commit('storeData', res.data);
    }
  }
});
