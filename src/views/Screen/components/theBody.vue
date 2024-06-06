<script lang="ts" setup>
import tourist from "./tourist.vue";
import gender from "./gender.vue";
import age from "./age.vue";
import chinamap from "./map.vue";
import day30 from "./day30.vue";
import hotPlace from "./hotPlace.vue";
import yearcontrast from "./yearcontrast.vue";
import reserve from "./reserve.vue";
</script>
<template>
  <div class="body">
    <div style="flex: 1" class="left">
      <div class="tourist"><tourist /></div>
      <div class="gender"><gender /></div>
      <div class="age"><age /></div>
    </div>
    <div style="flex: 2" class="center">
      <div class="map"><chinamap /></div>
      <div class="day30"><day30 /></div>
    </div>
    <div style="flex: 1" class="right">
      <div class="hotPlace"><hotPlace /></div>
      <div class="yearcontrast"><yearcontrast /></div>
      <div class="reserve"><reserve /></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.body {
  color: rgb(255, 255, 255);
  display: flex;
  padding: 10px 20px;
  background-color: rgb(0, 0, 0);
  height: 1040px;
  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .tourist {
      height: 350px;
      background-image: url("../images/dataScreen-main-rt.png");
      background-size: cover;
    }
    .gender {
      height: 300px;
      background-image: url("../images/dataScreen-main-rt.png");
      background-size: cover;
    }
    .age {
      height: 300px;
      background-image: url("../images/dataScreen-main-rt.png");
      background-size: cover;
    }
  }
  .center {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 30px;
    .map {
      margin-top: 50px;
      height: 650px;
    }
    .day30 {
      height: 300px;
      background-image: url("../images/dataScreen-main-cb.png");
      background-size: cover;
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .hotPlace {
      height: 350px;
      background-image: url("../images/dataScreen-main-rt.png");
      background-size: cover;
    }
    .yearcontrast {
      height: 300px;
      background-image: url("../images/dataScreen-main-rt.png");
      background-size: cover;
    }
    .reserve {
      height: 300px;
      background-image: url("../images/dataScreen-main-rt.png");
      background-size: cover;
    }
  }
}
</style>
