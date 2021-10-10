<template>
  <div>
    <div>
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link to="/parent">Parent</nuxt-link>
    </div>
    <!-- 页面 -->
    <Nuxt />
  </div>
</template>

<script>
export default {
  middleware: "auth",
};
</script>

<style>
.nuxt-link-exact-active {
  color: green;
}

div {
  text-align: center;
}
</style>