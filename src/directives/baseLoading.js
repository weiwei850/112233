/*
 * @Author: Binggan
 * @Date: 2022-03-02 11:00:42
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-02 11:02:25
 * @Description: 自定义loading指令
 */
export default {
  // dom树绘制前调用  el为当前节点，binding为对象，很少用，  vnode vue对象
  bind: function(el, binding) {
    const loading = document.createElement("div");
    loading.classList.add("loading-box");
    loading.innerHTML = `<div class="container">
        <div class="line" ></div>
        <div class="line" ></div>
        <div class="line" ></div>
      </div>`;
    el.style.position = "relative";
    binding.value
      ? (loading.style.display = "flex")
      : (loading.style.display = "none");
    el.appendChild(loading);
  },
  // 组件更新后的状态
  componentUpdated: function(el, binding, vnode) {
    if (binding.value) {
      el.querySelector(".loading-box")
        ? (el.querySelector(".loading-box").style.display = "flex")
        : null;
    } else {
      el.querySelector(".loading-box")
        ? (el.querySelector(".loading-box").style.display = "none")
        : null;
    }
  },
  // 组件更新前的状态
  update: function(el, binding, vnode) {}
};
