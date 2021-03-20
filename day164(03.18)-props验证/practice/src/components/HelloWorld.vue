<template>
  <div>
    <h1>{{ msg }}</h1>
    <button @click="count++">count is: {{ count }}</button>
    <p ref="eleP">
      Edit <code>components/HelloWorld.vue</code> to test hot module
      replacement.
    </p>
    <button @click="pass">传给父组件 info</button>
    <button @click="getDOM">获取DOM元素</button>
    <div></div>
    <button @click="toggleEle">控制h2标签的显示和隐藏</button>
    <h2 v-if="showH2" id="two">这是h2标签</h2>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: {
      // 可以通过的类型
      type: [String, Number],
      // 必传
      required: true,
      // 默认值 (对象或数组默认值必须从一个工厂函数获取)
      default: function () {
        return "one two";
      },
      // 必须有 s / v 字符
      validator: function (value) {
        return ["s", "v"].indexOf(value) !== -1;
      },
    },
  },
  data() {
    return {
      count: 0,
      showH2: false,
    };
  },
  methods: {
    pass() {
      this.$emit("father-event", "我是子组件传来的info");
    },
    getDOM() {
      console.log(this.$refs.eleP);
      // 移除自身
      this.$refs.eleP.parentElement.removeChild(this.$refs.eleP);
    },
    toggleEle() {
      this.showH2 = true;
      this.$nextTick(() => {
        console.log(document.getElementById("two"));
      });
    },
  },
};
</script>
