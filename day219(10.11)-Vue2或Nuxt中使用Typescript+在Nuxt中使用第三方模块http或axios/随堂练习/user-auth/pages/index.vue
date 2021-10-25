<template>
  <div>
    <div v-if="!auth">请 <nuxt-link to="/login"> 请登录</nuxt-link></div>
    <div v-else>
      您已登录，可以访问 <nuxt-link to="/my">我的页面</nuxt-link>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import { mapState } from "vuex";

export default {
  mounted() {
    console.log(Cookie.get("auth"));
  },
  computed: {
    ...mapState(["auth"]),
  },
};
</script>
