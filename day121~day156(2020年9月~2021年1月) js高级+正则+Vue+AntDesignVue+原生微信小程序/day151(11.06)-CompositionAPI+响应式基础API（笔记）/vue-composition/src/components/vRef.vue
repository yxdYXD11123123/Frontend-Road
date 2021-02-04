<template>
  <div>
    <h3>ref</h3>
    <!--  -->
    <p>在模板中使用：{{ str }} （直接写名字）</p>
    <button @click="changeStr">变变变</button>
  </div>
</template>

<script>
// 导入ref
import { ref } from "vue";

export default {
  setup() {
    // ref 函数传入一个值作为参数，返回一个基于该值的响应式Ref对象，
    // 该对象中的值一旦被改变和访问，都会被跟踪到
    let str = ref("我是一个字符串");
    console.log(str);
    console.log("在setup中使用：" + str.value + "（需要.value）");

    // 声明一个方法改变 str
    function changeStr() {
      str.value = "我是修改后的字符串";
    }

    // 返回
    return {
      str,
      changeStr
    };
  }
};
</script>

<style>
</style>