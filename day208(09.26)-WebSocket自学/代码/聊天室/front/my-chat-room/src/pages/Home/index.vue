<template>
  <div class="home">
    <!-- 用户登录 start -->
    <div class="login">
      <h3>设置名字头像</h3>
      <div class="username">
        <p>用户名</p>
        <input type="text" placeholder="请输入用户名" v-model="nickName" />
      </div>
      <div class="avatar">
        <p>选择头像</p>
        <div>
          <img
            v-for="item in avatarIds"
            :key="item"
            :class="{ active: indexChoosed === item }"
            :src="`${baseUrl}/images/avatar_0${item}.png`"
            alt=""
            @click="chooseAvatar(item)"
          />
        </div>
      </div>
      <button class="login-btn" @click="login">登录</button>
    </div>
    <!-- 用户登录 end -->
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
// 获取socket
const socket = inject("socket");
// 获取route
const router = useRouter();

// 基地址
const baseUrl = import.meta.env.VITE_RES_URL;

//#region 选择头像
const avatarIds = [1, 2, 3, 4];
const indexChoosed = ref(1);
const chooseAvatar = (index) => {
  indexChoosed.value = index;
};
//#endregion

//#region 登录功能
// 昵称
const nickName = ref("");

// 点击登录
const login = () => {
  const userInfo = {
    nickName: nickName.value,
    avatarId: indexChoosed.value,
  };
  socket.emit("login", userInfo);
  // 本地记录
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  // 登录成功后，跳转聊天页
  router.push("/chat");
};
//#endregion
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>