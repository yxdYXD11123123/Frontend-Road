<template>
  <div>
    <h2>首页</h2>
    <van-cell is-link @click="showPopup">展示弹出层</van-cell>
    <van-popup v-model="show">内容</van-popup>
    <div>vuex共享库中的count: {{ count }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  head() {
    return {
      title: "二手车买卖",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "my custom 二手车交易",
        },
      ],
    };
  },
  data() {
    return {
      show: false,
    };
  },
  asyncData({ $hello, app }) {
    // console.log(app.$hello);
    // console.log($hello);
  },

  computed: {
    ...mapState(["count"]),
  },
  methods: {
    showPopup() {
      this.show = true;
    },
  },
};
</script>
