<script setup>
import setting from "@/utils/setting";
</script>
<template>
  <div class="layout_logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>
<style lang="scss" scoped>
.layout_logo {
  width: $Base-menu-width;
  height: $Base-login-height;
  display: flex;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    margin: 0 10px;
  }
  p {
    color: #fff;
    font-size: larger;
  }
}
</style>
