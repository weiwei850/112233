/*
 * @Author: Binggan
 * @Date: 2022-02-23 15:38:42
 * @LastEditors: Binggan
 * @LastEditTime: 2022-02-24 11:32:22
 * @Description: 用户登录信息相关
 */

import { getToken, setToken, removeToken } from "@/utils/tokenOperate";

const user = {
  state: {
    token: getToken(),
    normalUserInfo: {},
    roles: [],
    permissions: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NORMAL_USERINFO: (state, userInfo) => {
      state.normalUserInfo = userInfo;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      const password = userInfo.password;
      /* const code = userInfo.code
            const uuid = userInfo.uuid */
      return new Promise((resolve) => {
        // TODO:登录待接接口

        setTimeout(() => {
          console.log("username", username, password);
          const token = "rerrsdqwegdg";

          setToken(token);
          commit("SET_TOKEN", token);
          resolve();
        }, 1000);
      });
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve) => {
        // TODO:待对接获取用户信息接口
        setTimeout(() => {
          const user = { name: "测试用户", roles: ["市级管理员"] };

          const { name, roles, avatar } = user;
          const userAvatar =
            avatar === "" ? require("@/assets/images/profile.png") : avatar;
          if (roles && roles.length > 0) {
            // 验证返回的roles是否是一个非空数组
            commit("SET_ROLES", roles);
            // commit('SET_PERMISSIONS', permissions)
          } else {
            commit("SET_ROLES", ["ROLE_DEFAULT"]);
          }

          commit("SET_NORMAL_USERINFO", { name, roles, userAvatar });
          resolve(user);
        }, 1000);
      });
    },
    // 退出系统
    LogOut({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit("SET_TOKEN", "");
          commit("SET_ROLES", []);
          commit("SET_PERMISSIONS", []);
          removeToken();
          resolve();
        }, 1000);
      });
    }
  }
};

export default {
  namespaced: true,
  ...user
};
