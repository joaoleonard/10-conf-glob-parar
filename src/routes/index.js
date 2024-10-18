import { createWebHistory, createRouter } from "vue-router";

import HomePage from "../views/HomePage.vue";
import LecturePage from "../views/LecturePage.vue"; 
import AdminPage from "../views/AdminPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/lecture", component: LecturePage },
  { path: "/admin", component: AdminPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
