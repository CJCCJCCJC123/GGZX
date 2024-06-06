<script setup lang="ts">
import Title from "./title.vue";
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
const chart = ref();
onMounted(() => {
  const myChart = echarts.init(chart.value);
  myChart.setOption({
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },

    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1],
      },
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: "75%",
        center: ["50%", "50%"],
        data: [
          { value: 335, name: "智慧平台" },
          { value: 310, name: "飞猪" },
          { value: 274, name: "直销" },
          { value: 235, name: "超级文旅" },
          { value: 400, name: "小飞棍" },
        ].sort(function (a, b) {
          return a.value - b.value;
        }),
        roseType: "radius",
        label: {
          color: "rgba(255, 255, 255, 0.8)",
          fontSize: 18,
        },
        labelLine: {
          lineStyle: {
            color: "rgba(255, 255, 255, 0.3)",
          },
          smooth: 0.2,
          length: 10,
          length2: 20,
        },
        itemStyle: {
          color: "#c23531",
          shadowBlur: 200,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },

        animationType: "scale",
        animationEasing: "elasticOut",
        animationDelay: function (_idx: any) {
          return Math.random() * 200;
        },
      },
    ],
  });
});
</script>
<template>
  <div style="height: 100%">
    <Title title="预约渠道数据统计" />
    <div class="chart" ref="chart"></div>
  </div>
</template>
<style lang="scss" scoped>
.chart {
  height: calc(100% - 40px);
}
</style>
