<template>
  <div>{{ msg }}</div>
</template>


<script lang="ts">
import { ref, reactive } from "vue";
export default {
  name: "List",
  setup(props) {
    const msg = ref("list");

    return {
      msg,
      props,
    };
  },
};
</script>

<style lang="less" scoped>
</style>
