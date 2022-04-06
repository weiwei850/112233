/*
 * @Author: Binggan
 * @Date: 2022-02-23 13:13:49
 * @LastEditors: Binggan
 * @LastEditTime: 2022-02-24 15:53:59
 * @Description:
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 引入 modules 文件夹下的文件
const modulesFiles = require.context("./modules", true, /\.js$/);
// 自动化处理文件
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // 处理名称
  const moduleName = modulePath.replace(/^\.\/(.*)\.js$/, "$1");
  // 取值
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

export default new Vuex.Store({
  modules,
  state: {},
  mutations: {},
  actions: {},
  getters: {
    roles: (state) => state.user.roles
  }
});
