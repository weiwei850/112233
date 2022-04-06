<!--
 * @Author: Binggan
 * @Date: 2022-03-03 12:07:37
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-08 23:12:23
 * @Description:8+N预警
-->
<template>
  <div class="flex flex-direction page-part-warning">
    <ThreeDegreeTitle
      class="center-title"
      mTitle="8+N预警"
      mBgType="title-6"
      showFindAll="1"
    >
      <div class="time-tab">
        <div
          class="tab"
          :class="[
            'align-center text-center',
            { 'tab-actived': activeIndex == index },
          ]"
          v-for="(item, index) in warningTypes"
          :key="index"
          @click="changeWarningType(index)"
        >
          {{ item.label }}
        </div>
      </div>
    </ThreeDegreeTitle>

    <el-row class="full-flex content flex warning-list-box" :gutter="30">
      <el-col
        :span="6"
        class="list-item"
        v-for="(item, index) in activeList"
        :key="index + item.label"
      >
        <div class="flex flex-direction card-item hover-scale">
          <h4 class="text-center">{{ item.label }}</h4>
          <div class="full-flex flex align-center justify-around item">
            <div class="full-flex number-count">
              <p class="number-txt">
                今日
                <countTo
                  class="number text-orange"
                  :endVal="warningDatas[item.bigCode]?warningDatas[item.bigCode]['jr_hj']:0"
                ></countTo>
                <!-- <span class="number">0</span> -->
              </p>
              <p class="number-txt">
                累计
                <countTo class="number" :endVal="warningDatas[item.bigCode]?warningDatas[item.bigCode]['lj_hj']:0"></countTo>
              </p>
            </div>
            <div class="icon">
              <img :src="require('@/assets/images' + item.icon)" />
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        :span="24"
        class="list-item"
        v-if="activeList.length <= 5"
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import { getWarningDatas } from "@/apis/rightScreen";
import { parseTime } from "@/utils";
import ThreeDegreeTitle from "@/components/ThreeDegreeTitle.vue";
export default {
  data() {
    return {
      warningTypes: [
        {
          label: "8",
          list: [
            {
              label: "发热门诊",
              icon: "/screen/zybz_1.png",
              bigCode: "EVENT_TYPE_0910"
            },
            {
              label: "常态化核酸",
              icon: "/screen/yjcz_sjfb_4.png",
              bigCode: "EVENT_TYPE_0915"
            },
            {
              label: "重点区域外环境常态化",
              icon: "/screen/yjcz_sjfb_2.png",
              bigCode: "EVENT_TYPE_09101005"
            },
            { label: "环境消毒", icon: "/screen/yjsj_lx_3.png" },
            {
              label: "中高风险区域人员发现",
              icon: "/screen/yjsj_lx_2.png",
              bigCode: "EVENT_TYPE_0914"
            },
            {
              label: "中高风险区域货物发现",
              icon: "/screen/yjcz_4.png",
              bigCode: "EVENT_TYPE_0913"
            },
            { label: "人员不聚集", icon: "/screen/ymjz_2.png" },
            {
              label: "健康码异常",
              icon: "/screen/jj.png",
              bigCode: "EVENT_TYPE_0917"
            }
          ]
        },
        {
          label: "N",
          list: [
            {
              label: "门磁",
              icon: "/screen/yjsj_lx_3.png",
              bigCode: "EVENT_TYPE_0925"
            },
            {
              label: "入市申报异常",
              icon: "/screen/yjsj_lx_3.png",
              bigCode: "EVENT_TYPE_0928"
            }
          ]
        }
      ],
      activeIndex: 0,
      warningDatas: {}
    };
  },
  computed: {
    activeList() {
      return this.warningTypes[this.activeIndex].list;
    }
  },
  components: {
    ThreeDegreeTitle
  },
  created() {
    this.getDatas();
  },
  methods: {
    changeWarningType(index) {
      this.activeIndex = index;
    },
    getDatas() {
      const params = {
        status: this.activeIndex + 1,
        qxdm: "6501%",
        startTime: parseTime(new Date(), "{yyyy}-{mm}-{dd}")
      };
      getWarningDatas(params).then((res) => {
        res.data.forEach((item) => {
          const { jr_hj, lj_hj } = item;
          console.log("item", item)
          this.$set(this.warningDatas, item.bigcode, { jr_hj, lj_hj });
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.page-part-warning {
  margin-top: 30px;
  .content {
    background-color: $base-dark-white;
    padding: 30px;
    border-radius: 15px;
    padding-bottom: 0;
    .card-item {
      height: 100%;
      padding: 30px;
      background-color: $screen-content-bg;
      margin-bottom: 30px;
      border-radius: 30px;
      h4 {
        height: 60px;
        line-height: 60px;
        font-size: 32px;
        background-image: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.06) 0%,
          rgba(255, 255, 255, 0) 100%,
          rgba(255, 255, 255, 0) 100%
        );
        margin-bottom: 30px;
      }
      .number {
        font-size: 38px;
        vertical-align: middle;
      }
    }
    .item {
      .icon {
        width: 70px;
        height: 70px;
        margin-left: 20px;
      }
    }
  }
  .center-title {
    display: flex;
    .time-tab {
      display: flex;
      justify-content: center;
      width: 70%;
      .tab {
        width: 200px;
        height: 50px;
        font-size: 35px;
        margin-bottom: 0;
        margin-right: 50px;
        border-radius: 50px 0 50px 0;
        background-color: $theme-light-color;
        opacity: 0.33;
        cursor: pointer;
        &-actived {
          opacity: 1;
        }
      }
    }
  }
  .warning-list-box .list-item {
    padding-bottom: 30px;
  }
}
</style>
