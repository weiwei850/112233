<!--
 * @Author: Binggan
 * @Date: 2022-03-04 16:53:02
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-04 17:43:34
 * @Description:流调
-->
<template>
  <div class="padding-content epidemiology">
    <ThreeDegreeTitle
      class="center-title"
      mTitle="流行病学调查"
      mBgType="title-9"
      showFindAll="1"
    >
    </ThreeDegreeTitle>
    <ul class="list hover-scale">
      <li
        class="flex justify-between item"
        v-for="item in lists"
        :key="item.label"
      >
        <span class="label">{{item.label}}</span>
        <span class="count">{{ countNumbers[item.prop] || 0 }} 人</span>
      </li>
    </ul>
  </div>
</template>

<script>
import ThreeDegreeTitle from "@/components/ThreeDegreeTitle.vue";
export default {
  data() {
    return {
      lists: [
        {
          label: "协查",
          prop: "field1"
        },
        {
          label: "流调",
          prop: "field2"
        },
        {
          label: "接触者",
          prop: "field3"
        }
      ],
      countNumbers: {}
    };
  },
  components: {
    ThreeDegreeTitle
  }
};
</script>

<style lang="scss" scoped>
.epidemiology {
  margin-top: 30px;
  background-image: linear-gradient(
    270deg,
    rgba(2, 16, 44, 0.7) 0%,
    rgba(20, 66, 114, 0.7) 100%
  );
  .list{
      padding:20px 55px 20px 130px;
      background-image: url("../../../../../assets/images/screen/sdm-ry.png");
      background-repeat: no-repeat;
      background-position: left center;
      background-size: 150px auto;
      .item{
        &:not(:last-child){
            margin-bottom:40px;
        }
      }
      .label{
          font-size: 42px;
      }
      .count{
          font-size: 50px;
      }
  }
}
</style>
