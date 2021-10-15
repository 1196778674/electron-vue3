<template>
  <el-container>
    <el-header class="app-header">
      <el-badge class="app-title">任务清单</el-badge>
      <!--<el-menu
        :default-active="active"
        mode="horizontal"
        @select="handleSelect"
        class="menu"
      >
        <el-menu-item index="/">
          <router-link to="/">首页</router-link>
        </el-menu-item>
        <el-menu-item index="/list">
          <router-link to="/list">清单</router-link>
        </el-menu-item>
      </el-menu> -->
      <el-button type="primary" @click="createCase">新建任务</el-button>
    </el-header>
    <router-view />
    <el-drawer
      v-model="showDrawer"
      title="新建任务"
      :direction="'rtl'"
      size="40%"
    >
      <create-case @closeCase="closeCase"></create-case>
    </el-drawer>
  </el-container>
</template>

<script lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ipcRenderer } from "electron";
import CreateCase from "./components/CreateCase.vue";

type IActive = string;

export default {
  components: {
    CreateCase,
  },
  setup() {
    const useRouterCurrent = reactive(useRouter());
    const path = useRouterCurrent.options.history.location;
    const active = ref<IActive>(path || "/");
    const handleSelect = (index: string): void => {
      console.log(index);
    };
    const showDrawer = ref<boolean>(false);
    const createCase = () => {
      showDrawer.value = true;
    };
    const closeCase = () => {
      showDrawer.value = false;
    };
    onMounted(() => {
      ipcRenderer.on("toast-reply", (event, arg) => {
        console.log(arg); // prints "pong"
      });
      ipcRenderer.send("toast-message", "ping");
    });
    return {
      showDrawer,
      active,
      handleSelect,
      createCase,
      closeCase,
    };
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.el-drawer__header {
  border-bottom: 1px solid #ededed;
  margin: 0 !important;
  padding-bottom: 30px !important;
  color: #444;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  background: none !important;
}
.app-header {
  height: 50px;
  background: #ffffff;
  border-bottom: 1px solid #ededed;
  align-items: center;
  display: flex;
  justify-content: space-between;
  .app-title {
    font-size: 22px;
    margin-right: 30px;
  }
  .menu {
    width: auto;
    min-width: 200px;
    background: none;
    border-bottom: none;
    .el-menu-item {
      padding: 0 !important;
    }
    a {
      text-decoration: none;
      display: block;
      width: 100%;
      height: 100%;
      padding: 0 20px;
    }
  }
}
</style>
