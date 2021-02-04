import * as Vue from "vue";
import App from "./App.vue";
import Axios from 'axios';
Axios.default.baseURL = 'http://localhost:3000'
let vm = Vue.createApp(App);
vm.config.globalProperties.$axios = Axios;

vm.mount("#app");
