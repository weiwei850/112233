<!--
 * @Author: Binggan
 * @Date: 2022-02-23 13:13:49
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-02 16:55:31
 * @Description:
-->
<template>
  <div id="app" class="screen-adapter">
    <!-- <screen-adapter> -->
    <transition :name="transitionName">
      <router-view />
    </transition>
    <!-- </screen-adapter> -->
  </div>
</template>
<script>
// import ScreenAdapter from "@/layout";
import { debounce } from "@/utils";
export default {
  data() {
    return {
      transitionName: "slide-fade",
      designWidth: 7680,
      designHeight: 2160,
      transform: "scale(1) translate(-50%, -50%)"
    };
  },
  components: {
    // ScreenAdapter
  },
  mounted() {
    document.querySelector("body").style.width = this.designWidth + "px";
    document.querySelector("body").style.height = this.designHeight + "px";
    this.setScale();
    window.onresize = debounce(this.setScale, 300);
  },
  methods: {
    // 获取放大缩小比例
    getScale() {
      const w = window.innerWidth / this.designWidth;
      const h = window.innerHeight / this.designHeight;
      return w < h ? w : h;
    },
    // 设置比例
    setScale() {
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;
      const factorWidth = winWidth / this.designWidth;
        const factorHeight = winHeight / this.designHeight;
        console.log("factorWidth", factorWidth, factorHeight)
      const ratio = factorWidth < factorHeight ? factorWidth : factorHeight;
      const bodyEle = document.querySelector("body");
      // 因为scale是以body的原中心点为基准进行缩放，所以缩放之后需要调整外边距，使其位于窗口的中心位置
      bodyEle.style.marginLeft =
        -(this.designWidth - ratio * this.designWidth) / 2 +
        (winWidth - ratio * this.designWidth) / 2 +
        "px";
      bodyEle.style.marginTop =
        -(this.designHeight - ratio * this.designHeight) / 2 +
        (winHeight - ratio * this.designHeight) / 2 +
        "px";
      bodyEle.style.marginBottom =
        -(winHeight > this.designHeight
          ? winHeight
          : this.designHeight - ratio * this.designHeight) + "px";
      bodyEle.style.marginRight =
        -(winWidth > this.designWidth
          ? winWidth
          : this.designWidth - ratio * this.designWidth) + "px";
      bodyEle.style.transform = `scale(${ratio}`;
    }
  }
};
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
