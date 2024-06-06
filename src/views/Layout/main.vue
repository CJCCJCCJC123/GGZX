<script setup>
import { watch, ref, nextTick } from "vue";
import { useSettingStore } from "@/store/modules/setting";
const settingStore = useSettingStore();
const flag = ref(true);
watch(
  () => settingStore.main_refresh,
  () => {
    flag.value = false;
    //响应式数据被改变后，确保新的dom已经渲染完成，nextTick才会触发，异步事件
    nextTick(() => {
      flag.value = true;
    });
  },
);
</script>
<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>
<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
