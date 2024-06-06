<script setup lang="ts">
import Title from "./title.vue";
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
const charts = ref<any>();
onMounted(() => {
  const myChart = echarts.init(charts.value);
  const option = {
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: "category",
    },
    series: [
      {
        type: "bar",
        data: [58],
        barWidth: 20,
        z: 3,
        itemStyle: {
          color: "blue",
          borderRadius: [10, 0, 0, 10],
        },
      },
      {
        type: "bar",
        data: [100],
        barWidth: 20,
        barGap: "-100%",
        itemStyle: {
          color: "pink",
          borderRadius: 10,
        },
      },
    ],
    grid: {
      left: 50,
      right: 50,
      top: 0,
      bottom: 0,
    },
  };
  myChart.setOption(option);
});
</script>
<template>
  <div>
    <Title title="男女比例" />
    <div class="gender">
      <div class="man_bg">
        <div class="man"></div>
      </div>
      <div class="woman_bg">
        <div class="woman"></div>
      </div>
    </div>
    <div class="rate">
      <p>男性58%</p>
      <p>女性42%</p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>
<style lang="scss" scoped>
.gender {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  .man_bg {
    width: 120px;
    height: 120px;
    background-image: url(../images/man-bg.png);
    background-size: cover;
    margin: 0 20px;
    position: relative;
    .man {
      width: 80px;
      height: 80px;
      background-image: url(../images/man.png);
      background-size: cover;
      position: absolute;
      left: 20px;
      bottom: 10px;
    }
  }
  .woman_bg {
    width: 120px;
    height: 120px;
    background-image: url(../images/woman-bg.png);
    margin: 0 20px;
    background-size: cover;
    position: relative;
    .woman {
      width: 80px;
      height: 80px;
      background-image: url(../images/woman.png);
      background-size: cover;
      position: absolute;
      left: 20px;
      bottom: 10px;
    }
  }
}
.rate {
  width: 100%;
  height: 30px;
  display: flex;
  color: rgb(255, 255, 255);
  justify-content: space-around;
  font-size: 20px;
  line-height: 30px;
}
.charts {
  height: 30px;
  width: 100%;
}
</style>
