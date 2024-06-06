<script setup lang="ts">
import Title from "./title.vue";
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
const colors = ref([
  {
    color: "red",
    id: 1,
    num: 8,
    name: "北京",
  },
  {
    color: "green",
    id: 2,
    num: 6,
    name: "上海",
  },
  {
    color: "blue",
    id: 3,
    num: 5,
    name: "广州",
  },
  {
    color: "gray",
    id: 4,
    num: 3,
    name: "深圳",
  },
  {
    color: "pink",
    id: 5,
    num: 2,
    name: "杭州",
  },
]);
const chart = ref();
onMounted(() => {
  const myChart = echarts.init(chart.value);
  myChart.setOption({
    xAxis: {
      type: "value",
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "category",
      data: colors.value.map((ele) => ele.name),
      inverse: true,
      axisLabel: {
        color: "white",
        fontSize: 14,
        fontWeight: 700,
        margin: 50,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    grid: {
      left: 106,
      right: 80,
      top: 0,
      bottom: 0,
    },
    series: [
      {
        type: "bar",
        data: colors.value.map((ele) => ele.num),
        itemStyle: {
          color: (data: any) => colors.value[data.dataIndex].color,
          barBorderRadius: 10,
        },
        z: 3,
        barWidth: 13,
      },
      {
        type: "bar",
        data: colors.value.map((_ele) => 10),
        barGap: "-115%",
        itemStyle: {
          color: "rgba(0,0,0,0)",
          borderWidth: 2,
          borderColor: "#5DE2E7",
          barBorderRadius: 10,
        },
        barWidth: 17,
        label: {
          show: true,
          position: "right",
          color: "white",
          fontSize: 14,
          fontWeight: 700,
          formatter: (data: any) => colors.value[data.dataIndex].num + "0万人",
          distance: 25,
        },
      },
    ],
  });
});
</script>
<template>
  <div>
    <Title title="热门城市排行" />
    <div class="titles">
      <p class="p1">排名</p>
      <p class="p1">景区</p>
      <p class="p3">预约数量</p>
    </div>
    <div class="rank">
      <div class="no">
        <div
          v-for="ele in colors"
          :key="ele.id"
          class="no_ele"
          :style="{ backgroundColor: ele.color }"
        >
          {{ "NO." + ele.id }}
        </div>
      </div>
      <div class="chart" ref="chart"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.titles {
  height: 40px;
  background-image: url(../images/dataScreen-warn-bg.png);
  background-size: 100% 100%;
  margin: 40px 20px 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  p {
    color: rgb(107, 227, 199);
    font-weight: 700;
  }
  .p1 {
    flex: 1;
  }
  .p1 {
    flex: 1;
  }
  .p3 {
    flex: 3;
  }
}
.rank {
  margin: 0 20px 20px 20px;
  display: flex;
  .no {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .no_ele {
      line-height: 30px;
      text-align: center;
      font-size: 14px;
      color: white;
      margin: 5px 13px;
      border-radius: 1% 70%;
    }
  }
  .chart {
    flex: 4;
  }
}
</style>
