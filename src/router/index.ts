import { createRouter, createWebHashHistory } from "vue-router";
import { constroutes, anyRoutes } from "./routes";
export const routes = [...constroutes, ...anyRoutes];
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  //滚动行为
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
