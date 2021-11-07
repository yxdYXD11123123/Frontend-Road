<template>
  <div>
    <p>{{ age }}</p>
    <!-- <p>{{ gender }}</p> -->
    <button @click="onClick">button</button>
    <TryProps :msg="age" />
  </div>
</template>

<script>
import { ref, reactive, toRef, toRefs } from "vue";
import { watch } from "vue";
import TryProps from "./components/TryProps.vue";

export default {
  setup(props) {
    const man = ref({ age: 22, some: { one: "one" } });
    const person = reactive({ name: "frank", gender: 0 });
    const { age } = toRefs(man.value);
    const { gender, name } = toRefs(person);
    console.log(man.value);
    // watch监听单个资源
    watch([man.value, person], (newValue, oldValue) => {
      console.log(newValue, oldValue);
    });
    const onClick = () => {
      person.name += "1";
      man.value.age += 1;
    };
    return {
      person,
      onClick,
      // 转 引用类型 ref，要用.value
      // age: toRef(man.value, "age"),
      // 转 reative类型，直接用 reactive对象
      // name: toRef(person, "name"),
      name,
      // gender,
      age,
    };
  },
  components: { TryProps },
};
</script>
