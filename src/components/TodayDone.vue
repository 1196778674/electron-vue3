<template>
  <div>
    {{ count }}
  </div>
  <el-empty description="暂无数据"></el-empty>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";

export default {
  name: "TodayDone",
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
</style>