<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="任务标题">
      <el-input v-model="name"></el-input>
    </el-form-item>
    <el-form-item label="完成时间">
      <el-col :span="24">
        <el-date-picker
          v-model="times"
          lang="Zh-cn"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        >
        </el-date-picker
      ></el-col>
    </el-form-item>
    <el-form-item label="是否提醒">
      <el-switch v-model="tips"></el-switch>
    </el-form-item>
    <el-form-item label="详细描述">
      <el-input v-model="desc" type="textarea"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
import { ElNotification } from "element-plus";

import { useStore } from "vuex";

interface IForm {
  name: string;
  times: number[];
  tips: boolean;
  desc: string;
  type: number; // 0 新建 ，1 已完成
}

export default {
  name: "CreateCase",
  setup(props: any, context: any) {
    const form = reactive<IForm>({
      name: "",
      times: [],
      tips: false,
      desc: "",
      type: 0,
    });

    const store = useStore();

    const onSubmit = (): void => {
      if (!form.name) {
        ElNotification({
          title: "提示",
          type: "warning",
          message: "请输入任务标题~~",
        });
        return;
      }
      if (!form.times[0]) {
        ElNotification({
          title: "提示",
          type: "warning",
          message: "请选择开始结束时间~~",
        });
        return;
      }
      const times = form.times.map((v) => v.valueOf());
      const newForm = Object.assign({}, form, {
        times: times,
        id: store.state.id,
      });
      store.commit("saveLocalList", newForm);
      context.emit("closeCase");
    };

    return {
      onSubmit,
      ...toRefs(form),
      props,
      context,
    };
  },
};
</script>

<style lang="less" scoped>
</style>