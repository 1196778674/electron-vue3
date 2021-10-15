<template>
  <div class="home">
    <el-row :gutter="24">
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>任务总数</span>
              <span class="number">{{ all }}</span>
            </div>
          </template>
          <task-all class="min-height" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>待完成</span>
              <span class="number">{{ pending }}</span>
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
              <span>已完成</span>
              <span class="number">{{ done }}</span>
            </div>
          </template>
          <task-all class="min-height" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs, ComputedRef } from "vue";
import { useStore } from "vuex";

import TaskAll from "../components/TaskAll.vue";
import TodayDone from "../components/TodayDone.vue";
import TodayDoing from "../components/TodayDoing.vue";

interface IState {
  all: ComputedRef<number>;
  done: number;
  pending: number;
}

export default defineComponent({
  name: "Home",
  components: {
    TaskAll,
    TodayDone,
    TodayDoing,
  },
  setup(props) {
    const store = useStore();

    const state = reactive<IState>({
      all: computed(() => store.state.localList.length),
      done: 10,
      pending: 14,
    });

    return {
      props,
      ...toRefs(state),
    };
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
