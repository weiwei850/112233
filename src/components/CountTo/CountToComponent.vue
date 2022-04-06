<!--
 * @Author: Binggan
 * @Date: 2022-03-01 20:40:16
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-03 18:07:18
 * @Description:
-->
<template>
  <VueCountTo :startVal="startVal" :endVal="endVal" :duration="duration"></VueCountTo>
</template>

<script>
import VueCountTo from "vue-count-to";
export default {
  props: {
    startVal: {
      type: Number,
      default: 0
    },
    endVal: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  components: {
    VueCountTo
  }
};
</script>

<style lang="scss" scoped></style>
