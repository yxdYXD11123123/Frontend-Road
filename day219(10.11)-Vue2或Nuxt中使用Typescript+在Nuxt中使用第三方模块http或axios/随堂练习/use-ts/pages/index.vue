<template>
  <div>信息：{{ msg }}</div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";

interface User {
  firstName: string;
}

export default Vue.extend({
  props: {
    user: {
      type: Object,
    } as PropOptions<User>,
  },

  data() {
    return {
      msg: "some some",
    };
  },

  methods: {
    getMsg() {
      console.log(this.msg);
      console.log(this.user.firstName);
    },
  },
});
</script>
