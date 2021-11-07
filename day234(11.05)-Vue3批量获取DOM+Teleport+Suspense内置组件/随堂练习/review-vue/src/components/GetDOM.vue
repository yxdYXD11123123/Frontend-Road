<template>
  <div>
    <ul>
      <li
        v-for="(item, index) in list"
        :key="index"
        :ref="
          (el) => {
            listDOM[index] = el;
          }
        "
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const list = ref(["a", "b", "c"]);
    // 通过 ref属性 传递回调函数 获取DOM元素，批量获取DOM元素
    const listDOM = ref([]);

    // 因为 ref本身就是在模板渲染时，作为渲染函数的结果创建且注册的，所以只能在模板渲染后使用
    onMounted(() => {
      console.log(listDOM.value);
    });

    return {
      list,
      listDOM,
    };
  },
};
</script>

<style></style>
