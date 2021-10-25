<template>
  <div>
    <h2>首页</h2>
    <p>列表</p>
    <ul>
      <li v-for="item in list" :key="item.id">
        <span>{{ item.title }}</span>
        <!-- link链接 可被爬虫识别 -->
        <!-- <a :href="`/details/${item.id}`">查看详情</a> -->
        <nuxt-link :to="`/details/${item.id}`">查看详情</nuxt-link>

        <!-- 编程导航 不会被拆分动态路由文件 -->
        <!-- <button @click="toDetails(item.id)">查看详情</button> -->
        <nuxt-link :to="`/detail?id=${item.id}`"
          >查看详情 之 请求参数</nuxt-link
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      list: [],
    };
  },
  async fetch() {
    const data = await this.$axios.$get("/list");
    this.list = data;
  },
  methods: {
    toDetails(id: string) {
      this.$router.push(`/details/${id}`);
    },
  },
});
</script>
