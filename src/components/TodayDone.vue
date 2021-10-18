<template>
  <div class="container">
    <el-table
      v-if="lists.length"
      :data="lists"
      height="350"
      style="width: 100%; max-height: 350px; overflow-y: scroll"
    >
      <el-table-column label="任务名称" prop="name" fixed width="250" />
      <el-table-column label="开始时间" width="250">
        <template #default="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            dateFormat(scope.row.times[0])
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" width="250">
        <template #default="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            dateFormat(scope.row.times[1])
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务描述" prop="desc" width="" />
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button
            size="mini"
            type="success"
            @click="openCase(scope.$index, scope.row)"
            >重新开启</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-empty v-else description="暂无数据"></el-empty>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, computed } from "vue";
import moment from "moment";
import { useStore } from "vuex";

export default {
  name: "TodayDone",
  props: ["list"],
  setup(props: any) {
    const state = reactive({
      lists: computed(() => props.list),
    });

    const store = useStore();

    const openCase = (index: number, row: { id: number }) => {
      store.commit("restartCase", row.id);
    };

    const dateFormat = (time: number) =>
      moment(time).format("YYYY-MM-DD HH-MM-SS");

    return {
      openCase,
      dateFormat,
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