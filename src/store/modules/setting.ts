import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingStore = defineStore("Setting", () => {
  const tabbar_isfold = ref(false); // 是否折叠
  const main_refresh = ref(false); // 主页是否刷新

  const changeIcon = () => {
    tabbar_isfold.value = !tabbar_isfold.value;
  };
  const refreshMain = () => {
    main_refresh.value = !main_refresh.value;
  };
  return {
    tabbar_isfold,
    main_refresh,
    changeIcon,
    refreshMain,
  };
});
