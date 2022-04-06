<!--
 * @Author: Binggan
 * @Date: 2022-03-04 12:51:24
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-08 16:39:25
 * @Description:核酸检测
-->
<template>
  <div class="flex flex-direction nuclein-check-wrapper">
    <ThreeDegreeTitle
      class="center-title"
      mTitle="各区县核酸检测分布"
      mBgType="title-9"
      showFindAll="1"
    >
    </ThreeDegreeTitle>

    <base-table
      class="full-flex"
      :loading="loading"
      :data="tableData"
      style="width: 100%; border: none"
      stripe
      show-summary
      height="1178"
      row-class-name="base-table-summary"
      :columns="tableColumns"
    />
  </div>
</template>

<script>
import { getArrivalPerson } from "@/apis/centerScreen";
import ThreeDegreeTitle from "@/components/ThreeDegreeTitle.vue";
export default {
  data() {
    return {
      loading: false,

      tableColumns: [
        {
          name: "区县名称",
          prop: "name"
        },
        {
          name: "今日已检",
          prop: "drjcrs"
        },
        {
          name: "14天已检",
          prop: "ljjcrs"
        }
      ],
      tableData: []
    };
  },
  components: {
    ThreeDegreeTitle
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.loading = true;
      getArrivalPerson().then((res) => {
        this.tableData = res.data;
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.nuclein-check-wrapper {
  @include bg-opacity($base-background-color, 0.6);
  padding: 25px;
}
</style>
