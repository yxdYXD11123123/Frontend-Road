import { createStore } from "vuex";

import axios from "axios";

export default createStore({
  state() {
    return {
      // 等级
      level: "",
      // 问题
      questions: [],
      // 第几题
      itemNum: 1,
      // 记录答案
      answers: {},
      // 分数
      score: 0
    };
  },
  mutations: {
    // 初始化数据
    initData(state, payload) {
      state.questions = payload;
      state.level = payload[0].active_topic_phase;
    },
    // 记录答案
    recordAnswers(state, payload) {
      state.answers[payload.topic_id] = payload.topic_answer_id;
    },
    // 下一题
    addItemNum(state) {
      state.itemNum += 1;
    },
    // 加分
    addScore(state, payload) {
      state.score += payload;
    },
    // 清理记录，退回第一题
    clearRecords(state) {
      state.answers = {};
      state.score = 0;
      state.itemNum = 1;
    },
    // 返回上一题
    backLast(state) {
      state.itemNum -= 1;
    }
  },
  actions: {
    // 获取数据
    async getDatas(context) {
      let res = await axios.get("/data/question.json");
      context.commit("initData", res.data);
    }
  }
});
