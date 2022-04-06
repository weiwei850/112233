<!--
 * @Author: Binggan
 * @Date: 2022-03-04 20:04:13
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-04 20:34:32
 * @Description:
-->
<template>
  <ul class="flex center-bottom-wrapper">
    <li
      class="full-flex hover-scale"
      v-for="item in summaryList"
      :key="item.prop"
    >
      <label>{{ item.label }}</label>
      <div class="count-txt">
        <p>注册总数</p>
        <p class="text-cyan text-right">
          <countTo :endVal="summaryData[item.prop] || 0"></countTo>
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      summaryData: {},
      summaryList: [
        {
          label: "健康服务码",
          subTitle: "注册总数",
          prop: "healthCodeUsers"
        },
        {
          label: "场所码",
          subTitle: "申领总数",
          prop: "placeCodeUsers"
        },
        {
          label: "疫苗接种",
          subTitle: "累计全程接种",
          prop: "fullVaccine"
        },
        {
          label: "资源保障",
          subTitle: "医疗机构",
          prop: "medical"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.center-bottom-wrapper {
  @include bg-opacity($base-background-color, 0.6);
  padding: 30px;
  li {
    padding: 20px;
    @include bg-opacity($base-background-color, 0.95);
    font-size: 45px;
    border-radius: 15px;
    &:not(:last-child){
        margin-right: 30px;
    }
  }
  .count-txt {
    margin-top: 20px;
  }
}
</style>
