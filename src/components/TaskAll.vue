<template>
  <div id="charts"></div>
</template>

<script lang="ts">
import { reactive, ref, onMounted, toRefs } from "vue";
import * as echarts from "echarts";

type EChartsOption = echarts.EChartsOption;
type EChartsType = echarts.EChartsType;

interface INumberObj {
  open: number;
  done: number;
  doing: number;
}

export default {
  name: "TaskAll",
  setup(props: any) {
    const numberObj = reactive<INumberObj>({
      open: 0,
      done: 0,
      doing: 0,
    });
    const options = reactive<EChartsOption>({
      title: {
        text: "任务总览",
        subtext: "",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "任务条数",
          type: "pie",
          radius: "50%",
          data: [
            { value: numberObj.done, name: "已完成" },
            { value: numberObj.open, name: "未完成" },
            { value: numberObj.doing, name: "进行中" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });

    onMounted(() => {
      const charts = document.getElementById("charts") as HTMLElement;
      const Chart: EChartsType = echarts.init(charts) as EChartsType;
      options && Chart.setOption(options);
    });

    return {
      ...toRefs(numberObj),
      options,
      props,
    };
  },
};
</script>

<style scoped lang="less">
#charts {
  width: 100%;
  height: 100%;
}
</style>