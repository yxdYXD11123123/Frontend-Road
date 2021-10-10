<template>
  <div>
    <h2>首页</h2>
    <div v-for="item in data" :key="item.id">
      <div v-html="item.title"></div>
    </div>
  </div>
</template>

<script>
export default {
  // 推荐 写法
  async asyncData({ $axios }) {
    // 可以判断在客户端还是服务端
    const server = process.server ? "在服务端" : "在客户端";
    console.log(server);

    const res = await $axios.get("https://cnodejs.org/api/v1/topics");
    if (res.status === 200)
      return {
        data: res.data.data,
      };
  },
  // 或者 返回一个promise
  // asyncData({ $axios }) {
  //   return $axios
  //     .get("https://cnodejs.org/api/v1/topics")
  //     .then((res) => {
  //       return { data: res.data.data };
  //     })
  //     .catch((err) => {
  //       throw new Error(err);
  //     });
  // },
};
</script>
