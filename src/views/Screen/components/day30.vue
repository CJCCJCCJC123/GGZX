<script setup lang="ts">
import Title from "./title.vue";
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
const line = ref();
onMounted(() => {
  const myChart = echarts.init(line.value);
  myChart.setOption({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        animation: false,
        label: {
          backgroundColor: "#505765",
        },
      },
    },
    //改变坐标值的颜色
    xAxis: {
      type: "category",
      data: [
        "1号",
        "2号",
        "3号",
        "4号",
        "5号",
        "6号",
        "7号",
        "8号",
        "9号",
        "10号",
        "11号",
        "12号",
        "13号",
        "14号",
        "15号",
        "16号",
        "17号",
        "18号",
        "19号",
        "20号",
        "21号",
        "22号",
        "23号",
        "24号",
        "25号",
        "26号",
        "27号",
        "28号",
        "29号",
        "30号",
      ],
      boundaryGap: false,
      splitLine: {
        show: false,
      },
      axisLabel: {
        color: "white",
      },
    },
    yAxis: {
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        color: "white",
      },
    },
    grid: {
      left: 35,
      top: 20,
      right: 10,
      bottom: 20,
    },
    series: [
      {
        type: "line",
        data: [
          120, 162, 250, 300, 370, 210, 130, 100, 90, 120, 400, 150, 580, 320,
          110, 130, 300, 190, 320, 200, 250, 180, 70, 110, 130, 100, 90, 320,
          200, 550,
        ],
        smooth: true,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "red", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "blue", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  });
});
</script>
<template>
  <div>
    <Title title="未来30天游客量趋势图" />
    <div class="line" ref="line"></div>
  </div>
</template>
<style lang="scss" scoped>
.line {
  width: 100%;
  height: 230px;
  margin-top: 30px;
}
</style>
