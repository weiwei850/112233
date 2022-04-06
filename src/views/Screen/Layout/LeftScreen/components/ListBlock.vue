<!--
 * @Author: Binggan
 * @Date: 2022-03-01 19:53:04
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-02 17:20:48
 * @Description:
-->
<template>
  <div class="item-wrapper">
    <div class="flex aling-center justify-around title-box" v-if="title">
      <div class="decoration">
        <img class="title-line" :src="leftLinePng" />
        <img class="title-icon" :src="leftIconPng" />
      </div>
      <h3 class="flex align-center block-title">
        <slot name="title"></slot>
      </h3>
      <div class="decoration">
        <img class="title-icon" :src="leftIconPng" />
        <img class="title-line" :src="leftLinePng" />
      </div>
    </div>
    <div class="content-box">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      leftLinePng: require("@/assets/images/screen/left-part-two/title-left-line.png"),
      leftIconPng: require("@/assets/images/screen/left-part-two/title-left-icon.png")
    };
  }
};
</script>

<style lang="scss" scoped>
.item-wrapper {
  margin-bottom: 17px;
  background: $screen-content-bg;
  .decoration {
    .title-icon {
      width: 96px;
      height: 15px;
    }
    .title-line {
      width: 632px;
      height: 6px;
    }
  }
  .title-box{
    color:#fff;
    padding: 17px 0;
  }
}
.block-title {
  height: 74px;
  font-size: 40px;
  padding: 0 35px;
  background: url("../../../../../assets/images/screen/left-part-two/title-bg.png")
    no-repeat center/100% 100%;
  .title-icon {
    width: 37px;
    height: 37px;
    margin-right: 20px;
  }
}
.content-box {
  padding: 30px;
}
</style>
