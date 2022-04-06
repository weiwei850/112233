<!--
 * @Author: Binggan
 * @Date: 2022-03-02 17:24:34
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-04 12:30:25
 * @Description:标题
-->
<template>
  <div class="flex align-center right-screen-title">
    <span class="dot"></span>
    <h3 class="title">
      <slot></slot>
    </h3>

    <span class="full-flex line"> </span>

    <span class="spots"></span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.right-screen-title {
  position: relative;
  padding: 20px 0;
  flex-wrap: nowrap;
  .dot {
    position: relative;
    content: "";
    width: 46px;
    height: 44px;
    border: 2px solid #fff;
    z-index: 1;
    flex-shrink: 0;
    &:after {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      top: 20px;
      left: 22px;
      background-color: #68c549;
      z-index: 0;
    }
  }
  h3 {
    position: relative;
    font-size: 50px;
    letter-spacing: 2px;
    margin: 0 70px 0 50px;
    &:after {
      position: absolute;
      height: 2px;
    }
  }

  .line {
    height: 2px;
    background-color: rgba(197, 235, 239, 0.2);
    margin-right: 30px;
    flex-shrink: 0;
  }
  .spots {
    width: 10px;
    height: 10px;
    margin: 0 30px;
    background-color: #2494c4;
    box-shadow: 15px 0 #196789, 30px 0 rgb(36 148 196 / 12%);
  }
}
</style>
