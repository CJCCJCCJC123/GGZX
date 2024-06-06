<script setup>
import logo from "./logo.vue";
import Menu from "./menu.vue";
import Main from "./main.vue";
import Tabbar from "./tabbar.vue";
import { useSettingStore } from "@/store/modules/setting";
import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore();
const settingStore = useSettingStore();
</script>
<template>
  <div class="layout_container">
    <div class="layout_side" :class="{ sidefold: settingStore.tabbar_isfold }">
      <logo></logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          background-color="#001529"
          text-color="white"
          :collapse="settingStore.tabbar_isfold"
          :default-active="$route.path"
        >
          <Menu :menulist="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div
      class="layout_tabbar"
      :class="{ tabbarfold: settingStore.tabbar_isfold }"
    >
      <Tabbar></Tabbar>
    </div>
    <div class="layout_main" :class="{ mainfold: settingStore.tabbar_isfold }">
      <div class="main_text">
        <Main></Main>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_side {
    overflow: hidden;
    width: $Base-menu-width;
    height: 100vh;
    background-color: $Base-menu-backgroudcolor;
    transition: all 0.3s;
  }
  .sidefold {
    width: $Base-menu-width-fold;
  }
  .layout_tabbar {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    position: fixed;
    top: 0;
    left: $Base-menu-width;
    height: 50px;
    width: calc(100% - $Base-menu-width);
    transition: all 0.3s;
  }
  .tabbarfold {
    left: $Base-menu-width-fold;
    width: calc(100% - $Base-menu-width-fold);
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $Base-menu-width);
    height: calc(100vh - 50px);
    top: 50px;
    left: $Base-menu-width;

    padding: 20px;
    transition: all 0.3s;
    .main_text {
      width: 100%;
      height: 100%;
    }
  }
  .mainfold {
    width: calc(100% - $Base-menu-width-fold);
    left: $Base-menu-width-fold;
  }
}
.scrollbar {
  height: calc(100vh - 50px);
  .el-menu {
    border-right: none;
  }
}
</style>
