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
              <span
                >进行中<span class="number" style="margin-left: 20px">{{
                  doing.length
                }}</span></span
              >
              <el-button
                type="primary"
                size="small"
                :disabled="moreButton"
                @click="showBatchModel"
                >批量处理</el-button
              >
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
    <batch-model
      :selectData="selectData"
      :dialogVisible="dialogVisible"
      @closeDialog="closeDialog"
      @batchDone="batchDone"
    ></batch-model>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  toRefs,
  ComputedRef,
  ref,
  watch,
} from "vue";
import { useStore } from "vuex";

// import TaskAll from "../components/TaskAll.vue";
import CaseProgress from "../components/CaseProgress.vue";
import TodayDone from "../components/TodayDone.vue";
import TodayDoing from "../components/TodayDoing.vue";

import BatchModel from "../components/BatchModel.vue";

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
    BatchModel,
  },
  setup(props) {
    const store = useStore();

    const state = reactive<IState>({
      localList: computed(() => store.state.localList),
      done: computed(() =>
        store.state.localList.filter((v: { type: number }) => v.type === 1)
      ),
      doing: computed(() =>
        store.state.localList.filter((v: { type: number }) => v.type === 0)
      ),
    });

    const selectData = ref(computed(() => store.state.selectList));
    const moreButton = ref<boolean>(true);
    const dialogVisible = ref<boolean>(false);
    const showBatchModel = () => {
      dialogVisible.value = true;
    };
    const closeDialog = (close: boolean) => {
      dialogVisible.value = close;
    };
    const batchDone = (arr: { localId: number }[]) => {
      arr.forEach((v: { localId: number }) => {
        store.commit("doneLocalList", v.localId);
      });
    };
    watch(selectData, (value) => {
      if (value.length) {
        moreButton.value = false;
      } else {
        moreButton.value = true;
      }
    });

    return {
      selectData,
      moreButton,
      showBatchModel,
      closeDialog,
      dialogVisible,
      batchDone,
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
