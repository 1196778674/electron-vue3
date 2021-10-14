<template>
  <el-container>
    <el-header class="app-header">
      <el-badge class="app-title">任务清单</el-badge>
      <el-menu
        :default-active="active"
        mode="horizontal"
        @select="handleSelect"
        class="menu"
      >
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">清单</el-menu-item>
      </el-menu>
    </el-header>
  </el-container>
</template>

<script lang="ts">
import { ref } from "vue";

type IActive = string;

export default {
  setup() {
    const active = ref<IActive>("1");
    const handleSelect = () => {};
    return {
      active,
      handleSelect,
    };
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.app-header {
  height: 50px;
  background: #ffffff;
  border-bottom: 1px solid #ededed;
  align-items: center;
  display: flex;
  .app-title {
    font-size: 22px;
    margin-right: 30px;
  }
  .menu {
    width: auto;
    min-width: 200px;
    background: none;
    border-bottom: none;
  }
}
</style>
