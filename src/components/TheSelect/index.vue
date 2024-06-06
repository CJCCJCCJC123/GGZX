<script setup>
import { ref, onMounted } from "vue";
import { useCategoryStore } from "@/store/modules/category";
import { useRoute } from "vue-router";
const $route = useRoute();
const categoryStore = useCategoryStore();
const value = ref({
  v1: "",
  v2: "",
  v3: "",
});
const click1 = (id) => {
  value.value.v2 = "";
  value.value.v3 = "";
  categoryStore.category3 = [];
  categoryStore.id1 = id;
  categoryStore.id2 = -1;
  categoryStore.id3 = -1;
  categoryStore.getCategory2(id);
};
const click2 = (id) => {
  value.value.v3 = "";
  categoryStore.id2 = id;
  categoryStore.id3 = -1;
  categoryStore.getCategory3(id);
};
const click3 = (id) => {
  categoryStore.id3 = id;
  console.log(categoryStore.id1, categoryStore.id2, categoryStore.id3);

  if ($route.path === "/product/attr") {
    categoryStore.getAttr();
  }
};
defineProps({
  isdisabled: Boolean,
});
onMounted(() => {
  categoryStore.getCategory1();
});
</script>
<template>
  <el-card style="margin: 10px 0">
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          style="width: 200px"
          v-model="value.v1"
          :disabled="!isdisabled"
        >
          <el-option
            v-for="(ele, index) in categoryStore.category1"
            :key="ele.id"
            :value="ele.name"
            :label="ele.name"
            @click="click1(ele.id)"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          style="width: 200px"
          v-model="value.v2"
          :disabled="!isdisabled"
        >
          <el-option
            v-for="(ele, index) in categoryStore.category2"
            :key="ele.id"
            :value="ele.name"
            :label="ele.name"
            @click="click2(ele.id)"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          style="width: 200px"
          v-model="value.v3"
          :disabled="!isdisabled"
        >
          <el-option
            v-for="(ele, index) in categoryStore.category3"
            :key="ele.id"
            :value="ele.name"
            :label="ele.name"
            @click="click3(ele.id)"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>
