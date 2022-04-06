/*
 * @Author: Binggan
 * @Date: 2022-02-23 13:13:49
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-02 11:11:59
 * @Description:
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/iconfonts/iconfont.css"
import "@/assets/styles/index.scss"

Vue.config.productionTip = false;

import CountTo from "@/components/CountTo";
Vue.use(CountTo)

import BaseComponent from "@/components/Base"
Vue.use(BaseComponent)
// 权限控制
import "./permission"

import directives from "./directives"
Vue.use(directives)

import "@/plugins/element-ui-import";

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
