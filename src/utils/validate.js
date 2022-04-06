/*
 * @Author: Binggan
 * @Date: 2022-02-23 20:14:06
 * @LastEditors: Binggan
 * @LastEditTime: 2022-02-23 20:14:13
 * @Description:
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
