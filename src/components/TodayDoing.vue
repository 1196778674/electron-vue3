<template>
  <el-table
    :data="tableData"
    @selection-change="selectionChange"
    height="350"
    style="width: 100%; max-height: 350px; overflow-y: scroll"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column label="任务名称" prop="name" fixed width="200" />
    <el-table-column label="任务描述" prop="desc" width="250" />
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
  <dialog-model
    :outerVisible="outerVisible"
    :rowData="rowData"
    @closeDialog="closeDialog"
    @dialogDone="dialogDone"
  ></dialog-model>
</template>

<script lang="ts">
import { reactive, toRefs, computed, ComputedRef } from "vue";
import moment from "moment";
import { useStore } from "vuex";
import { ElMessageBox } from "element-plus";

import DialogModel from "../components/DialogModel.vue";

export default {
  name: "TodayDoing",
  props: {
    list: {
      type: Function,
    },
  },
  components: { DialogModel },
  setup(props: any) {
    const state = reactive<{
      tableData: ComputedRef;
      outerVisible: boolean;
      rowData: unknown;
    }>({
      tableData: computed(() => props.list),
      // 展示弹框
      outerVisible: false,
      rowData: {},
    });

    const store = useStore();
    const handleEdit = (index: number, row: { localId: number }) => {
      state.rowData = row;
      state.outerVisible = true;
    };

    const closeDialog = (close: boolean) => {
      state.outerVisible = close;
    };

    const dialogDone = (obj: {
      localId: number;
      type: number;
      delayTimes: number;
    }) => {
      if (obj.type) {
        store.commit("doneLocalList", obj.localId);
      } else {
        store.commit("delayTimes", {
          localId: obj.localId,
          times: obj.delayTimes * 3600 * 1000,
        });
      }
    };

    const handleDelete = (index: number, row: { localId: number }) => {
      const id = row.localId;
      ElMessageBox.confirm("确定删除这条任务？", {
        confirmButtonText: "删除",
        cancelButtonText: "我再想想",
        type: "warning",
      })
        .then(() => {
          store.commit("deleteLocalList", id);
        })
        .catch(() => {
          // catch error
        });
    };

    const selectionChange = (list: []) => {
      store.commit("selectListFun", list);
    };

    const dateFormat = (time: number) =>
      moment(time).format("YYYY-MM-DD HH:mm:ss");

    return {
      dialogDone,
      handleEdit,
      handleDelete,
      dateFormat,
      closeDialog,
      selectionChange,
      ...toRefs(state),
      props,
    };
  },
};
</script>

<style lang="less" scoped>
.el-table td.el-table__cell div {
  max-width: 100%;
  height: 29px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>