/*
 * @Author: Binggan
 * @Date: 2022-02-23 15:36:00
 * @LastEditors: Binggan
 * @LastEditTime: 2022-02-24 10:41:35
 * @Description:
 */
import Cookies from "js-cookie";

const TokenKey = "Admin-Token";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
