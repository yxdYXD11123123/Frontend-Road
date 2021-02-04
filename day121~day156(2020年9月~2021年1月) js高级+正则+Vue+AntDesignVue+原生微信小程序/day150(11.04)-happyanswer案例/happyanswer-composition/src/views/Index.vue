<template>
  <div class="home_container">
    <section>
      <!-- 头部标签 -->
      <header class="top_tips">
        <span class="num_tip">{{ level }}</span>
      </header>
      <!-- 首页内容 -->
      <div>
        <div class="home_logo item_container_style"></div>
        <router-link class="start button_style" to="/answer"></router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { computed } from "vue";
// 导入共享库
import { useStore } from "vuex";

export default {
  setup() {
    // 使用共享库
    let store = useStore();

    // 请求数据
    store.dispatch("getDatas");

    // 获取头部标签内容
    let level = computed(() => store.state.level);

    // 返回
    return {
      level
    };
  }
};
</script>

<style lang="scss">
.home_container {
  height: 100%;
  background-image: url("/images/1-1.jpg");
}
.top_tips {
  position: absolute;
  height: 7.35rem;
  width: 3.25rem;
  top: -1.3rem;
  right: 1.6rem;
  background: url("/images/WechatIMG2.png") no-repeat;
  background-size: 100% 100%;
  z-index: 10;
  .num_tip {
    position: absolute;
    left: 0.48rem;
    bottom: 1.1rem;
    height: 0.7rem;
    width: 2.5rem;
    font-size: 0.6rem;
    font-family: "黑体";
    font-weight: 600;
    color: #a57c50;
    text-align: center;
  }
}

.item_container_style {
  height: 11.625rem;
  width: 13.15rem;
  background-repeat: no-repeat;
  position: absolute;
  top: 4.1rem;
  left: 1rem;
}
.home_logo {
  background-image: url("/images/1-2.png");
  background-size: 13.142rem 100%;
  background-position: right center;
}

.button_style {
  display: block;
  height: 2.1rem;
  width: 4.35rem;
  background-size: 100% 100%;
  position: absolute;
  top: 16.5rem;
  left: 50%;
  margin-left: -2.4rem;
  background-repeat: no-repeat;
}
.start {
  background-image: url("/images/1-4.png");
}
</style>
