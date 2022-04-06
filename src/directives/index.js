/*
 * @Author: Binggan
 * @Date: 2022-03-02 11:08:55
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-02 11:09:37
 * @Description:
 */
import baseLoading from "./baseLoading";
export default {
  install: (Vue) => {
    Vue.directive("baseLoading", baseLoading);
  }
};
