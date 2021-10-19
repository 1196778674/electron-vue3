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
      <div>
        <el-button type="warning" @click="exportCase">导出任务</el-button>
        <el-button type="success" @click="importCase">导入任务</el-button>
        <el-button type="primary" @click="createCase">新建任务</el-button>
      </div>
    </el-header>
    <!-- <router-view /> -->
    <v-home></v-home>
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
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { ipcRenderer } from "electron";
import moment from "moment";
import { useStore } from "vuex";
import { ElNotification } from "element-plus";

import VHome from "./views/Home.vue";
import CreateCase from "./components/CreateCase.vue";

type IActive = string;

export default {
  components: {
    CreateCase,
    VHome,
  },
  setup() {
    const store = useStore();
    const useRouterCurrent = reactive(useRouter());
    const path = useRouterCurrent.options.history.location;
    const active = ref<IActive>(path || "/");
    const handleSelect = (index: string): void => {
      console.log(index);
    };
    const showDrawer = ref<boolean>(false);

    watch(
      store.state.localList,
      (lists) => {
        ipcRenderer.send(
          "watch-lists",
          JSON.stringify(lists.filter((v: any) => v.tips))
        );
      },
      {
        immediate: true,
      }
    );

    const createCase = () => {
      showDrawer.value = true;
    };
    const closeCase = () => {
      showDrawer.value = false;
    };

    const exportCase = () => {
      ipcRenderer.send("exportFun", JSON.stringify(store.state));
    };

    const importCase = () => {
      ipcRenderer.send("importFun");
    };

    const timeFun = (time: number) => {
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    };

    onMounted(() => {
      // ipcRenderer.on("toast-reply", (event, arg) => {
      //   console.log(arg); // prints "pong"
      // });

      ipcRenderer.on("import-reply", (event, arg) => {
        store.commit("importObj", arg);
      });

      ipcRenderer.on("watch-reply", (event, arg) => {
        const obj = arg;
        ElNotification({
          title: "提示",
          type: "warning",
          message: `${obj.name}将于${timeFun(obj.times[1])}到期，请尽快处理`,
          duration: 0,
        });
      });
    });
    return {
      timeFun,
      exportCase,
      importCase,
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
