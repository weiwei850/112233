<!--
 * @Author: Binggan
 * @Date: 2022-03-02 17:01:39
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-08 16:49:07
 * @Description:大屏中屏
-->
<template>
  <div class="flex">
    <div class="flex full-height flex-direction part-left">
      <NucleinCheck class="full-flex"></NucleinCheck>
      <EpidemiologySurvey></EpidemiologySurvey>
    </div>
    <div class="full-flex flex flex-direction justify-between part-center">
      <EpidemicNumber></EpidemicNumber>
      <!-- <div class="full-flex"></div> -->
      <CenterBottom></CenterBottom>
    </div>
    <div class="flex full-height flex-direction part-right">
      <Pikzed class="full-flex"></Pikzed>
      <DutyList class="margin-30-t"></DutyList>
    </div>
  </div>
</template>

<script>
import NucleinCheck from "./components/NucleinCheck.vue";
import EpidemiologySurvey from "./components/EpidemiologySurvey.vue";
import EpidemicNumber from "./components/EpidemicNumber.vue";
import Pikzed from "./components/Pikzed.vue";
import DutyList from "./components/DutyList.vue";
import CenterBottom from "./components/CenterBottom.vue";
export default {
  components: {
    NucleinCheck,
    EpidemiologySurvey,
    EpidemicNumber,
    Pikzed,
    DutyList,
    CenterBottom
  }
};
</script>

<style lang="scss" scoped>
.part-left,
.part-right{
  width: 675px;
}
.part-center{
  margin:0 30px;
}
</style>
