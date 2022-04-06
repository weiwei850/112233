<!--
 * @Author: Binggan
 * @Date: 2022-03-04 19:49:43
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-04 20:03:48
 * @Description: 应急值守
-->
<template>
  <div class="duty-list">
    <ThreeDegreeTitle
      class="center-title"
      mTitle="应急值守"
      mBgType="title-9"
      showFindAll="1"
    >
    </ThreeDegreeTitle>

  </div>
</template>

<script>
import ThreeDegreeTitle from "@/components/ThreeDegreeTitle.vue";
export default {
    components: {
        ThreeDegreeTitle
    }
};
</script>

<style lang="scss" scoped>
.duty-list {
  @include bg-opacity($base-background-color, 0.6);
  padding: 25px;
}
</style>
