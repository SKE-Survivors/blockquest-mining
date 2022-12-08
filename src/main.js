import { createApp } from "vue";
import App from "./App.vue";
import VueCryptojs from "vue-cryptojs";
import "@/assets/global.css";

createApp(App).use(VueCryptojs).mount("#app");
