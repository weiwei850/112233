<!--
 * @Author: Binggan
 * @Date: 2022-03-01 20:12:16
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-08 16:28:58
 * @Description:
-->
<template>
  <div class="l-sdm-modular">
    <div class="content-box">
      <div class="address-tab com-flex">
        <div
          :class="[
            'tab',
            'com-flex',
            'hover-scale',
            { 'tab-actived': activedTab == index },
          ]"
          v-for="(item, index) in tabList"
          :key="index"
          @click.stop="changeDoor(index)"
        >
          <img
            :src="activedTab == index ? item.imgActive : item.imgNormal"
            class="tab-img"
          />
          <span
            :class="['tab-title', { 'tab-actived': activedTab == index }]"
            >{{ item.title }}</span
          >
          <img
            :src="require('@/assets/images/screen/sdm-tab-bottom.png')"
            v-show="activedTab == index"
            class="tab-active-line"
          />
        </div>
        <div class="choose-qx-title">
          {{ chooseQxName }}
        </div>
        <div class="qxform-wrap">
          <el-form inline>
            <el-form-item v-if="authLevel == '2' && activedTab >= 1">
              <el-select
                class="search-input"
                v-model="formData.qx"
                :popper-append-to-body="false"
                @change="searchArea"
                placeholder="请选择区县"
              >
                <el-option
                  v-for="item in formListOption"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="activedTab == 2">
              <el-select
                class="search-input"
                v-model="formData.sq"
                :popper-append-to-body="false"
                @change="searchAreaSq"
                placeholder="请选择街道"
              >
                <el-option
                  v-for="item in jdOptions"
                  :key="item.code"
                  :label="item.jgmc"
                  :value="item.code"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <div class="tab-content com-flex" v-baseLoading="loading">
        <div :class="['com-flex', 'rw-box']">
          <img
            :src="require('@/assets/images/screen/sdm-line2.png')"
            class="top-long-line"
            v-show="activeRoad != 0"
          />
          <div
            class="con-left-box com-flex hover-scale"
            v-for="(item, index) in rwTabList"
            :key="index"
            @click="changePosition(index)"
          >
            <img
              class="top-border-line"
              :src="require('@/assets/images/screen/sdm-line1.png')"
              v-show="rwActiveTab == index"
            />
            <img class="rw-icon" :src="item.imgUrl" />
            <div class="info-box" @click="openFrame(item.frameId)">
              <p>{{ item.title }}</p>
              <countTo
                class="number text-cyan"
                :separator="''"
                :endVal="rwDatas[item.key] || 0"
              ></countTo>
            </div>
          </div>
        </div>
        <div :class="['com-flex', 'road-box']">
          <img
            :src="
              activeRoad == 0
                ? require('@/assets/images/screen/sdm-line2.png')
                : require('@/assets/images/screen/sdm-line1.png')
            "
            :class="[
              { 'active-line2': activeRoad == 0 },
              { 'road-top-line1': activeRoad == 1 },
              { 'road-top-line2': activeRoad == 2 },
              { 'road-top-line3': activeRoad == 3 },
            ]"
          />
          <div class="com-road-info hover-scale" @click.stop="roadChange(3)">
            <p>机场</p>
            <countTo
              class="number text-cyan"
              :separator="''"
              :endVal="branchDatas.jcrwrs || 0"
            ></countTo>
          </div>
          <div class="com-road-info hover-scale" @click.stop="roadChange(1)">
            <p>铁路</p>
            <countTo
              class="number text-cyan"
              :separator="''"
              :endVal="branchDatas.tlrwrs || 0"
            ></countTo>
          </div>
          <div class="com-road-info hover-scale" @click.stop="roadChange(2)">
            <p>公路</p>
            <countTo
              class="number text-cyan"
              :separator="''"
              :endVal="branchDatas.glrwrs || 0"
            ></countTo>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parseTime } from "@/utils";
import {
  getArrivalPerson,
  getArrivalCar,
  getArrivalGoods
} from "@/apis/leftScreen";
export default {
  name: "ThreeDoors",
  //   mixins: [mixinMethods],
  data() {
    return {
      loading: false,
      tabList: [
        {
          title: "市门",
          imgActive: require("@/assets/images/screen/sdm-shi-active.png"),
          imgNormal: require("@/assets/images/screen/sdm-shi.png")
        },
        {
          title: "区县门",
          imgActive: require("@/assets/images/screen/sdm-qu-active.png"),
          imgNormal: require("@/assets/images/screen/sdm-qu.png")
        },
        {
          title: "街道门",
          imgActive: require("@/assets/images/screen/sdm-xian-active.png"),
          imgNormal: require("@/assets/images/screen/sdm-xian.png")
        }
      ],
      chooseQxName: "",
      activedTab: 0,
      rwTabList: [
        {
          title: "入市人员",
          imgUrl: require("@/assets/images/screen/sdm-ry.png"),
          key: "person",
          frameId: "arrivePersonData"
        },
        {
          title: "入市车辆",
          imgUrl: require("@/assets/images/screen/sdm-cl.png"),
          key: "car",
          frameId: "arriveCarData"
        },
        {
          title: "入市货物",
          imgUrl: require("@/assets/images/screen/sdm-hw.png"),
          key: "freight",
          frameId: "arriveFreightData"
        }
      ],
      rwActiveTab: 0,
      rwDatas: {},
      formData: {
        qx:
          sessionStorage.getItem("authLevel") === "3"
            ? sessionStorage.getItem("islogin")
            : "",
        sq: ""
      },
      formListOption: [],
      jdOptions: [],
      firstPlace: false,
      rwRyRoad: "",
      rwHwRoad: "",
      rwClroad: "",
      startDate: "", // 开始时间
      endDate: "", // 结束时间

      activeRoad: 0,
      qxCode: "",
      sqCode: "",
      authLevel: "2",

      arrivePersonData: {}, // 入市人员
      arriveCarData: {}, // 入市车辆
      arriveFreightData: {} // 入市货物
      // branchDatas: {} // 铁公机数量
    };
  },
  computed: {
    branchDatas() {
      // 铁公机数量
      const keys = ["arrivePersonData", "arriveCarData", "arriveFreightData"];
      return this[keys[this.rwActiveTab]];
    }
  },
  created() {
    // this.getOptions();
    this.authLevel = 2;

    this.getInitDatas();
  },
  methods: {
    getInitDatas() {
      // 获取相关数据
      this.loading = true;
      const startTime = parseTime(new Date(), "{yyyy}-{mm}-{dd}") + " 00:00:00";
      const endTime = parseTime(new Date(), "{yyyy}-{mm}-{dd} {hh}:{ii}:{ss}");
      Promise.all([
        getArrivalPerson({ qxdm: "6501%", startTime, endTime }),
        getArrivalCar(),
        getArrivalGoods()
      ])
        .then(
          ([
            { data: arrivePersonData },
            { data: arriveCarData },
            { data: arriveFreightData }
          ]) => {
            this.arrivePersonData = arrivePersonData[0] || {};
            this.arriveCarData = arriveCarData[0] || {};
            this.arriveFreightData = arriveFreightData[0] || {};
            this.rwDatas = {
              person: this.arrivePersonData["rwzrs"],
              car: this.arriveCarData["rwcl"],
              freight: this.arriveFreightData["rwzhw"]
            };
            console.log("---all---", arrivePersonData, arriveCarData);
          }
        )
        .finally(() => {
          this.loading = false;
        });
    },
    search() {
      this.searchData();
      this.rwList();
    },
    changeDoor(index) {
      // authLevel==2 市门
      /* if (this.authLevel === 2) {
        this.changeTab(index);
      } else if (this.authLevel === 3) {
        index !== 0 ? this.changeTab(index) : "";
      } */

      // 三道门  市门、区县门切换
      this.activedTab = index;
    },
    // 三道门  市门、区县门切换
    changeTab(index) {
      this.activedTab = index;
      // this.search();
    },
    // 入市切换   人员  车辆 货物
    changePosition(index) {
      this.rwActiveTab = index;
      this.activeRoad = 0;
      // this.firstPlace = false;
    },
    // 铁公机
    roadChange(val) {
      // this.activeRoad = val;
      // this.rwActiveTab = -1;
      // this.firstPlace = true;
    },
    // 入市车辆新接口
    searchData() {
      this.loading = true;

      console.log("this.formData.sq ==========>", this.formData);

      // 入市总数code
      const rwclzsCode = this.formData.qx
        ? "DP-JDM-RWCL-ZS-DR"
        : "DP-QXM-RWCL-ZS-DR";
      // 地区code
      const xzCode = this.formData.sq
        ? this.formData.sq.slice(0, 9) + "%"
        : this.formData.qx
        ? this.formData.qx.slice(0, 6) + "%"
        : "6501%";

      this.getWlmqCommonInfo({
        code: rwclzsCode,
        condition: [{ name: "qxdm", value: xzCode }]
      })
        .then((result) => {
          console.log("入市车辆新接口", result);
          this.rwDatas.rw_cl_hj = result[0].RWCL;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 入市
    rwList(index) {
      /* const xzCode = this.formData.sq
        ? this.formData.sq.slice(0, 9) + "%"
        : this.formData.qx
        ? this.formData.qx.slice(0, 6) + "%"
        : "6501%";
      this.loading = true; */
    },

    // 选择区县
    searchArea(val) {
      console.log("val", val);
    },

    // 选择社区
    searchAreaSq(val) {
      console.log("val", val);
    },

    openFrame(id) {
      // this.branchDatas = { ...this[id] }
      /* this.$emit("changeLeftFrameData", {
        id,
        data,
      }); */
    }
  }
};
</script>

<style lang="scss" scoped>
.l-sdm-modular {
  position: relative;
  margin-top: 10px;
  @include bg-opacity(#fff, 0.02);

  .com-flex {
    display: flex;
    align-items: center;
  }

  .click-disabled {
    cursor: no-drop !important;
  }

  .content-box {
    padding: 0 70px;
    width: 100%;

    .address-tab {
      justify-content: center;
      padding-bottom: 40px;
      position: relative;
      .choose-qx-title {
        position: absolute;
        right: 14%;
        font-size: 32px;
        color: #ffffff;
        top: -50px;
      }

      .tab {
        font-size: 40px;
        color: #ffffff;
        line-height: 48px;
        margin-right: 63px;
        position: relative;

        .tab-active-line {
          position: absolute;
          bottom: -20px;
          left: 0;
          width: 100%;
          height: 14px;
        }
      }

      &:nth-of-type(1) {
        .tab {
          .tab-img {
            width: 60px;
            height: 67px;
          }
        }
      }
      &:nth-of-type(2) {
        .tab {
          .tab-img {
            width: 67px;
            height: 66px;
          }
        }
      }
      &:nth-of-type(3) {
        .tab {
          .tab-img {
            width: 77px;
            height: 66px;
          }
        }
      }

      .tab-title {
        opacity: 0.35;
        padding-left: 24px;
      }

      .tab-actived {
        opacity: 1;
      }
    }

    .qxform-wrap {
      position: absolute;
      top: 0;
      right: 0;
      ::v-deep .el-select-dropdown {
        width: 100%;
        top: 40px !important;
      }

      .sq-form-width::v-deep .search-input.el-select {
        width: 275px;
      }
    }

    .tab-content {
      @include bg-opacity(#fff, 0.02);
      padding: 0 31px;
      height: 350px;
      position: relative;

      .first-rw-active {
        position: absolute !important;
        top: 27px;
        left: 31px;
      }

      .com-end-place {
        position: absolute !important;
        top: 27px;
        right: 31px;
      }

      .first-road-active {
        position: absolute !important;
        top: 27px;
        left: 31px;
      }

      .rw-box {
        position: relative;

        .top-long-line {
          position: absolute;
          width: 100%;
          height: 8px;
          left: 0;
          top: 0;
        }
      }

      .con-left-box {
        width: 364px;
        height: 294px;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.06),
          rgba(255, 255, 255, 0) 100%,
          rgba(255, 255, 255, 0) 100%
        );
        padding-left: 26px;
        margin-right: 23px;
        cursor: pointer;
        position: relative;

        .top-border-line {
          position: absolute;
          width: 364px;
          height: 8px;
          left: 0;
          top: 0;
        }
      }

      .number {
        font-size: 50px;
        line-height: 65px;
        height: 65px;
      }
      .info-box {
        margin-left: 30px;
        letter-spacing: 5px;

        p {
          font-size: 36px;
          height: 43px;
          color: #ffffff;
          line-height: 43px;
          margin-bottom: 30px;
        }
      }

      .road-box {
        background: rgba(255, 255, 255, 0.02);
        width: 598px;
        height: 289px;
        padding: 0 24px;
        text-align: center;
        justify-content: center;
        position: relative;

        .active-line2 {
          position: absolute;
          width: 100%;
          height: 8px;
          left: 0;
          top: 0;
        }

        .road-top-line1 {
          position: absolute;
          width: 33%;
          height: 8px;
          left: 0;
          top: 0;
        }
        .road-top-line2 {
          position: absolute;
          width: 33%;
          height: 8px;
          left: 33%;
          top: 0;
        }
        .road-top-line3 {
          position: absolute;
          width: 33%;
          height: 8px;
          left: 66%;
          top: 0;
        }

        .com-road-info {
          position: relative;
          padding: 0 24px;
          letter-spacing: 5px;
          cursor: pointer;

          p {
            height: 43px;
            font-size: 36px;
            color: #ffffff;
            line-height: 43px;
          }

          &::after {
            content: "";
            width: 3px;
            height: 96px;
            display: block;
            background: linear-gradient(
              180deg,
              rgba(37, 174, 222, 0) 0%,
              #25aede 55%,
              rgba(37, 174, 222, 0) 100%
            );
            opacity: 0.38;
            position: absolute;
            right: 0;
            top: 5%;
          }

          &:last-of-type::after {
            display: none;
          }
        }
      }
    }
  }
}
</style>
