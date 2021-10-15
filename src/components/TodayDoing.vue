<template>
  <el-table
    :data="
      tableData
      // .filter(
      //   (data) =>
      //     // !search || data.name.toLowerCase().includes(search.toLowerCase())
      // )
    "
    height="350"
    style="width: 100%; max-height: 350px; overflow-y: scroll"
  >
    <el-table-column
      label="任务名称"
      prop="name"
      fixed
      width="100"
      style="overflow: hidden"
    />
    <el-table-column label="开始时间" width="200">
      <template #default="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{
          dateFormat(scope.row.times[0])
        }}</span>
      </template>
    </el-table-column>
    <el-table-column label="结束时间" width="200">
      <template #default="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{
          dateFormat(scope.row.times[1])
        }}</span>
      </template>
    </el-table-column>
    <el-table-column label="任务描述" prop="desc" width="250" />
    <el-table-column fixed="right" width="150">
      <!-- <template #header>
        <el-input v-model="search" size="mini" placeholder="搜索" />
      </template> -->
      <template #default="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >详情</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { reactive, toRefs, computed, ComputedRef } from "vue";
import moment from "moment";

export default {
  name: "TodayDoing",
  props: {
    list: {
      type: () => [],
    },
  },
  setup(props: any) {
    const state = reactive<{ tableData: ComputedRef }>({
      tableData: computed(() => props.list),
    });

    const handleEdit = (index: number, row: {}) => {
      console.log(index, row);
    };

    const handleDelete = (index: number, row: {}) => {
      console.log(index, row);
    };

    const dateFormat = (time: number) => moment(time).format("YYYY-MM-DD");

    return {
      handleEdit,
      handleDelete,
      dateFormat,
      ...toRefs(state),
      props,
    };
  },
};
</script>

<style lang="less" scoped>
</style>