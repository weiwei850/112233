<!--
 * @Author: Binggan
 * @Date: 2022-03-02 17:16:54
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-04 12:31:14
 * @Description:大屏-右屏
-->
<template>
  <div class="flex flex-direction page-right-screen">
    <!-- 早发现 & 快处置 -->
    <el-row class="part-one" :gutter="60">
      <el-col class="content" :span="12">
        <list-title-block>早发现</list-title-block>
        <div class="block">
          <h4 class="text-white-light">预警</h4>
          <div class="flex align-center desc">
            <i class="icon warning"></i>
            <div class="full-flex flex justify-around">
              <div class="text-center count-txt">
                <!-- <p class="count text-orange">{{ warning.today || 0 }}</p> -->
                <countTo
                  class="count text-orange"
                  :endVal="warning.today || 0"
                ></countTo>
                <p class="text">今日</p>
              </div>
              <div class="text-center count-txt">
                <countTo
                  class="count text-orange"
                  :endVal="warning.sum || 0"
                ></countTo>
                <p class="text">累计</p>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col class="content" :span="12">
        <list-title-block>快处置</list-title-block>
        <div class="block">
          <h4 class="text-white-light">处置</h4>
          <div class="flex align-center desc">
            <i class="icon exec"></i>
            <div class="full-flex flex justify-around handle-list">
              <div class="flex count-txt">
                <p class="text">待响应</p>
                <!-- <p class="full-flex count text-orange">
                  {{ handle.respond || 0 }}
                </p> -->
                <countTo
                  class="full-flex count text-orange"
                  :endVal="handle.respond || 0"
                ></countTo>
              </div>
              <div class="flex count-txt">
                <p class="text">待处置</p>
                <!-- <p class="count text-orange">{{ handle.dispose || 0 }}</p> -->
                <countTo
                  class="count text-orange"
                  :endVal="handle.dispose || 0"
                ></countTo>
              </div>
              <div class="flex count-txt">
                <p class="text">处置中</p>
                <div class="full-flex count">
                  <!-- <span class="text-orange">{{ handle.disposing || 0 }}</span> -->
                  <countTo
                    class="text-orange"
                    :endVal="handle.dispose || 0"
                  ></countTo>
                  <span class="separator">/</span>
                  <!-- <span>{{ handle.disposingTotal || 0 }}</span> -->
                  <countTo :endVal="handle.disposingTotal || 0"></countTo>
                </div>
              </div>
              <div class="flex count-txt">
                <p class="text">已完成</p>
                <div class="full-flex count">
                  <countTo
                    class="text-orange"
                    :endVal="handle.disposing || 0"
                  ></countTo>
                  <span class="separator">/</span>
                  <countTo :endVal="handle.disposingTotal || 0"></countTo>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 早发现 & 快处置  END-->

    <!-- 8+N预警 -->
    <Warnings class="full-flex"></Warnings>
    <!-- 8+N预警 END -->

    <!-- 早隔离 & 早治疗 & 早报告 -->
    <el-row class="flex content" :gutter="20">
      <el-col :span="12">
        <div class="block">
          <list-title-block>早隔离</list-title-block>
          <el-row class="flex align-center isolation" :gutter="30">
            <!-- 集中隔离 -->
            <el-col :span="12" class="hover-scale">
              <div class="flex justify-around align-center">
                <div class="number-text text-center">
                  <p class="number-box centre">
                    <countTo class="text-cyan" :endVal="0"></countTo>
                  </p>
                  集中隔离
                </div>
                <ul class="flex flex-direction justify-around numbers-list">
                  <li>
                    今日新增
                    <countTo
                      class="count"
                      :endVal="handle.disposingTotal || 0"
                    ></countTo>
                  </li>
                  <li>
                    今日解除
                    <span class="count text-green">0</span>
                  </li>
                  <li>
                    今日异常
                    <span class="count text-brown">0</span>
                  </li>
                </ul>
              </div>
            </el-col>
            <div class="separator-line"></div>

            <!-- 居家隔离 -->
            <el-col :span="12" class="hover-scale">
              <div class="flex justify-between align-center">
                <div class="number-text text-center">
                  <p class="number-box at-home">
                    <countTo class="text-cyan" :endVal="0"></countTo>
                  </p>
                  居家隔离
                </div>
                <el-row
                  class="full-flex flex justify-around isolation-at-home-txt"
                  :gutter="15"
                >
                  <el-col class="text-center text-white-light" :span="12">
                    <p>
                      <countTo
                        class="count"
                        :endVal="handle.disposingTotal || 0"
                      ></countTo>
                    </p>
                    今日新增
                  </el-col>
                  <el-col class="text-center text-white-light" :span="12">
                    <p>
                      <countTo
                        class="count text-green"
                        :endVal="handle.disposingTotal || 0"
                      ></countTo>
                    </p>
                    今日解除
                  </el-col>
                  <el-col class="text-center text-white-light" :span="12">
                    <p>
                      <countTo
                        class="count"
                        :endVal="handle.disposingTotal || 0"
                      ></countTo>
                    </p>
                    吃饭服药异常
                  </el-col>
                  <el-col class="text-center text-white-light" :span="12">
                    <p>
                      <countTo
                        class="count text-orange"
                        :endVal="handle.disposingTotal || 0"
                      ></countTo>
                    </p>
                    违规开门
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>

      <!-- 早治疗 -->
          <el-col class="full-height flex flex-direction content" :span="6">
            <div class="full-flex flex flex-direction block">
            <list-title-block>早治疗</list-title-block>
            <div class="full-flex flex flex-direction justify-center">
              <div class="flex align-center desc">
                <i class="icon treatment"></i>
                <div class="full-flex flex justify-around">
                  <div class="text-center count-txt">
                    <!-- <p class="count text-cyan">{{ warning.today || 0 }}</p> -->
                    <countTo
                      class="count text-cyan"
                      :endVal="warning.today || 0"
                    ></countTo>
                    <p class="text small text-white-light">今日新增</p>
                  </div>
                  <div class="text-center count-txt">
                    <p class="count">{{ warning.today || 0 }}</p>
                    <p class="text small text-white-light">当前在院</p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </el-col>

          <!-- 早报告 -->
          <el-col class="full-height flex flex-direction content" :span="6">
            <div class="full-flex flex flex-direction block">
            <list-title-block>早报告</list-title-block>

            <div class="full-flex flex flex-direction justify-center">
              <div class="flex align-center desc">
                <i class="icon report"></i>
                <div class="full-flex flex justify-around">
                  <div class="text-center count-txt">
                    <p class="count text-cyan">{{ warning.today || 0 }}</p>
                    <p class="text small text-white-light">今日新增</p>
                  </div>
                  <div class="text-center count-txt">
                    <p class="count">{{ warning.today || 0 }}</p>
                    <p class="text small text-white-light">累计报告</p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </el-col>

      <!-- 早治疗 & 早报告 -->

    </el-row>
    <!-- 早隔离 & 早治疗 & 早报告 END -->
  </div>
</template>

<script>
import ListTitleBlock from "./components/ListTitleBlock.vue";
import Warnings from "./components/Warnings.vue";
export default {
  data() {
    return {
      warning: {}, // 早发现
      handle: {} // 快处置
    };
  },
  components: {
    ListTitleBlock,
    Warnings
  }
};
</script>

<style lang="scss" scoped>
.page-right-screen {
  background-color: $screen-content-bg;
  padding: 30px;
}
.content {
  .block {
    padding: 30px;
    background-color: $base-dark-white;
    border-radius: 30px;
    margin-top: 30px;
  }
  h4 {
    font-size: 45px;
    margin-bottom: 30px;
  }
  .icon {
    width: 110px;
    height: 110px;
    background-repeat: no-repeat;
    background-size: 100% auto;
    margin-right: 30px;
    &.warning {
      background-image: url("../../../../assets/images/screen/yjcz_1.png");
    }
    &.exec {
      background-image: url("../../../../assets/images/screen/yjcz_2.png");
    }
    &.treatment {
      background-image: url("../../../../assets/images/screen/left-part-two/center-icon-zl.png");
    }
    &.report {
      background-image: url("../../../../assets/images/screen/left-part-two/center-icon-bg.png");
    }
  }
  .count-txt {
    .count {
      font-size: 50px;
    }
    .text {
      font-size: 42px;
      &.small {
        font-size: 28px;
      }
    }
  }
  .handle-list .count-txt {
    width: 50%;
    padding: 0 20px;
    .count {
      margin-left: 20px;
    }
    .separator {
      margin: 0 8px;
    }
  }
}

.isolation {
  position: relative;
  margin-top: 30px;
  .separator-line {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 3px;
    height: 96px;
    margin-top: -48px;
    margin-left: -15px;
    background: linear-gradient(
      180deg,
      rgba(37, 174, 222, 0) 0%,
      #25aede 55%,
      rgba(37, 174, 222, 0) 100%
    );
    opacity: 0.38;
  }
  .number-box {
    width: 140px;
    height: 120px;
    background-size: 100% 100%;
    font-size: 56px;
    &.centre {
      background-image: url("../../../../assets/images/screen/left-part-two/center-icon-jz.png");
    }
    &.at-home {
      background-image: url("../../../../assets/images/screen/left-part-two/center-icon-jj.png");
    }
  }
  .numbers-list {
    li {
      margin: 15px 0;
      .count {
        font-size: 50px;
        vertical-align: middle;
      }
    }
  }
  .isolation-at-home-txt {
    font-size: 24px;
    p {
      font-size: 46px;
    }
  }
}
</style>
