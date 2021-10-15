<template>
  <div class="home">
    <el-row :gutter="24">
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>任务总数</span>
              <span class="number">50</span>
            </div>
          </template>
          <task-all class="min-height" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>今日完成</span>
              <span class="number">50</span>
            </div>
          </template>
          <today-done class="min-height" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskAll from "../components/TaskAll.vue";
import TodayDone from "../components/TodayDone.vue";

export default defineComponent({
  name: "Home",
  components: {
    TaskAll,
    TodayDone,
  },
});
</script>

<style lang="less" scoped>
.home {
  padding: 20px;
  .min-height {
    min-height: 350px;
  }
  .card-header {
    font-weight: bolder;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .number {
      color: #1989fa;
    }
  }
}
</style>
