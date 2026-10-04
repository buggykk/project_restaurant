import { createApp } from "vue";
import ElementPlus from "element-plus";

import "element-plus/dist/index.css";
import "./assets/css/fontawesome-all.min.css";
import "./assets/css/style.css";

import App from "./App.vue";

const app = createApp(App);

app.use(ElementPlus);

app.mount("#app");