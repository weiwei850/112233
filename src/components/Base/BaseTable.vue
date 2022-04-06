<template>
  <div class="table-frame-modular">
    <div class="flex flex-direction full-height">
      <el-table
        v-bind="$attrs"
        :render-header="renderHeader"
        v-on="$listeners"
        v-baseLoading="loading"
        class="full-flex"
        height="100%"
      >
        <el-table-column
          v-if="showSelection"
          align="center"
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          v-if="showIndex"
          align="center"
          label="序号"
          width="120px"
        >
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          v-for="(item, index) in columns"
          :key="index"
          :align="item.align || 'center'"
          :label="item.name"
          :prop="item.prop"
          :vokey="index"
          :width="item.width"
          :sortable="item.sortable"
        >
          <template slot-scope="{ row }">
            <span
              :title="
                item.formatter ? item.formatter(row[item.prop]) : row[item.prop]
              "
            >
              {{
                item.formatter ? item.formatter(row[item.prop]) : row[item.prop]
              }}
            </span>
          </template>
        </el-table-column>
        <slot></slot>
        <template slot="empty">
          <span v-if="!loading">暂无数据</span>
          <span v-else></span>
        </template>
      </el-table>
      <BaseTablePagination
        v-if="showPagination"
        :options="paginationOptions"
        :search="search"
      />
    </div>
  </div>
</template>

<script>
import BaseTablePagination from "./BaseTablePagination.vue";

export default {
  name: "BaseTable",
  inheritAttrs: true,
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    showSelection: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: () => []
    },
    showPagination: {
      type: Boolean,
      default: false
    },
    paginationOptions: {
      type: Object,
      default: () => ({})
    },
    search: {
      type: Function,
      default: () => {}
    }
  },
  components: {
    BaseTablePagination
  },
  data() {
    return {
      tooltipStatus: true
    };
  },
  methods: {
    renderHeader(h, { column }) {
      return h(
        "span",
        {
          domProps: {
            title: column.label
          }
        },
        column.label
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.table-frame-modular::v-deep .el-checkbox__inner {
  width: 20px;
  height: 20px;
}
.table-frame-modular::v-deep .el-checkbox__inner::after {
  height: 10px;
  left: 7px;
  top: 2px;
  width: 4px;
}

.table-frame-modular::v-deep .el-table__footer .cell {
  text-overflow: initial;
}
</style>
