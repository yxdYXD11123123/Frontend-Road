export const state = () => ({
  auth: ''
});

export const mutations = {
  SET_AUTH(state, payload) {
    state.auth = payload;
  }
};

export const actions = {
  nuxtServerInit({ commit }, app) {
    console.log(app);
  }
}