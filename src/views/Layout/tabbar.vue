<script setup lang="ts">
import { useSettingStore } from "@/store/modules/setting";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { InfoForm } from "@/api/user/type";
import { ref } from "vue";

const userStore = useUserStore();
const $route = useRoute();
const $router = useRouter();
const settingStore = useSettingStore();
const fullScreen = () => {
  let full = document.fullscreenElement;
  if (full) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
};
const logout = async () => {
  await userStore.userLogout();
  userStore.Token = "";
  userStore.userInfo = {} as InfoForm;
  $router.push({ path: "/login", query: { redirect: $route.path } });
};
const changeDark = () => {
  const html = document.querySelector("html");
  html?.classList.toggle("dark");
};
//title
const titleColor = ref("#409EFF");
const changeColor = () => {
  const html = document.querySelector("html");
  html?.style.setProperty("--el-color-primary", titleColor.value);
};
const isdrak = ref(false);
</script>
<template>
  <div class="tabbar_left">
    <el-icon
      ><component
        :is="settingStore.tabbar_isfold ? 'Fold' : 'Expand'"
        @click="settingStore.changeIcon()"
      ></component
    ></el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="ele in $route.matched"
        :key="ele.path"
        v-show="ele.name !== 'layout'"
        :to="{ path: ele.path }"
      >
        {{ ele.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="tabbar_right">
    <el-button
      icon="Refresh"
      circle
      @click="settingStore.refreshMain()"
    ></el-button>
    <el-button icon="FullScreen" circle @click="fullScreen"></el-button>
    <el-popover :width="400" title="主题设置" hide-after="4000">
      <template #reference>
        <el-button icon="Setting" circle></el-button>
      </template>
      <div>
        <span class="demonstration">主题颜色</span>
        <el-color-picker v-model="titleColor" @change="changeColor" />
      </div>
      <div>
        <span class="demonstration">暗黑模式</span>
        <el-switch v-model="isdrak" @change="changeDark" />
      </div>
    </el-popover>
    <img :src="userStore.userInfo.avatar" alt="" />
    <el-dropdown>
      <span class="el-dropdown-link">
        Admin
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<style>
.tabbar_left {
  font-size: 20px;
  display: flex;
  align-items: center;
  .el-icon {
    margin-right: 10px;
  }
  .el-breadcrumb__item {
    font-size: 16px;
  }
}
.tabbar_right {
  display: flex;
  align-items: center;
  img {
    width: 32px;
    height: 32px;
    margin: 0 10px;
  }
}
.demonstration {
  margin-right: 20px;
}
</style>
