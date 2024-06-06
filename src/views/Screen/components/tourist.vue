<script setup lang="ts">
import { ref, onMounted } from "vue";
import Title from "./title.vue";
import * as echarts from "echarts";
import "echarts-liquidfill";
const people = ref("216908人");
//echarts
const charts = ref();
onMounted(() => {
  const myChart = echarts.init(charts.value);
  const option = {
    series: [
      {
        type: "liquidFill",
        data: [0.4, 0.35],
        color: ["#286e67", "#0bcaaa"],
        radius: "90%",
        label: {
          position: ["50%", "30%"],
          formatter: "预计15000人",
          fontSize: 18,
          color: "blue",
        },
        outline: {
          borderDistance: 10,
          itemStyle: {
            borderWidth: 5,
            borderColor: "#0bcaaa",
            borderType: "dashed",
          },
        },
        backgroundStyle: {
          borderWidth: 2,
          borderColor: "#0bcaaa",
          shadowBlur: 10,
          shadowColor: "#0bcaaa",
        },
      },
    ],
  };
  myChart.setOption(option);
});
</script>
<template>
  <div>
    <Title title="实时游客统计">
      <p class="total">
        可预约总量<span style="font-style: italic; color: orange">9999</span>人
      </p>
    </Title>
    <div class="people">
      <span v-for="(ele, index) in people" :key="index">{{ ele }}</span>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>
<style lang="scss" scoped>
.total {
  float: right;
  margin-right: 20px;
}
.people {
  margin: 40px 40px 10px 40px;
  display: flex;
  span {
    height: 53.58px;
    display: inline-block;
    flex: 1;
    background-image: url("../images/total.png");
    background-repeat: no-repeat;
    background-size: cover;
    font-size: 30px;
    line-height: 53.58px;
    text-align: center;
    color: rgb(23, 215, 254);
  }
}
.charts {
  width: 100%;
  height: 200px;
}
</style>
