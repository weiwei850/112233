<!--
 * @Author: Binggan
 * @Date: 2022-02-28 11:25:05
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-04 15:49:32
 * @Description:
-->
<template>
  <div class="big-screen-wrapper">
    <MapContainer class="bg-map"/>
    <div class="flex flex-direction screen-content-wrapper">
      <TopHeader></TopHeader>
      <div class="full-flex flex screen-main">
        <leftScreen class="full-height left-screeen"></leftScreen>

          <centerScreen class="full-height full-flex center-screen"></centerScreen>

        <rightScreen class="full-height right-screen"></rightScreen>
      </div>
    </div>
  </div>
</template>

<script>
import MapContainer from "./Layout/MapScreen";
import TopHeader from "./Layout/TopHeader";
import leftScreen from "./Layout/LeftScreen";
import rightScreen from "./Layout/RightScreen";
import centerScreen from "./Layout/CenterScreen";
export default {
  name: "Screen",
  components: {
    MapContainer,
    TopHeader,
    leftScreen,
    rightScreen,
    centerScreen
  }
};
</script>

<style lang="scss" scoped>
.big-screen-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  //   background: url("../../assets/images/common/common_bg.png") no-repeat;
  background-repeat: no-repeat;
  background-color: #0a222b;
  background-size: 100% 100%;

  .bg-map {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .screen-content-wrapper {
    position: relative;
    height: 100%;
    z-index: 1;
  }
}
.screen-main{
  .left-screeen,.right-screen{
    width: 2048px;
  }
  .center-screen{
    padding-left: 30px;
    padding-right:30px;
  }
}
</style>
