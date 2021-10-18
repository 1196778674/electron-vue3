<template>
  <div class="home">
    <el-row :gutter="24">
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>任务总数</span>
              <span class="number">{{ localList.length }}</span>
            </div>
          </template>
          <case-progress class="min-height" :list="localList" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>进行中</span>
              <span class="number">{{ doing.length }}</span>
            </div>
          </template>
          <today-doing class="min-height" :list="doing" />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top: 20px">
      <el-col :span="24">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>已完成</span>
              <span class="number">{{ done.length }}</span>
            </div>
          </template>
          <today-done class="min-height" :list="done" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs, ComputedRef } from "vue";
import { useStore } from "vuex";

// import TaskAll from "../components/TaskAll.vue";
import CaseProgress from "../components/CaseProgress.vue";
import TodayDone from "../components/TodayDone.vue";
import TodayDoing from "../components/TodayDoing.vue";

interface IState {
  localList: ComputedRef;
  done: ComputedRef;
  doing: ComputedRef;
}

export default defineComponent({
  name: "Home",
  components: {
    CaseProgress,
    TodayDone,
    TodayDoing,
  },
  setup(props) {
    const store = useStore();

    const state = reactive<IState>({
      localList: computed(() => store.state.localList),
      done: computed(() =>
        store.state.localList.filter((v: any) => v.type === 1)
      ),
      doing: computed(() =>
        store.state.localList.filter((v: any) => v.type === 0)
      ),
    });

    return {
      store,
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
