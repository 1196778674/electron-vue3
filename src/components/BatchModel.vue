<template>
  <el-dialog
    v-model="dialogVisible"
    title="批量处理"
    width="40%"
    :before-close="handleClose"
  >
    <div class="batch-body">
      <ul v-for="item in selectData" :key="item.localId">
        <li>任务名称：{{ item.name }}</li>
        <li>结束时间：{{ dateFormat(item.times[1]) }}</li>
        <li>任务描述：{{ item.desc }}</li>
        <el-divider></el-divider>
      </ul>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" size="small" @click="closeDialog"
          >批量完成</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from "vue";
import moment from "moment";

export default {
  name: "BatchModel",
  props: ["selectData", "dialogVisible"],
  setup(props: any, context: any) {
    const state = reactive({
      dialogVisible: props.dialogVisible,
      selectData: props.selectData,
    });

    const handleClose = () => {
      context.emit("closeDialog", false);
    };

    const dateFormat = (time: number) =>
      moment(time).format("YYYY-MM-DD HH:mm:ss");

    const closeDialog = () => {
      context.emit("batchDone", props.selectData);
      handleClose();
    };

    return {
      dateFormat,
      handleClose,
      closeDialog,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less" scoped>
.el-divider--horizontal {
  margin-top: 15px !important;
  margin-bottom: 15px !important;
}
.batch-body {
  padding: 0 20px;
  max-height: 400px;
  overflow-y: scroll;
  ul {
    li {
      list-style: none;
      line-height: 25px;
    }
  }
}
</style>
