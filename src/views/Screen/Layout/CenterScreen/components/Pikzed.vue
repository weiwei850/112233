<!--
 * @Author: Binggan
 * @Date: 2022-03-04 18:31:31
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-09 09:38:57
 * @Description: 社区排查
-->
<template>
  <div class="full-height pikzed-wrapper">
    <ThreeDegreeTitle
      class="center-title"
      mTitle="社区排查"
      mBgType="title-6"
      showFindAll="1"
    >
    </ThreeDegreeTitle>
    <dl class="medical-check">
      <dt>核酸检测</dt>
      <dd v-for="item in typeList" :key="item.label">
        <div class="hover-scale">
          <div class="title">
            <i class="icon"></i>
            {{ item.label }}
          </div>
          <div class="flex align-center check-result-list">
            <div
              class="flex flex-direction align-center justify-center today-count text-center"
            >
              <countTo
                class="text-cyan"
                :endVal="counts[item.field]['dr_jc']"
              ></countTo>
              <p>今日检测</p>
            </div>
            <ul class="full-flex flex flex-direction">
              <li class="flex">
                <label>14天检测</label>
                <countTo
                  class="full-flex text-center"
                  :endVal="counts[item.field]['lj_jc']"
                ></countTo>
              </li>
              <li class="flex">
                <label>今日阳性</label>
                <countTo
                  class="full-flex text-center text-yellow"
                  :endVal="counts[item.field]['jr_yx']"
                ></countTo>
              </li>
              <li class="flex">
                <label>14天阳性</label>
                <countTo
                  class="full-flex text-center text-yellow"
                  :endVal="counts[item.field]['lj_yx']"
                ></countTo>
              </li>
            </ul>
          </div>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
import { getPersonNucleinCheckCounts, getEnvNucleinCheckCounts } from "@/apis/centerScreen";
import ThreeDegreeTitle from "@/components/ThreeDegreeTitle.vue";
export default {
  data() {
    return {
      typeList: [
        {
          label: "人员",
          field: "person"
        },
        {
          label: "货物",
          field: "freight"
        },
        {
          label: "环境",
          field: "env"
        }
      ],
      counts: {}
    };
  },
  components: {
    ThreeDegreeTitle
  },
  created() {
    this.typeList.forEach(item => {
      this.$set(this.counts, item.field, {})
    })
    this.getData();
  },
  methods: {
    getData() {
      getPersonNucleinCheckCounts().then((res) => {
        this.$set(this.counts, "person", res.data[0]);
      });
      getEnvNucleinCheckCounts().then(res => {
        this.$set(this.counts, "env", res.data[0]);
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.pikzed-wrapper {
  background-image: linear-gradient(
    270deg,
    rgba(2, 16, 44, 0.7) 0%,
    rgba(20, 66, 114, 0.7) 100%
  );
  padding: 25px;
  .medical-check {
    dt{
      margin-bottom:20px;
    }
    .title {
      background-image: linear-gradient(
        270deg,
        rgba(255, 255, 255, 0.05) 0%,
        rgba(255, 255, 255, 0.05) 100%
      );
      .icon {
        display: inline-block;
        width: 26px;
        height: 50px;
        vertical-align: middle;
        background: url("../../../../../assets/images/common/moudle_title_2.png")
          no-repeat center/auto 100%;
        // margin-left: 21px;
      }
    }
    .check-result-list {
      background-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.06) 0%,
        rgba(255, 255, 255, 0) 100%,
        rgba(255, 255, 255, 0) 100%
      );
      padding: 20px;
      .today-count {
        width: 200px;
        min-height: 128px;
        margin-right: 10px;
        background: url("../../../../../assets/images/screen/sqpc_1.png")
          no-repeat top center/auto 100%;
        span {
          font-size: 50px;
        }
        p {
          font-size: 32px;
          margin-top: 20px;
        }
      }
    }
    dd {
      background-color: rgba(4, 33, 53, 0.55);
      padding: 20px;
    }
  }
}
</style>
