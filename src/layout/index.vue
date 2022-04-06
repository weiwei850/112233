<!--
 * @Author: Binggan
 * @Date: 2022-02-28 16:06:51
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-02 17:52:30
 * @Description:布局文件
-->
<template>
  <div class="screen-adapter" :style="style">
    <slot />
  </div>
</template>

<script>
import { debounce } from "@/utils";
export default {
  props: {
    width: {
      type: String,
      default: "7680"
    },
    height: {
      type: String,
      default: "2160"
    }
  },
  data() {
    return {
      style: {
        width: this.width + "px",
        height: this.height + "px",
        transform: "scale(1) translate(-50%, -50%)"
      }
    };
  },
  mounted() {
    this.setScale();
    window.onresize = debounce(this.setScale, 300);
  },
  methods: {
    // 获取放大缩小比例
    getScale() {
      const w = window.innerWidth / this.width;
      const h = window.innerHeight / this.height;
      return w < h ? w : h;
    },
    // 设置比例
    setScale() {
      this.style.transform =
        "scale(" + this.getScale() + ") translate(-50%, -50%)";
      console.log("任你千变万化,我都不会影响性能");
    }
  }
};
</script>
<style lang="scss" scoped>
.screen-adapter {
  transform-origin: 0 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transition: 0.3s;
  font-size: 30px;
  background: rgb(212, 212, 212);
  color:#fff;
  overflow: hidden;
}
</style>
