<!--
 * @Author: Binggan
 * @Date: 2022-03-01 16:52:17
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-04 11:12:41
 * @Description: 顶部栏
-->
<template>
  <div class="flex align-center header-nav">
    <div class="flex align-center justify-between left-screen">
      <div class="flex add-remain-list">
        <dl class="flex align-center">
          <dt>全国疫情</dt>
          <dd>
            <count-to
              class="text-cyan number"
              :startVal="startVal"
              :endVal="totalNum.countryAdd || 0"
            ></count-to>
            <span class="category-txt">今日新增</span>
          </dd>
          <dd>
            <count-to
              class="text-cyan number"
              :startVal="startVal"
              :endVal="totalNum.countryRemain || 0"
            ></count-to>
            <span class="category-txt">现有确诊</span>
          </dd>
        </dl>
        <dl class="flex align-center">
          <dt>自治区疫情</dt>
          <dd>
            <count-to
              class="text-cyan number"
              :startVal="startVal"
              :endVal="totalNum.localAdd || 0"
            ></count-to>
            <span class="category-txt">今日新增</span>
          </dd>
          <dd>
            <count-to
              class="text-cyan number"
              :startVal="startVal"
              :endVal="totalNum.localRemain || 0"
            ></count-to>
            <span class="category-txt">现有确诊</span>
          </dd>
        </dl>
      </div>
      <div class="search-list">
        <button class="item person clickable hover-scale">人员</button>
        <button class="item car clickable hover-scale">车辆</button>
        <button class="item car clickable hover-scale">货车</button>
      </div>
    </div>
    <h2 class="full-flex center-screen title">疫情防控指挥系统</h2>
    <div class="flex align-center justify-between right-screen">
      <div class="part-trace text-center">
        <i class="icon-trace"></i>
        <span>人员流动</span>
      </div>
      <ul class="flex right-part">
        <li>{{ curTime.date }}</li>
        <li>{{ curTime.time }}</li>
        <li>星期{{ curTime.week }}</li>
        <li class="clickable hover-scale text-brown" @click="handleLogout">
          <span>退出登录</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { parseTime } from "@/utils";
export default {
  data() {
    return {
      startVal: 0,
      totalNum: {
        countryAdd: 20,
        countryRemain: 188,
        localAdd: 0,
        localRemain: 0
      },
      curTime: {}
    };
  },
  mounted() {
    const timer = setInterval(() => {
      this.getCurTime();
    }, 1000);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },
  methods: {
    getCurTime() {
      const timestamp = new Date();
      const timeRes = parseTime(timestamp, "{y}-{m}-{d} {h}:{i}:{s} {a}").split(
        " "
      );
      this.curTime = {
        date: timeRes[0],
        time: timeRes[1],
        week: timeRes[2]
      };
    },
    handleLogout() {
      /* this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("user/LogOut").then(() => {
            location.href = "/index";
          });
        })
        .catch(() => {}); */
      this.$store.dispatch("user/LogOut").then(() => {
        location.href = "/index";
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.header-nav {
  /* position: fixed;
    top: 0;
    left: 0; */
  width: 100%;
  height: 120px;
  // z-index: 3337;
  background: url("../../../../assets/images/common/header_bg.png") no-repeat;
  background-size: 100% 100%;
  color: #fff;
  margin-bottom:20px;
  .left-screen {
    width: 2048px;
    padding: 0 30px;
  }
}
.add-remain-list {
  dl {
    position: relative;
    padding: 0 35px;
    text-align: center;
    &:not(:last-child):after {
      content: "";
      position: absolute;
      border-right: 3px solid #02d6f9;
      height: 60px;
      top: 50%;
      right: 0;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
    }
    dt {
      font-size: 40px;
      letter-spacing: 3px;
    }
    dd {
      margin: 0 24px;
    }
    .number {
      display: block;
      font-size: 42px;
      letter-spacing: 2px;
      margin-bottom: 5px;
    }
    .category-txt {
      display: block;
      font-size: 26px;
      color: rgba(255, 255, 255, 0.8);
    }
  }
}
.search-list {
  position: relative;
  margin-left: 35px;
  button.item {
    width: 150px;
    height: 67px;
    line-height: 67px;
    font-size: 22px;
    color: #91f6fd;
    padding-left: 72px;
    background-color: transparent;
    border: none;
    outline: none;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    &:not(:last-child) {
      margin-right: 35px;
    }
    &.person {
      background-image: url("../../../../assets/images/screen/ryss.png");
    }
    &.car {
      background-image: url("../../../../assets/images/screen/clss.png");
    }
  }
}
.title {
  text-align: center;
  font-size: 60px;
  font-weight: 500;
  color: #d8d8d8;
  letter-spacing: 18px;
}
.right-screen {
  width: 2048px;
  .part-trace {
    width: 150px;
    .icon-trace {
      display: block;
      width: 60px;
      height: 60px;
      margin: 0 auto;
      background-image: url("../../../../assets/images/common/local.png");
      background-size: cover;
    }
    span {
      font-size: 30px;
    }
  }
  .right-part {
    li {
      padding: 0 25px;
      letter-spacing: 4px;
      &:not(:last-child) {
        position: relative;
        &:after {
          content: "";
          position: absolute;
          border-right: 1px solid #ffffff;
          height: 40px;
          top: 50%;
          right: 0;
          margin-top: -20px;
        }
      }
    }
  }
}
.search-dialog {
  position: absolute;
  right: 27px;
  width: 530px;
  top: 87px;
  padding: 40px;
  background-color: rgb(4 40 74);
  border: 2px solid #68d3f2;
  box-shadow: 0 7px 30px #01172b;
  border-radius: 14px;
}
</style>
