<template>
  <div class="total">
    <span>总价：{{ price }}</span>
    <button @click="giveMoney">结算</button>
  </div>
</template>

<script>
export default {
  name: "Total",
  props: ["list"],
  computed: {
    price() {
      let sum = 0;
      this.list.forEach(ele => {
        sum += ele.num * ele.price;
      });
      return sum;
    }
  },
  methods: {
    giveMoney() {
      alert("共" + this.price + "元");
    }
  }
};
</script>

<style></style>
