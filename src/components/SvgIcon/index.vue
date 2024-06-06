<script setup lang="ts">
// defineProps(['prefix','name', 'color', 'width', 'height'])
defineProps({
  prefix: {
    type: String,
    default: "#icon-",
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "black",
  },
  width: {
    type: [String, Number],
    default: "1em",
  },
  height: {
    type: [String, Number],
    default: "1em",
  },
});
</script>
<template>
  <svg :style="{ width, height }">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>
