<!--
 * @Author: Binggan
 * @Date: 2022-03-01 12:59:20
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-02 12:01:00
 * @Description: 左屏
-->
<template>
  <div class="page-left-screen">
    <ListBlock>
      <template slot="title">
        <img
          class="title-icon"
          :src="
            require('@/assets/images/screen/left-part-two/three-title-icon.png')
          "
          alt=""
        />
        三道门
      </template>
      <ThreeDoors />
    </ListBlock>

    <ListBlock>
      <template slot="title">
        <img
          class="title-icon"
          :src="
            require('@/assets/images/screen/left-part-two/five-title-icon.png')
          "
          alt=""
        />
        五大主题库
      </template>
      <FiveThemes />
    </ListBlock>

<ListBlock :title="false">
    <DataCentre class="data-centre"></DataCentre>
</ListBlock>
  </div>
</template>

<script>
import ListBlock from "./components/ListBlock";
import ThreeDoors from "./components/ThreeDoors.vue";
import FiveThemes from "./components/FiveThemes.vue";
import DataCentre from "./components/DataCentre.vue";
export default {
  components: {
    ListBlock,
    ThreeDoors,
    FiveThemes,
    DataCentre
  }
};
</script>

<style lang="scss" scoped>
.page-left-screen {
  width: 100%;
  .data-centre{
    height:403px;
  }
}
</style>
