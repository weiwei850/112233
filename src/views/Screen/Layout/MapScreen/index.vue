<!--
 * @Author: Binggan
 * @Date: 2022-03-01 15:48:42
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-01 17:46:34
 * @Description:地图组件
-->
<template>
  <div id="mapContainer"></div>
</template>

<script>
import { initMapLeaflet, destroyMap } from "./mapUtils";
export default {
  props: {
    zoom: {
      type: Number,
      default: 16
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    destroyMap();
  },
  methods: {
    init() {
      const mapId = "mapContainer";
      // initMapOnline(mapId);
      const { z, xy, params } = this.$route.query;
      initMapLeaflet(mapId, z, params, xy);
    }
  }
};
</script>

<style lang="scss" scoped></style>
