<template>
  <div>
    <h3>reactive</h3>
    <div>objRef的name{{ objRef.friends.name }}</div>
    <div>objRef的name{{ objReactive.name }}</div>
    <p>arr中的{{ refArr[2] }}</p>
    <button @click="changeRef">改变ref引用类型</button>
    <button @click="changeReactive">改变reactive引用类型</button>
    <button @click="changeArr">改变数组</button>
  </div>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  setup() {
    // ref 用于声明基本类型
    let objRef = ref({
      name: "ref",
      age: 18,
      friends: {
        name: "dong"
      }
    });
    function changeRef() {
      // objRef.value.name = "changedRef";
      // objRef.value = {
      //   name: "refchanged",
      //   age: 19
      // };
      console.log(objRef);
      objRef.value.friends.name = "changdong";
    }

    let refArr = ref(["a", "b", "c"]);
    // 改变数组
    function changeArr() {
      refArr.value[2] = "d";
      console.log(refArr);
    }

    // reactive 用于声明引用类型
    let objReactive = reactive({
      name: "reactive",
      age: 81
    });
    function changeReactive() {
      objReactive.name = "changedReactive";
    }

    // 返回
    return {
      objRef,
      objReactive,
      refArr,
      changeArr,
      changeRef,
      changeReactive
    };
  }
};
</script>

<style>
</style>