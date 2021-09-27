<template>
  <div>
    <div>主页</div>
    <h2>{{ title }}</h2>
    <button @click="changeTitle">点击切换新标题</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
// 引入 使用共享库
import { useStore } from "vuex";
// 导入 注入关键字
import { key } from "../../stroe/index";

export default defineComponent({
  setup() {
    // 使用 useStore时，传入对应注入关键字（相当于使用了State接口）
    const store = useStore(key);

    const title = computed(
      () => store.state.title /* 这里title类型会被推断为string */
    );

    const changeTitle = () => {
      store.dispatch("Edit_Title_Action", "New Title");
    };

    return {
      title,
      changeTitle,
    };
  },
});
</script>

<style>
</style>