<script setup>
import { useRouter } from "vue-router";
const props = defineProps(["menulist"]);
const $router = useRouter();
const goRoute = (e) => {
  $router.push(e.index);
};
</script>
<script>
export default {
  name: "Menu",
};
</script>
<template>
  <template v-for="(ele, index) in menulist" :key="ele.path">
    <!-- 无子 -->
    <template v-if="!ele.children">
      <el-menu-item v-if="!ele.hidden" :index="ele.path" @click="goRoute">
        <el-icon>
          <component :is="ele.icon"></component>
        </el-icon>
        <span>{{ ele.mate }}</span>
      </el-menu-item>
    </template>
    <!-- 一子 -->
    <template v-if="ele.children && ele.children.length === 1">
      <el-menu-item v-if="!ele.hidden" :index="ele.path" @click="goRoute">
        <el-icon>
          <component :is="ele.children[0].icon"></component>
        </el-icon>
        <span>{{ ele.children[0].mate }}</span>
      </el-menu-item>
    </template>
    <!-- 一子以上 -->
    <template v-if="ele.children && ele.children.length > 1">
      <el-sub-menu v-if="!ele.hidden" :index="ele.path">
        <template #title>
          <el-icon>
            <component :is="ele.icon"></component>
          </el-icon>
          <span>{{ ele.mate }}</span>
        </template>
        <Menu :menulist="ele.children"></Menu>
      </el-sub-menu>
    </template>
  </template>
</template>
<style lang="scss" scoped></style>
