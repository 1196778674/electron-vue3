<template>
  <el-dialog
    v-model="outerVisible"
    title="任务详情"
    :before-close="closeDialog"
  >
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
          <li>
            是否完成：
            <el-switch v-model="done" />
            <!--<el-button
              size="small"
              type="primary"
              @click="dialogDone(rowData.localId)"
              >完成</el-button
            > -->
          </li>
          <li v-if="!done">是否延期：{{ delayTimes }} 小时</li>
          <li v-if="!done">
            <el-slider
              v-model="delayTimes"
              :step="4"
              show-stops
              :format-tooltip="(value) => value + '小时'"
            ></el-slider>
          </li>
        </ul>
      </div>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="default" @click="closeDialog(rowData.localId)"
          >确定</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { toRefs, ref } from "vue";
import moment from "moment";
import { ipcRenderer } from "electron";

interface IRowData {
  name: string;
  time: number[];
  desc: string;
  type: number;
}

export default {
  name: "DialogModel",
  props: ["outerVisible", "rowData"],
  setup(props: any, context: any) {
    const outerVisible = ref<boolean>(props.outerVisible);
    const rowData = ref<IRowData>(props.rowData);
    const done = ref<number>(0);
    const delayTimes = ref<number>(0);
    const closeDialog = (localId: number) => {
      if (done.value) {
        ipcRenderer.send("doneCase", localId);
      }
      context.emit("dialogDone", {
        localId: localId,
        type: done.value ? 1 : 0,
        delayTimes: done.value ? 0 : delayTimes.value,
      });
      context.emit("closeDialog", false);
      setTimeout(() => {
        done.value = 0;
        delayTimes.value = 0;
      });
    };
    const dateFormat = (time: number) =>
      moment(time).format("YYYY-MM-DD HH:mm:ss");

    // const dialogDone = (localId: number) => {
    //   context.emit("dialogDone", localId);
    //   ipcRenderer.send("doneCase", localId);
    //   closeDialog();
    // };

    return {
      done,
      delayTimes,
      rowData,
      closeDialog,
      context,
      outerVisible,
      // dialogDone,
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