import "todomvc-app-css/index.css";
import "todomvc-common/base.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import Home from "./views/Home.vue";
import Active from "./views/Active.vue";
import Completed from "./views/Completed.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/active",
      component: Active,
    },
    {
      path: "/completed",
      component: Completed,
    },
  ],
});

const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");
