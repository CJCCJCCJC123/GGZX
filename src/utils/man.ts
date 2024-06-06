import { router } from "@/router";
//@ts-ignore
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import pinia from "@/store/index.ts";
import { useUserStore } from "@/store/modules/user";
import { InfoForm } from "@/api/user/type";
import setting from "@/utils/setting";
const userStore = useUserStore(pinia);
//设置路由守卫
router.beforeEach(async (to: any, _from, next) => {
  document.title = `${setting.title} - ${to.name}`;
  nprogress.start();
  const token = userStore.Token;
  if (token) {
    try {
      await userStore.getUserInfo();
    } catch (err: any) {
      console.log(err);
      userStore.Token = "";
      userStore.userInfo = {} as InfoForm;
      next({ path: "/login", query: { redirect: to.path } });
    }
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.path } });
    }
  }
});
router.afterEach((_to, _from) => {
  nprogress.done();
});
