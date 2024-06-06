<script setup>
import { ref } from "vue";
defineProps({
  imgarr: Array,
});
</script>
<template>
  <el-carousel>
    <el-carousel-item v-for="ele in imgarr" :key="ele.id">
      <img :src="ele.imgUrl" style="width: 100%" />
    </el-carousel-item>
  </el-carousel>
</template>
