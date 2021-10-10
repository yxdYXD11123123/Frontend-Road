export const state = () => ({
  count: 0
})

export const mutations = {
  SET_COUNT(state, payload) {
    state.count = payload;
  }
}


export const actions = {
  // nuxtServerInit({ commit }, { req }) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       commit("SET_COUNT", 1);
  //       resolve()
  //     }, 2000);
  //   })
  // }
}