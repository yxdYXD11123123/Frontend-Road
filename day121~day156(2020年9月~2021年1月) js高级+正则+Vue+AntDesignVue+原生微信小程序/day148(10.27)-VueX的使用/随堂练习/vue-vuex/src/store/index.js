// 引入VueX
import { createStore } from 'vuex';

// 创建并配置 最后导出
export default createStore({
  // state 存数据的
  state() {
    return {
      name: '小红',
      age: 19
    }
  },
  // mutations，是改变store中状态的执行者，只能是同步操作
  // （如果进行异步操作会导致状态改变后不可追踪）
  mutations: {
    add(state) {
      console.log(state);
      state.age++;
    },
    changeName(state, newName) {
      state.name = newName;
    }
  },
  // actions，其中可以包含异步操作
  // （通常在这里进行各种事务处理，然后触发mutations中的方法）
  actions: {
    actionsChangeName(context, newName) {
      // context 是一个具有和$store相同方法和属性的对象
      setTimeout(() => {
        // 这时再触发mutations，即使我们处于异步，最终还是可以追踪到状态改变的记录
        context.commit('changeName', newName);
      }, 500);
    }
  },
  // 类似于 computed ，根据其他getter 或 state 计算返回值
  getters: {
    showAge(state) {
      return "年龄的俩倍是" + state.age * 2
    }
  }
})