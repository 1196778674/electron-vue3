<template>
  <div class="container">
    {{ count }}
    <el-empty description="暂无数据"></el-empty>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";

export default {
  name: "TodayDone",
  props: {
    list: {
      type: () => [],
    },
  },
  setup() {
    const state = reactive({
      count: 0,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less" scoped>
.container {
  min-height: 350px;
  width: 100%;
  height: 100%;
}
</style>