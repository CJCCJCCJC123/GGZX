import { defineStore } from "pinia";
import { ref } from "vue";
import type {
  loginForm,
  loginResponseData,
  userInfoResponseData,
} from "@/api/user/type";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
import { constroutes, asyncRoutes, anyRoutes } from "@/router/routes";
import { router } from "@/router";
//@ts-ignore
import clonedeep from "lodash/clonedeep";
import { ElMessage } from "element-plus"; // Import the ElMessage component

const filterAsyncRoutes = (asyncRoutes: any, routes: any) => {
  return asyncRoutes.filter((ele: any) => {
    if (routes.includes(ele.name)) {
      if (ele.children && ele.children.length > 0) {
        ele.children = filterAsyncRoutes(ele.children, routes);
      }
      return true;
    }
  });
};

export const useUserStore = defineStore(
  "User",
  () => {
    const Token = ref("");
    const menuRoutes = ref(constroutes);
    const userInfo = ref({} as any);
    const buttons = ref<any>([]);
    const userLogin = async (data: loginForm) => {
      const res: loginResponseData = await reqLogin(data);
      if (res.code === 200) {
        Token.value = res.data;
        return "ok";
      } else {
        ElMessage.error(res.data);
        return Promise.reject(new Error(res.data));
      }
    };
    const getUserInfo = async () => {
      const res: userInfoResponseData = await reqUserInfo();
      if (res.code === 200) {
        userInfo.value = res.data;
        const userAsyncRoute = filterAsyncRoutes(
          clonedeep(asyncRoutes),
          res.data.routes,
        );
        menuRoutes.value = [...constroutes, ...userAsyncRoute, ...anyRoutes];
        menuRoutes.value.forEach((ele: any) => {
          router.addRoute(ele);
        });
        buttons.value = res.data.buttons;
        return "ok";
      } else {
        console.log(res);
        ElMessage.error("身份验证失败");
        return Promise.reject(new Error(res.message));
      }
    };
    const userLogout = async () => {
      await reqLogout();
    };
    return {
      Token,
      menuRoutes,
      userInfo,
      buttons,
      userLogin,
      getUserInfo,
      userLogout,
    };
  },
  {
    persist: {
      paths: ["userInfo", "Token"],
    },
  },
);
