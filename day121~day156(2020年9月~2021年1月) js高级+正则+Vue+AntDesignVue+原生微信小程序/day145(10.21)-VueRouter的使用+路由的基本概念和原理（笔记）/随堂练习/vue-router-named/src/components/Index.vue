<template>
  <div class="index">
    <div>这里是首页</div>
    <div>
      <button @click="toPersonal">个人中心</button>
    </div>
    <div>
      <button @click="toForward">前进一页</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toPersonal() {
      // 实例中有$router对象 里面有push、back、go、forward等等方法
      console.log(this.$router);
      //注意： $router和$route的区别
      console.log(this.$route);
      // 使用push方法 参数为 字符串或者对象
      // this.$router.push("/personal/dong/123");
      // 或者
      this.$router.push({
        name: "personal",
        params: { uname: "dong", id: "123456" },
        // 还可以带有查询参数 query: {}
        query: {}
      });
    },
    toForward() {
      // forward() 前进一页
      // this.$router.forward();
      // go(1)和forward作用一样
      this.$router.go(1);
    }
  }
};
</script>

<style></style>
