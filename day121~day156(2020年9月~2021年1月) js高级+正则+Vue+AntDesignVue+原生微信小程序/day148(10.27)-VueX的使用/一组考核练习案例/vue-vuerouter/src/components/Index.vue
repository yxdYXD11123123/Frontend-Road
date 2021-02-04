<template>
  <div>
    <h3>首页</h3>
    <div>
      <button @click="toPrivate">个人中心</button>
    </div>
    <div>请输入aname <input type="text" v-model="aname" /></div>
    <div>请输入bname <input type="text" v-model="bname" /></div>
    <router-link to="/ranks">排行榜</router-link>
    <router-link :to="{ path: '/recommend' }">个性推荐</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aname: "",
      bname: ""
    };
  },
  methods: {
    // 点击按钮，跳转个人中心页
    toPrivate() {
      if (this.aname.trim().length != 0 && this.bname.trim().length != 0) {
        this.$router.push({
          name: "private",
          params: {
            aname: this.aname,
            bname: this.bname
          }
        });
      } else {
        alert("aname和bname不能为空");
      }
    }
  }
};
</script>

<style>
a {
  margin: 0 10px;
}
</style>