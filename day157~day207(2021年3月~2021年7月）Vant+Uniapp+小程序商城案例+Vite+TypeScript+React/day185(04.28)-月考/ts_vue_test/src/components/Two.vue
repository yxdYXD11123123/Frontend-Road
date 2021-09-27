<template>
  <div>
    <h2>第二题</h2>
    <div id="box" class="all">
      <div class="ad">
        <ul id="imgs">
          <li><img :src="images[index]" /></li>
        </ul>
      </div>
      <!--相框-->
      <div id="focusD">
        <!-- 第一张图时不显示 -->
        <span id="left" v-show="index != 0" @click="clickLeft">&lt;</span>
        <!-- 最后一张图时不显示 -->
        <span id="right" v-show="index != images.length - 1" @click="clickRight"
          >&gt;</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    // 图片列表
    const images = ref([
      "images/01.jpg",
      "images/02.jpg",
      "images/03.jpg",
      "images/04.jpg",
      "images/05.jpg",
    ]);
    // 当前图片的索引
    const index = ref(0);

    // 点击左侧
    const clickLeft = () => {
      index.value--;
    };

    // 点击左侧
    const clickRight = () => {
      index.value++;
    };

    // 返回
    return {
      images,
      index,
      clickLeft,
      clickRight,
    };
  },
});
</script>

<style scoped>
body,
ul,
ol,
li,
img {
  margin: 0;
  padding: 0;
  list-style: none;
}

#box {
  width: 520px;
  height: 280px;
  padding: 5px;
  position: relative;
  border: 1px solid #ccc;
  margin: 100px auto 0;
}

.ad {
  width: 520px;
  height: 280px;
  overflow: hidden;
  position: relative;
}

#box img {
  width: 520px;
}

.ad ol {
  position: absolute;
  right: 10px;
  bottom: 10px;
}

.ad ol li {
  width: 20px;
  height: 20px;
  line-height: 20px;
  border: 1px solid #ccc;
  text-align: center;
  background: #fff;
  float: left;
  margin-right: 10px;
  cursor: pointer;
  _display: inline;
}

.ad ol li.current {
  background: yellow;
}

.ad ul li {
  float: left;
}

.ad ul {
  position: absolute;
  top: 0;
  width: 2940px;
}

.ad ul li.current {
  display: block;
}

#focusD span {
  width: 40px;
  height: 40px;
  position: absolute;
  left: 5px;
  top: 50%;
  margin-top: -20px;
  background: #000;
  cursor: pointer;
  line-height: 40px;
  text-align: center;
  font-weight: bold;
  font-family: "黑体";
  font-size: 30px;
  color: #fff;
  opacity: 0.3;
  border: 1px solid #fff;
}

#focusD #right {
  right: 5px;
  left: auto;
}
</style>