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
              <span>今日待完成</span>
              <span class="number">50</span>
            </div>
          </template>
          <today-done class="min-height" />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top: 20px">
      <el-col :span="24">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>已完成任务</span>
              <span class="number">50</span>
            </div>
          </template>
          <task-all class="min-height" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskAll from "../components/TaskAll.vue";
import TodayDone from "../components/TodayDone.vue";
import TodayDoing from "../components/TodayDoing.vue";

export default defineComponent({
  name: "Home",
  components: {
    TaskAll,
    TodayDone,
    TodayDoing,
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
