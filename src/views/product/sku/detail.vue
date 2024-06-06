<script setup lang="ts">
const props = defineProps({
  isdrawer: Boolean,
  skudetail: Object,
});
const emits = defineEmits(["update:isdrawer"]);
const send = () => {
  emits("update:isdrawer", false);
};
</script>
<template>
  <el-drawer v-model="props.isdrawer" @close="send">
    <template #header>
      <div>商品详情</div>
    </template>
    <template #default>
      <el-row style="margin-bottom: 10px">
        <el-col :span="6" style="color: black; font-size: larger">名称</el-col>
        <el-col :span="18">{{ skudetail?.skuName }}</el-col>
      </el-row>
      <el-row style="margin-bottom: 10px">
        <el-col :span="6" style="color: black; font-size: larger">描述</el-col>
        <el-col :span="18">{{ skudetail?.skuDesc }}</el-col>
      </el-row>
      <el-row style="margin-bottom: 10px">
        <el-col :span="6" style="color: black; font-size: larger">价格</el-col>
        <el-col :span="18">{{ skudetail?.price }}元</el-col>
      </el-row>
      <el-row style="margin-bottom: 10px">
        <el-col :span="6" style="color: black; font-size: larger"
          >平台属性</el-col
        >
        <el-col :span="18">
          <el-tag
            v-for="ele in skudetail?.skuAttrValueList"
            :key="ele.id"
            style="margin: 0 10px 10px 0"
            >{{ ele.valueName }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 10px">
        <el-col :span="6" style="color: black; font-size: larger"
          >销售属性</el-col
        >
        <el-col :span="18">
          <el-tag
            v-for="ele in skudetail?.skuSaleAttrValueList"
            :key="ele.id"
            style="margin: 0 10px 10px 0"
            >{{ ele.saleAttrValueName }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 10px">
        <el-col :span="6" style="color: black; font-size: larger"
          >商品图片</el-col
        >
        <el-col :span="18">
          <Carousel :imgarr="skudetail?.skuImageList"></Carousel>
        </el-col>
      </el-row>
    </template>
  </el-drawer>
</template>
