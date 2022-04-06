<template>
  <div class="page-five-theme">
    <div class="content-box">
      <div class="top-wrapper">
        <div class="top-head-box">
          <span>人员</span>
          <!-- <span @click='search'>人员</span> -->
          <img :src="require('@/assets/images/screen/wdk_icon.png')" />
        </div>
        <div class="ry-list-wrap com-flex">
          <div
            class="ry-item hover-scale"
            :style="{
              height: authLevel != 2 ? '260px' : '200px',
            }"
          >
            <img :src="require('@/assets/images/screen/sdm-ry.png')" />
            <div
              class="item-info"
              @click="
                openFrameSame('cz', {
                  name: '存量实有人员',
                  sqCode: sqCode,
                })
              "
            >
              <p>存量实有人员</p>
              <countTo
                class="number text-cyan"
                :key="timeKey"
                :separator="''"
                :endVal="ryDatas.czrk || 0"
              ></countTo>
            </div>
          </div>
          <div
            class="ry-item hover-scale"
            :style="{
              height: authLevel != 2 ? '260px' : '200px',
            }"
          >
            <img :src="require('@/assets/images/screen/icon3.png')" />
            <div
              class="item-info"
              @click="
                openFrameSame('ld', {
                  name: '流动人员',
                  sqCode: sqCode,
                })
              "
            >
              <p>流动人员</p>
              <countTo
                class="number text-cyan"
                :key="timeKey"
                :separator="''"
                :endVal="ryDatas.ldrks || 0"
              ></countTo>
            </div>
          </div>
          <div
            class="ry-item hover-scale"
            v-for="(item, index) in ryTopList.slice(0, 3)"
            :key="index"
            :style="{
              height: authLevel != 2 ? '260px' : '200px',
            }"
          >
            <img :src="item.imgurl" />
            <div
              class="item-info"
              @click="openFrame(item.frameId, { name: item.name })"
            >
              <p>{{ item.name }}</p>
              <countTo
                class="number text-cyan"
                :key="timeKey"
                :separator="''"
                :endVal="ryDatas[item.key] || 0"
              ></countTo>
            </div>
          </div>

          <div
            class="ry-item hover-scale"
            v-for="(item, index) in ryTopList.slice(3)"
            :key="index"
          >
            <img :src="item.imgurl" />
            <div
              class="item-info"
              @click="openFrame(item.frameId, { name: item.name })"
            >
              <p>{{ item.name }}</p>
              <countTo
                class="number text-cyan"
                :key="timeKey"
                :separator="''"
                :endVal="ryDatas[item.key] || 0"
              ></countTo>
            </div>
          </div>

          <!-- <div class="ry-item hover-scale">
                        <img :src="require('@/assets/images/screen/icon3.png" />
                        <div class="item-info">
                            <p>个人健康码异常</p>
                            <countTo
                                class="number color-orange"
                                :key="timeKey"
                                :separator="''"
                                :endVal="ryDatas.jkmyc || 0"
                                :duration="durationTime"
                            ></countTo>
                        </div>
                    </div> -->
        </div>
      </div>
      <div class="com-flex" v-baseLoading="loading">
        <div
          class="flex flex-direction justify-between com-wdk-box hover-scale"
          :style="{
            height: authLevel != 2 ? '400px' : '300px',
          }"
        >
          <div class="top-head-box">
            <span>车辆</span>
            <img :src="require('@/assets/images/screen/wdk_icon.png')" />
          </div>
          <div class="com-flex" style="height: 70%">
            <div
              class="num-wrapper-z"
              v-for="item in clList"
              :key="item.key"
              @click="openFrame(item.frameId)"
            >
              <countTo
                class="number text-cyan"
                :key="timeKey"
                :separator="''"
                :endVal="clDatas[item.key] || 0"
              ></countTo>
              <p>{{ item.name }}</p>
            </div>
          </div>
        </div>
        <div
          class="flex flex-direction justify-between com-wdk-box hover-scale"
          :style="{
            height: authLevel != 2 ? '400px' : '300px',
          }"
        >
          <div class="top-head-box">
            <span>货物</span>
            <img :src="require('@/assets/images/screen/wdk_icon.png')" />
          </div>
          <div class="com-flex" style="height: 70%">
            <div
              class="num-wrapper-z"
              v-for="list in hwList"
              :key="list.key"
              @click="openFrame(list.frameId)"
            >
              <countTo
                class="num text-cyan"
                :key="timeKey"
                :separator="''"
                :endVal="hwDatas[list.key] || 0"
              ></countTo>
              <p>{{ list.name }}</p>
            </div>
          </div>
        </div>
        <!-- <div class="flex flex-direction justify-between com-wdk-box hover-scale">
                    <div class="top-head-box">
                        <span>货物</span>
                        <img :src="require('@/assets/images/screen/wdk_icon.png" />
                    </div>
                    <div class="com-flex-center hw-list">
                        <div
                            class="num-wrapper"
                            v-for="list in hwList"
                            :key="list.key"
                            @click="openFrame(list.frameId)"
                        >
                            <span class="name">{{ list.name }}</span>
                            <span class="num">
                                {{ hwDatas[list.key] || 0 }}
                            </span>
                        </div>
                    </div>
                </div> -->
        <div
          class="flex flex-direction justify-between com-wdk-box hover-scale"
          :style="{
            height: authLevel != 2 ? '400px' : '300px',
          }"
        >
          <div class="top-head-box">
            <span>环境</span>
            <img :src="require('@/assets/images/screen/wdk_icon.png')" />
          </div>
          <div
            class="com-flex"
            style="height: 70%"
            @click="openFrame('hsjc-hj', hjDatas)"
          >
            <div class="num-wrapper-z" v-for="list in hjList" :key="list.key">
              <countTo
                class="num text-cyan"
                :endVal="hjDatas[list.key] || 0"
              ></countTo>
              <p>{{ list.name }}</p>
            </div>
          </div>
        </div>
        <div
          class="flex flex-direction justify-between com-wdk-box hover-scale cs-width"
          :style="{
            height: authLevel != 2 ? '400px' : '300px',
          }"
        >
          <div class="top-head-box">
            <span>场所</span>
            <img :src="require('@/assets/images/screen/wdk_icon.png')" />
          </div>
          <div class="com-flex-center cs-list">
            <div
              class="num-wrapper-cs"
              v-for="list in csList.slice(0, 2)"
              :key="list.key"
            >
              <countTo
                class="num text-cyan"
                :key="timeKey"
                :separator="''"
                :endVal="csData[list.key] || 0"
              ></countTo>
              <p>{{ list.name }}</p>
            </div>
          </div>
          <div class="com-flex-center cs-list">
            <div
              class="num-wrapper-cs"
              v-for="list in csList.slice(2)"
              :key="list.key"
            >
              <countTo
                class="num text-cyan"
                :key="timeKey"
                :separator="''"
                :endVal="csData[list.key] || 0"
              ></countTo>
              <p>{{ list.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      authLevel: sessionStorage.getItem("authLevel"),
      timeKey: new Date().getTime(),
      startDate: "", // 开始时间
      endDate: "", // 结束时间
      ryTopList: [
        {
          name: "来乌人员",
          key: "lwrk",
          imgurl: require("@/assets/images/screen/left-part-two/wdk-lw-icon.png"),
          frameId: "rw"
        },
        // {
        //     name: '途经中高风险地区',
        //     key: 'tjzgfxdq',
        //     imgurl: require('@/assets/images/screen/icon1.png'),
        //     frameId: 'rw',
        // },
        // {
        //     name: '35天境外旅居史',
        //     key: 'jwljs',
        //     imgurl: require('@/assets/images/screen/yjsj_lx_4.png'),
        //     frameId: 'rw',
        // },
        {
          name: "返乌人员",
          key: "fwry",
          imgurl: require("@/assets/images/screen/left-part-two/wdk-fw-icon.png"),
          frameId: "rw"
        }
        // {
        //     name: '口岸来乌人员',
        //     key: 'kary',
        //     imgurl: require('@/assets/images/screen/wg-icon2.png'),
        //     frameId: 'rw',
        // },
      ],
      ryDatas: {
        czrk: 0,
        rwzrs: 0,
        zdrwzrs: 0,
        jwljs: 0,
        lwrk: 0,
        fwry: 0,
        kary: 0,
        jkmyc: 0,
        ldrks: 0,
        tjzgfxdq: 0
      },
      clList: [
        { name: "本地车辆", key: "bsyy", frameId: "rwcl-bd" }
        // { name: '入市车辆', key: 'rwcl', frameId: 'rwcl-in' },
      ],
      clDatas: {
        bsyy: 0,
        rwcl: 0
      },
      hwList: [
        // { name: '口岸', key: 'dr_yy_hj', frameId: 'ka' },
        { name: "冷链", key: "dr_ll_hj", frameId: "zdhw-ll" },
        // { name: '邮政快递', key: 'dr_yz_hj', frameId: 'yz' },
        { name: "寄递物流", key: "dr_wl_hj", frameId: "zdhw-jdwl" }
        // { name: '入市货物', key: 'hw_hj', frameId: 'rwhw-zs' },
        // {
        //     name: '途经中高风险地区',
        //     key: 'zgfx_hj',
        //     frameId: 'rwhw-fx',
        // },
        // { name: '重点货物', key: 'zdhw_hj', frameId: 'hw_zd' },
      ],
      hwDatas: {
        dr_yy_hj: 0,
        dr_ll_hj: 0,
        dr_yz_hj: 0,
        dr_wl_hj: 0
        // hw_hj: 0,
        // zgfx_hj: 0,
        // zdhw_hj: 0,
      },
      hjList: [
        { name: "今日检测", key: "dr_jc" },
        { name: "14天检测", key: "lj_jc" }
      ],
      hjDatas: {
        dr_jc: 0,
        lj_jc: 0,
        jr_yx: 0,
        lj_yx: 0
      },
      csList: [
        {
          name: "社会服务和管理机构",
          key: "shfw",
          frameId: "xs"
        },
        {
          name: "服务业场所",
          key: "fwy",
          frameId: "xs"
        },
        {
          name: "公共场所",
          key: "gg",
          frameId: "xs"
        },
        {
          name: "居住场所",
          key: "jz",
          frameId: "xs"
        },
        {
          name: "其他场所",
          key: "qt",
          frameId: "xs"
        },
        {
          name: "商贸场所",
          key: "sm",
          frameId: "xs"
        }
      ],
      csData: {
        shfw: 0,
        fwy: 0,
        gg: 0,
        jz: 0,
        qt: 0,
        sm: 0
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.page-five-theme {
  position: relative;
  margin: 0 0 20px;

  .com-flex {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .com-flex-center {
    display: flex;
    align-items: center;
  }

  .content-box {
    width: 100%;
    padding: 0 36px;

    .top-head-box {
      height: 78px;
      display: flex;
      align-items: center;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.06),
        rgba(255, 255, 255, 0) 100%,
        rgba(255, 255, 255, 0) 100%
      );
      justify-content: space-between;
      padding: 0 18px 0 31px;

      span {
        height: 48px;
        font-size: 40px;
        color: #ffffff;
        line-height: 48px;
        letter-spacing: 5px;
        position: relative;
        padding-left: 30px;

        &::before {
          content: "";
          position: absolute;
          top: 15px;
          left: 0;
          width: 19px;
          height: 19px;
          border-radius: 5px;
          background: #68c549;
        }
      }

      img {
        width: 56px;
        height: 15px;
      }
    }

    .top-wrapper {
      margin-bottom: 20px;

      .ry-list-wrap {
        padding: 25px 0 0 50px;
        flex-wrap: wrap;
        background: $base-dark-white;

        .ry-item {
          display: flex;
          align-items: center;
          width: 424px;
          height: 200px;
          margin-right: 40px;
          margin-bottom: 20px;
          padding-left: 40px;
          background: $base-dark-white;
          cursor: pointer;

          .item-info {
            margin-left: 50px;

            p {
              height: 33px;
              font-size: 28px;
              color: rgba(255, 255, 255, 0.8);
              line-height: 33px;
              margin-bottom: 15px;
            }

            .number {
              height: 53px;
              font-size: 44px;
              line-height: 53px;
            }
          }
        }
      }
    }

    .cs-width {
      width: 760px !important;

      .cs-list {
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 15px;
        cursor: pointer;
      }

      .num-wrapper-cs {
        text-align: center;

        .num {
          height: 50px;
          font-size: 42px;
          color: #00d6f9;
          line-height: 50px;
        }
        p {
          height: 31px;
          font-size: 26px;
          color: #ffffff;
          line-height: 31px;
        }
      }
    }

    .com-wdk-box {
      width: 438px;
      height: 300px;
      background: rgba(255, 255, 255, 0.05);
      &:not(:last-child){
        margin-right: 23px;
      }
      cursor: pointer;
      .num-wrapper-z {
        margin-bottom: 20px;
        text-align: center;
        font-size: 42px;

        .num {
          height: 50px;
          font-size: 42px;
          color: #00d6f9;
          line-height: 50px;
        }
        p {
          height: 31px;
          font-size: 26px;
          color: #ffffff;
          line-height: 31px;
          width: 120px;
        }
      }

      .hw-list {
        flex-wrap: wrap;
        height: 70%;
        padding: 0 15px;
        cursor: pointer;
      }

      .num-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .name {
          width: 121px;
          height: 31px;
          font-size: 26px;
          color: #ffffff;
          line-height: 31px;
          width: 120px;
          text-align: center;
        }
        .num {
          height: 50px;
          font-size: 42px;
          color: #00d6f9;
          line-height: 50px;
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
