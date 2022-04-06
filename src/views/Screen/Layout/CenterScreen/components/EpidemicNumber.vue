<!--
 * @Author: Binggan
 * @Date: 2022-03-04 17:46:08
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-04 18:28:39
 * @Description:疫情数据
-->
<template>
  <ul class="flex epidemic-number-wrapper">
    <li class="padding-content item">
      <label>确诊</label>
      <p class="number">
        <span class="text-brown">{{ countData.confirmedExist || 0 }}</span>
        <span class="separator">{{ countData.confirmed || 0 }}</span>
      </p>
    </li>
    <li class="padding-content item">
      <label>无症状感染</label>
      <p class="number">
        <span class="text-orange">{{ countData.silentExist || 0 }}</span>
        <span class="separator">{{ countData.silent || 0 }}</span>
      </p>
    </li>
    <li class="padding-content item">
      <label>疑似</label>
      <p class="number">
        <span class="text-orange">{{ countData.seeminglyExist || 0 }}</span>
        <span class="separator">{{ countData.seemingly || 0 }}</span>
      </p>
    </li>
    <li class="padding-content item">
      <label>接触者</label>
      <p class="number">
        <span class="text-orange">{{ countData.seeminglyExist || 0 }}</span>
        <span class="separator">{{ countData.seemingly || 0 }}</span>
      </p>
    </li>
    <li class="padding-content item">
      <label>发热门诊</label>
      <p class="number"><!-- text-center -->
        <span class="text-orange">{{ countData.seeminglyExist || 0 }}</span>
      </p>
    </li>
    <li class="padding-content item">
      <label class="icon peril">风险等级</label>
      <p class="number">
        <span class="text-cyan">{{ countData.seeminglyExist || 0 }}</span>
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      countData: {}
    };
  }
};
</script>

<style lang="scss" scoped>
.epidemic-number-wrapper {
  width: 100%;
  .item {
    flex: 1;
    background-color: $theme-color;
    &:not(:last-child) {
      margin-right: 30px;
    }
    label {
      display: block;
      position: relative;
      font-size: 40px;
      margin-bottom: 30px;
      &.icon {
        height: 34px;
        background-repeat: no-repeat;
        background-size: auto 100%;
        padding-right: 80px;
        background-position: center right;
        &.peril {
          background-image: url("../../../../../assets/images/screen/center_yl1.png");
        }
      }
      &:after {
        position: absolute;
        content: "";
        height: 4px;
        width: 1em;
        background-color: $--color-success;
        bottom: -8px;
        left: 0;
      }
    }
    .number span {
      font-size: 42px;
      &:first-child {
        font-size: 62px;
      }
      &.separator {
        position: relative;
        padding-left: 38px;
        margin-left: 10px;
        &:before {
          content: "/";
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
  }
}
</style>
