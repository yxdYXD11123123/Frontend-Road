<template>
  <div>
    <!-- <HelloWorld :msg="msg" @changeMsg="changeMsg" /> -->
    <!-- <GetDOM /> -->
    <!-- <WithModal /> -->
    <suspense>
      <!-- AsyncCom 一秒后才会显示， -->
      <!-- 因为 async setup 相当于返回一个pormise， -->
      <!-- 会触发fallback显示 等待 -->
      <AsyncCom />
      <template #fallback>
        <div>加载中。。。</div>
      </template>
    </suspense>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { ref } from "vue";
import GetDOM from "./components/GetDOM.vue";
import WithModal from "./components/WithModal.vue";
import AsyncCom from "./components/AsyncCom.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    GetDOM,
    WithModal,
    AsyncCom,
  },
  setup() {
    const msg = ref("父组件信息");

    const changeMsg = (newMsg) => {
      msg.value = newMsg;
    };

    return {
      msg,
      changeMsg,
    };
  },
};
</script>
