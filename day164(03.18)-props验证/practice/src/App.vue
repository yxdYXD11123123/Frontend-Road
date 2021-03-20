<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld :msg="msg" @father-event="fatherEvent" />
    <h1>{{ info }}</h1>
    <!-- 切回ComOne时，ComOne数据会缓存下来 -->
    <keep-alive>
      <component
        :is="toggleFlag ? 'ComTwo' : 'ComOne'"
        @click="changeFlag"
      ></component>
    </keep-alive>
    <!-- 再来一个 -->
    <keep-alive>
      <ComTwo v-if="toggleFlag"></ComTwo>
      <ComOne v-else></ComOne>
    </keep-alive>

    <TryDirect></TryDirect>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import ComOne from "./components/ComOne.vue";
import ComTwo from "./components/ComTwo.vue";
import TryDirect from "./components/TryDireactive.vue";

export default {
  name: "App",
  data() {
    return {
      msg: "s",
      info: "我是父组件的数据",
      toggleFlag: true,
    };
  },
  methods: {
    fatherEvent(info) {
      this.info = info;
    },
    changeFlag() {
      this.toggleFlag = !this.toggleFlag;
    },
  },
  components: {
    HelloWorld,
    ComOne,
    ComTwo,
    TryDirect,
  },
};
</script>
