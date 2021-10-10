<template>
  <div>
    <!-- ------keep-alive 和 内部组件的 activated + deactivated 钩子函数结合使用----- -->
    <img
      alt="Vue logo"
      src="./assets/logo.png"
      @click="comName = comName == 'HelloWorld' ? 'HelloEarth' : 'HelloWorld'"
    />
    <keep-alive>
      <component :is="comName"></component>
    </keep-alive>
    <!-- ------keep-alive 和 内部组件的 activated + deactivated 钩子函数结合使用----- -->

    <!-- ------------------ 插槽 start ---------------------- -->
    <SlotCom>
      <!-- 默认插槽 start -->
      默认插槽
      <!-- 默认插槽 end -->

      <!-- 具名插槽 start -->
      <template v-slot:named>具名插槽</template>
      <!-- 具名插槽 end -->

      <!-- 作用域插槽 start -->
      <template v-slot:scope="scope">{{ scope.data.str }}</template>
      <!-- 作用域插槽 end -->

      <!-- 动态插槽 start  # 代替 v-slot -->
      <template #[dynamicName]>动态插槽</template>
      <!-- 动态插槽 end -->
    </SlotCom>
    <button
      @click="
        dynamicName = dynamicName == 'dynamicOne' ? 'dynamicTwo' : 'dynamicOne'
      "
    >
      切换动态插槽
    </button>
    <!-- ------------------ 插槽 end ---------------------- -->

    <!-- -------------------- 自定义指令 start --------------------- -->
    <CustomDirective></CustomDirective>
    <!-- -------------------- 自定义指令 end --------------------- -->
  </div>
</template>

<script>
import WorldCom from "./components/HelloWorld.vue";
import EarthCom from "./components/HelloEarth.vue";
import SlotCom from "./components/SlotCom";
import CustomDirective from "./components/CustomDirective.vue";

export default {
  name: "App",
  data() {
    return {
      comName: "HelloWorld",
      dynamicName: "dynamicOne",
    };
  },
  components: {
    // 读取动态组件名
    [WorldCom.name]: WorldCom,
    [EarthCom.name]: EarthCom,
    SlotCom,
    CustomDirective,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
