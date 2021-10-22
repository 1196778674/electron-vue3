<template>
  <div>{{ msg }}</div>
</template>


<script lang="ts">
import { ref, reactive } from "vue";
export default {
  name: "List",
  setup(props: any) {
    const msg = ref("功能待开发！");

    return {
      msg,
      props,
    };
  },
};
</script>

<style lang="less" scoped>
</style>
