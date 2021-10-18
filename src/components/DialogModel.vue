<template>
  <el-dialog v-model="outerVisible" title="任务详情">
    <template #default>
      <div class="discription">
        <ul>
          <li>
            任务名称：<span>{{ rowData.name }}</span>
          </li>
          <li>
            开始时间：<span>{{ dateFormat(rowData.times[0]) }}</span>
          </li>
          <li>
            结束时间：<span>{{ dateFormat(rowData.times[1]) }}</span>
          </li>
          <li>
            任务描述：<span>{{ rowData.desc }}</span>
          </li>
        </ul>
      </div>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="closeDialog">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { toRefs, ref } from "vue";
import moment from "moment";

interface IRowData {
  name: string;
  time: number[];
  desc: string;
}

export default {
  name: "DialogModel",
  props: ["outerVisible", "rowData"],
  setup(props: any, context: any) {
    const outerVisible = ref<boolean>(props.outerVisible);
    const rowData = ref<IRowData>(props.rowData);
    const closeDialog = () => {
      context.emit("closeDialog", false);
    };
    const dateFormat = (time: number) =>
      moment(time).format("YYYY-MM-DD HH-MM-SS");
    return {
      rowData,
      closeDialog,
      context,
      outerVisible,
      ...toRefs(props),
      dateFormat,
    };
  },
};
</script>

<style lang="less" scoped>
.discription {
  ul {
    margin: 0 auto;
    padding: 0 40px;
    li {
      list-style: none;
      line-height: 40px;
      font-size: 14px;
      span {
        margin-left: 10px;
      }
    }
  }
}
</style>