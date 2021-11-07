<template>
  <div>
    <div v-if="userInfo">
      <div>用户名：{{ userInfo.username }}</div>
      <div>手机号：{{ userInfo.mobile }}</div>
      <van-button type="danger" class="logout-btn" @click="logout"
        >退出登录</van-button
      >
    </div>
    <div v-else>
      <nuxt-link to="/my/login">去登录</nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
// Cookie
import Cookies from "js-cookie";

export default {
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    ...mapMutations(["SET_TOKEN", "SET_USERINFO"]),
    // 退出登录
    logout() {
      this.SET_TOKEN("");
      this.SET_USERINFO(null);
      // 移除cookie中的token记录
      Cookies.remove("token");
    },
  },
};
</script>

<style>
.logout-btn {
  margin-top: 40px;
  margin-left: 10px;
}
</style>