<template>
  <div style="height: 350px">
    <div class="title">总任务完成度</div>
    <el-progress
      :text-inside="true"
      :stroke-width="20"
      :percentage="percentage"
      status="success"
    >
      <span>{{ percentage }}</span>
    </el-progress>
    <el-divider></el-divider>
    <div class="title">今日完成</div>
    <el-progress
      class="progress"
      :stroke-width="10"
      type="dashboard"
      :percentage="percentage"
    >
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
        <span class="percentage-label">今日完成度</span>
      </template>
    </el-progress>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, computed, onBeforeMount } from "vue";

export default {
  name: "CaseProgress",
  props: ["list"],
  setup(props: any) {
    const state = reactive({
      percentage: computed(() =>
        (
          (props.list.filter((v: { type: number }) => v.type === 1).length /
            props.list.length) *
          100
        ).toFixed(2)
      ),
      all: computed(() => props.list.length),
      now: new Date().valueOf(),
      nowProcentage: 0,
      nowAll: 0,
    });

    return {
      ...toRefs(state),
      props,
    };
  },
};
</script>

<style lang="less" scoped>
.title {
  font-size: 13px;
  margin-bottom: 20px;
}
.progress {
  display: flex;
  justify-content: center;
  align-items: center;
}
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}

.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
</style>