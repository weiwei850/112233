<!--
 * @Author: Binggan
 * @Date: 2022-03-03 12:12:33
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-04 17:44:22
 * @Description:
-->
<!-- 三级标题 -->
<template>
  <div class="tertiary-title-box">
    <div :class="['con-title', mBgType]">
      <i class="icon"></i>
      <!-- <img
        class="left-img"
        :src="require('@/assets/images/common/moudle_title_2.png')"
        alt=""
      /> -->
      <span>{{ mTitle }}</span>
    </div>
    <slot />
    <div :class="['center-line', centerLineWidth]"></div>
    <div class="spots" v-if="showFindAll == '1'" @click="openTable">
      <!-- <img src="../../assets/image/common/icon_dian3.png" alt="" /> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "ModularTitle",
  props: {
    mTitle: String,
    mBgType: String,
    showFindAll: String,
    centerLineWidth: String,
    tImg: String
  },
  methods: {
    openTable() {
      this.$emit("clickTertiaryTitle");
    }
  }
});
</script>
<style lang="scss" scoped>
.tertiary-title-box {
  position: relative;
  padding: 20px 0 0 0;
  margin-bottom: 30px;
  div {
    vertical-align: top;
    // border: 1px solid red;
  }
  .con-title {
    display: inline-block;
    .icon {
      display:inline-block;
      width:26px;
      height: 50px;
      background:url('../assets/images/common/moudle_title_2.png') no-repeat center/auto 100%;
      // margin-left: 21px;
    }
    span {
      vertical-align: top;
      display: inline-block;
      color: #ffffff;
      margin-left: 18px;
      height: 50px;
      font-size: 42px;
      line-height: 50px;
      letter-spacing: 2px;
    }
  }
  .center-line {
    display: inline-block;
    height: 1px;
    border-bottom: 2px solid rgba(197, 235, 239, 0.2);
    margin: 24px auto 24px auto;
  }
  .spots {
    position: absolute;
    right: 0px;
    top: 50px;
    /* width: 60px;
        height: 50px;
        text-align: center; */
    // cursor: pointer;
    z-index: 20;
    width: 10px;
    height: 10px;
    margin: 0 30px;
    background-color: #2494c4;
    box-shadow: 15px 0 #196789, 30px 0 rgb(36 148 196 / 12%);
  }
  .title-2 {
    width: 195px;
  }
  .line-2 {
    width: calc(100% - 325px);
  }
  .title-3 {
    width: 240px;
  }
  .line-3 {
    width: calc(100% - 370px);
  }
  .title-4 {
    width: 280px;
  }
  .line-4 {
    width: calc(100% - 410px);
  }
  .title-5 {
    width: 320px;
  }
  .line-5 {
    width: calc(100% - 450px);
  }
  .title-6 {
    width: 360px;
  }
  .line-6 {
    width: calc(100% - 490px);
  }
  .title-7 {
    width: 400px;
  }
  .line-7 {
    width: calc(100% - 530px);
  }
}
.tsub {
  .con-title img {
    margin-left: 0 !important;
  }
  .rihgt-img {
    right: 0 !important;
  }
  .title-6 {
    width: 340px;
  }
  .line-6 {
    width: calc(100% - 430px);
  }
  .title-7 {
    width: 380px;
  }
  .line-7 {
    width: calc(100% - 470px);
  }
}
</style>
