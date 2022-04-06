/*
 * @Author: Binggan
 * @Date: 2022-02-23 13:13:49
 * @LastEditors: Binggan
 * @LastEditTime: 2022-02-28 16:33:57
 * @Description:
 */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 公共路由-无需权限
const routes = [
  {
    path: "",
    redirect: "index"
  },
  {
    path: "/index",
    component: () => import("@/views/Screen")
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login.vue")
  }
];

export default new VueRouter({
  routes
});
