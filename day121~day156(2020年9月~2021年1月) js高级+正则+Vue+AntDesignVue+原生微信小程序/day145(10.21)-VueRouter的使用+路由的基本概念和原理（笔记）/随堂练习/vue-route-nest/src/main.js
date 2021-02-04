import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
let app = createApp(App);
app.use(router);
app.mount("#app");
