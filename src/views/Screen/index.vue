<script lang="ts" setup>
import { ref, onMounted } from "vue";
import theTop from "./components/theTop.vue";
import theBody from "./components/theBody.vue";
//响应式布局
const getScale = () => {
  const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
  return scale;
};
const scale = ref(1);
window.onresize = () => {
  scale.value = getScale();
  const container = document.querySelector(".container");
  (container as HTMLElement).style.transform =
    `translate(-50%, -50%) scale(${scale.value}) `;
};
onMounted(() => {
  scale.value = getScale();
  const container = document.querySelector(".container");
  (container as HTMLElement).style.transform =
    `translate(-50%, -50%) scale(${scale.value}) `;
});
</script>
<template>
  <div class="container">
    <theTop />
    <theBody />
  </div>
  <div class="bg"></div>
</template>
<style lang="scss" scoped>
.bg {
  position: fixed;
  top: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/images/universe.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
.bg::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(4, 20, 57);
  opacity: 0.7;
}
.container {
  width: 1920px;
  height: 1080px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
