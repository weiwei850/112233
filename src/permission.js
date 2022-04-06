/*
weiwei
 */
import router from "./router";

import { getToken } from "@/utils/tokenOperate";
const whiteList = ["/login"];
router.beforeEach((to, from, next) => {
  console.log("路由守卫", to, from, getToken());
  if (getToken()) {
    // to.meta.title && store.dispatch("settings/setTitle", to.meta.title)

    /* has token*/
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    console.log("------");
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      // next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      next("/login");
    }
  }
});
