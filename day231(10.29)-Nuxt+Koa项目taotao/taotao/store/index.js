import CookieParser from "cookieparser"

export const state = () => {
  return {
    token: "",
    userInfo: null
  }
}

export const mutations = {
  // 保存token
  SET_TOKEN(state, payload) {
    state.token = payload;
  },
  // 保存用户信息
  SET_USERINFO(state, payload) {
    state.userInfo = payload;
  }
}


export const actions = {
  // 我们之前做Vuex数据持久化时，会使用vuex-persistedstate，本质就是存到localStorage中，
  // 但是Nuxt在服务端渲染时，是拿不到localStorage的，这时就需要使用cookie了，
  // 因为cookie是存在headers中，nuxtServerInit可以获取请求req的请求头
  nuxtServerInit({ commit }, { req }) {
    commit("SET_TOKEN", CookieParser.parse(req.headers.cookie || '').token)
  }
}