<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { nowtime } from "@/utils/time";
import info from "@/utils/setting.ts";
const userStore = useUserStore();
const time = nowtime();
</script>
<template>
  <el-card>
    <template #default>
      <div class="defaults">
        <div>
          <img :src="userStore.userInfo.avatar" alt="" />
        </div>
        <div class="text">
          <p>{{ userStore.userInfo.name }}，{{ time.time }}</p>
          <p>欢迎来到{{ info.title }}</p>
        </div>
      </div>
    </template>
  </el-card>
  <svg-icon name="welcome" width="600px" height="600px"></svg-icon>
</template>
<style scoped lang="scss">
.defaults {
  display: flex;
  align-items: center;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
}
.text {
  margin-left: 50px;
  p {
    font-size: 30px;
    line-height: 50px;
    color: #333;
  }
}
svg {
  display: block;
  margin: 0 auto;
}
</style>
