import { createWebHistory, createRouter } from "vue-router";

import HomePage from "../views/HomePage.vue";
import LecturePage from "../views/LecturePage.vue"; 

const routes = [
  { path: "/", component: HomePage },
  { path: "/lecture", component: LecturePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
