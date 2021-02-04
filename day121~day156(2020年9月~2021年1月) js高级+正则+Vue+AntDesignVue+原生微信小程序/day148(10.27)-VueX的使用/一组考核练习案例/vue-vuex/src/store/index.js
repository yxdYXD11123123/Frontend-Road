import { createStore } from 'vuex';

export default createStore({
  // 用来存储数据和应用状态
  // 注意这里的值只可读，不可以直接修改
  state() {
    return {
      books: [
        {
          id: 1,
          name: '倚天屠龙记',
          price: 20
        },
        {
          id: 2,
          name: '围城',
          price: 12
        },
        {
          id: 3,
          name: '非暴力沟通',
          price: 6
        }
      ]
    }
  },
  // mutations中用来存储方法（是改变store状态的执行者）
  // 这些方法是专门来修改state中的数据状态的
  // 注意：这里不可以写异步操作，因为在mutation的异步中修改state中数据时，不会记录到数据的改变
  mutations: {
    removeBook(state, id) {
      // mutations中的方法 会默认第一个参数为state，后面是传来的参数
      state.books = state.books.filter(ele => ele.id != id);
    }
  },
  // actions中也是用来存储方法
  // 但是actions中可以执行异步操作，适合用于各种事务处理
  // 然后再事务处理后，触发mutaions中的方法去改变state数据（便可以有数据改变的记录）
  actions: {
    removeBookAfterSeconds(context, id) {
      // actions中的方法，会默认第一个参数为context上下文，在这里相当于store对象，可以使用store对象的方法commit,dispatch执行mutations和actions等等
      setTimeout(() => {
        context.commit('removeBook', id)
      }, 2000);
    }
  },
  // 类似于 computed 计算属性，可以基于getters和state中已有的数据 计算出新的返回值
  getters: {
    nums(state) {
      return state.books.length
    }
  }
})