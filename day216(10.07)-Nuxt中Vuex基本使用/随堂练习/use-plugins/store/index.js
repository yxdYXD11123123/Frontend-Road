export const state = () => {
  return {
    count: 0
  }
}

export const mutations = {
  increment(state) {
    state.count++;
  }
}
export const actions = {
  asyncIncrement({ commit }) {
    setTimeout(function () {
      commit('increment')
    }, 1000)
  }
}