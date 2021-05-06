<template>
  <div>
    <h2>第一题</h2>
    <!-- 总价 -->
    <div>总价：{{ total }}</div>
    <!-- 商品列表 -->
    <ul class="list">
      <!-- 商品 -->
      <li
        v-for="item in list"
        :key="item.id"
        :class="{ red: item.checked }"
        @click="item.checked = !item.checked"
      >
        {{ item.name }}({{ item.price }}&yen;)
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
// 引入axios
import axios from "axios";

export default defineComponent({
  setup() {
    // 定义接口
    interface goods {
      checked: boolean;
      price: number;
    }
    // 商品列表
    const list = ref<goods[]>([]);

    // 获取数据
    axios.get("/data/list.json").then((res) => {
      list.value = res.data;
    });

    // 计算总价
    const total = computed(() => {
      let sum = 0;
      // 遍历商品
      list.value.forEach((val) => {
        // 将选中的商品价格累加起来
        if (val.checked) {
          sum += val.price;
        }
      });
      return sum;
    });

    // 返回
    return {
      list,
      total,
    };
  },
});
</script>

<style>
.list {
  width: 200px;
}
.list li {
  border: 1px solid #000;
}
.red {
  background-color: red;
}
</style>