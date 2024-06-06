<script lang="ts" setup>
const props = defineProps<{ title: string }>();
</script>
<template>
  <div class="title">
    <p class="text">{{ props.title }}</p>
    <div class="bg"></div>
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.title {
  .text {
    font-size: 20px;
    color: white;
    margin-bottom: 5px;
  }
  .bg {
    width: 100px;
    height: 5px;
    background-image: url("../images/dataScreen-title.png");
  }
}
</style>
