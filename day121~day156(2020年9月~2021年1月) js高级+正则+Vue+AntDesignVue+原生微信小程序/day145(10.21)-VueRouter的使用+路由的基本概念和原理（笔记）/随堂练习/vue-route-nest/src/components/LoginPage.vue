<template>
  <div>
    <div>
      <router-link to="/user/123">user</router-link>
      <router-link to="/login">login</router-link>
    </div>
    <h2>This is Login</h2>
    <router-link to="/byinput">账号密码登录</router-link>
    <span> </span>
    <router-link to="/login/byer">扫码登录</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
a {
  margin: 10px;
}
</style>
