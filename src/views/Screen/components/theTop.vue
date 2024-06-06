<script lang="ts" setup>
import { nowtime } from "@/utils/time.ts";
import { ref, onMounted } from "vue";
const fullTime = ref();
setInterval(() => {
  fullTime.value = nowtime().fullTime;
}, 1000);
onMounted(() => {
  fullTime.value = nowtime().fullTime;
});
</script>
<template>
  <div class="top">
    <div style="flex: 2" class="left">
      <div class="left_btn">首页</div>
    </div>
    <div style="flex: 3" class="center">
      <div class="center_main">智慧旅游可视化大数据平台</div>
    </div>
    <div style="flex: 2" class="right">
      <div class="right_btn">统计报告</div>
      <p style="margin-right: 20px">当前时间：{{ fullTime }}</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.top {
  width: 100%;
  height: 40px;
  display: flex;
  color: rgb(23, 215, 254);
  text-align: center;
  font-size: 20px;
  .left {
    background-image: url("../images/dataScreen-header-left-bg.png");
    background-size: cover;
    .left_btn {
      float: right;
      width: 130px;
      height: 40px;
      background-image: url("../images/dataScreen-header-btn-bg-l.png");
      background-repeat: no-repeat;
      background-size: cover;
      line-height: 40px;
    }
  }
  .center {
    .center_main {
      width: 100%;
      height: 74px;
      background-image: url("../images/dataScreen-header-center-bg.png");
      background-size: cover;
      font-size: 35px;
      line-height: 74px;
    }
  }
  .right {
    background-image: url("../images/dataScreen-header-right-bg.png");
    background-size: cover;
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    .right_btn {
      width: 130px;
      height: 40px;
      background-image: url("../images/dataScreen-header-btn-bg-r.png");
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
}
</style>
