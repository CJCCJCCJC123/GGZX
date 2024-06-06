<script setup lang="ts">
import Title from "./title.vue";
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
const data = ref([
  {
    id: 1,
    year: "2020",
    yearVal: [
      1542, 6214, 1126, 214, 3982, 2015, 5123, 352, 3214, 1234, 3214, 6521,
    ],
  },
  {
    id: 2,
    year: "2021",
    yearVal: [
      1142, 5462, 3611, 2214, 6239, 2015, 3351, 952, 1432, 8412, 1032, 1165,
    ],
  },
  {
    id: 3,
    year: "2022",
    yearVal: [
      2145, 2164, 1216, 2114, 4239, 1815, 2351, 8352, 1432, 1212, 2132, 2165,
    ],
  },
  {
    id: 4,
    year: "2023",
    yearVal: [
      5421, 4146, 1261, 1412, 7239, 8115, 3351, 3252, 5421, 2312, 3314, 3521,
    ],
  },
]);
const chart = ref();
onMounted(() => {
  const myChart = echarts.init(chart.value);
  myChart.setOption({
    grid: {
      left: 40,
      right: 20,
      top: 20,
      bottom: 20,
    },
    legend: {
      data: [
        {
          name: "2021年",
          icon: "roundRect",
        },
        {
          name: "2022年",
          icon: "roundRect",
        },
        {
          name: "2023年",
          icon: "roundRect",
        },
      ],
      right: 10,
      textStyle: {
        color: "white",
        fontSize: 14,
      },
      inactiveColor: "rgba(255,255,255,0.3)",
      icon: "roundRect",
    },
    xAxis: {
      type: "category",
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
      axisLabel: {
        color: "white",
      },
      axisLine: {
        show: true,
      },
      axisTick: {
        show: false,
      },
      boundaryGap: false,
    },
    yAxis: {
      name: "(人数/千)",
      nameGap: -15,
      nameTextStyle: {
        color: "white",
        fontSize: 12,
      },
      type: "value",
      splitLine: {
        show: false,
      },
      axisLabel: {
        color: "white",
        margin: 5,
        showMaxLabel: false,
        formatter: function (value: number) {
          if (value === 0) return 0;
          return value / 1000 + "千";
        },
      },
      axisLine: {
        show: false,
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    series: [
      {
        name: "2021年",
        type: "line",
        data: data.value[1].yearVal,
        smooth: true,
        areaStyle: {
          color: "rgba(90, 29, 215,0.3)",
        },
        lineStyle: {
          color: "rgba(90, 29, 215,0.3)",
        },
        itemStyle: {
          color: "rgba(90, 29, 215,0.3)",
        },
        showSymbol: false,
      },
      {
        name: "2022年",
        type: "line",
        data: data.value[2].yearVal,
        smooth: true,
        areaStyle: {
          color: "rgba(85, 247, 4,0.3)",
        },
        lineStyle: {
          color: "rgba(85, 247, 4,0.3)",
        },
        itemStyle: {
          color: "rgba(85, 247, 4,0.3)",
        },
        showSymbol: false,
      },
      {
        name: "2023年",
        type: "line",
        data: data.value[3].yearVal,
        smooth: true,
        areaStyle: {
          color: "rgba(228, 8, 10,0.3)",
        },
        lineStyle: {
          color: "rgba(228, 8, 10,0.3)",
        },
        itemStyle: {
          color: "rgba(228, 8, 10,0.3)",
        },
        showSymbol: false,
      },
    ],
  });
});
</script>
<template>
  <div style="height: 100%">
    <Title title="年度游客量对比" />
    <div class="chart" ref="chart"></div>
  </div>
</template>
<style lang="scss" scoped>
.chart {
  height: calc(100% - 40px);
}
</style>
