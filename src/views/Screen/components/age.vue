<script setup lang="ts">
import Title from "./title.vue";
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
const left = ref();
onMounted(() => {
  const myChart = echarts.init(left.value);
  const option = {
    tooltip: {
      trigger: "本日总数",
    },
    legend: {
      top: "15%",
      left: "75%",
      //竖直排列
      orient: "vertical",
      textStyle: {
        color: "white",
        fontSize: 14,
      },
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["50%", "80%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "inside",
          color: "white",
          formatter: "{d}" + "%",
          fontSize: 16,
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 16, name: "10岁以下" },
          { value: 8, name: "10-18岁" },
          { value: 12, name: "18-30岁" },
          { value: 24, name: "30-40岁" },
          { value: 20, name: "40-60岁" },
          { value: 20, name: "60岁以上" },
        ],
      },
    ],
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  };
  myChart.setOption(option);
});
</script>
<template>
  <div>
    <Title title="年龄比例" />
    <div class="body" ref="left"></div>
  </div>
</template>
<style lang="scss" scoped>
.body {
  display: flex;
  margin-top: 20px;
  padding: 0 20px;
  height: 240px;
  transform: translateX(-50px);
  overflow: visible;
}
</style>
