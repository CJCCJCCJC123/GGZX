<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import {
  getskulist,
  reqdelsku,
  reqSalesku,
  reqGetsku,
  reqOffsku,
} from "@/api/product/sku";
import { ElMessage } from "element-plus";
import detail from "./detail.vue";
const pagedata = ref({
  currentPage: 1,
  pageSize: 3,
  total: 40,
});

//核心数据----------------------------------------------

const skulist = ref<any>([]);
const isdrawer = ref(false);
const skudetail = ref<any>({});
//核心数据----------------------------------------------

const getlisk = async () => {
  const res = await getskulist(
    pagedata.value.currentPage,
    pagedata.value.pageSize,
  );
  skulist.value = res.data.records;
  console.log(skulist.value);
  pagedata.value.total = res.data.total;
};
onMounted(() => {
  getlisk();
});
watch([() => pagedata.value.currentPage, () => pagedata.value.pageSize], () => {
  getlisk();
});
//事件
const toEdit = (row: any) => {
  console.log(row);
};
const toDel = async (row: any) => {
  await reqdelsku(row.id);
  ElMessage.error("系统数据无法删除");
};
const toUp = async (row: any) => {
  await reqSalesku(row.id);
  ElMessage.success("上架成功");
  getlisk();
};
const toDown = async (row: any) => {
  await reqOffsku(row.id);
  ElMessage.success("下架成功");
  getlisk();
};
const toLook = async (row: any) => {
  const res = await reqGetsku(row.id);
  console.log(res);
  skudetail.value = res.data;
  isdrawer.value = true;
};
</script>
<template>
  <el-table border :data="skulist">
    <el-table-column
      label="序号"
      type="index"
      width="70px"
      align="center"
    ></el-table-column>
    <el-table-column
      label="名称"
      width="300px"
      prop="skuName"
      show-overflow-tooltip
    ></el-table-column>
    <el-table-column
      label="描述"
      width="300px"
      prop="skuDesc"
      show-overflow-tooltip
    ></el-table-column>
    <el-table-column label="图片" width="300px">
      <template #="{ row }">
        <img :src="row.skuDefaultImg" alt="" />
      </template>
    </el-table-column>
    <el-table-column label="重量" width="300px" prop="weight"></el-table-column>
    <el-table-column label="价格" width="300px" prop="price"></el-table-column>
    <el-table-column label="操作" width="400px" fixed="right">
      <template #="{ row }">
        <el-button
          type="primary"
          size="small"
          @click="toEdit(row)"
          v-has="`btn.Sku.update`"
          >编辑</el-button
        >
        <el-button
          type="danger"
          size="small"
          @click="toDel(row)"
          v-has="`btn.Sku.remove`"
          >删除</el-button
        >
        <el-button
          type="success"
          size="small"
          @click="toUp(row)"
          v-if="row.isSale === 0"
          v-has="`btn.Sku.updown`"
          >上架</el-button
        >
        <el-button
          size="small"
          @click="toDown(row)"
          v-else
          v-has="`btn.Sku.updown`"
          >下架</el-button
        >
        <el-button
          type="warning"
          size="small"
          @click="toLook(row)"
          v-has="`btn.Sku.detail`"
          >查看</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    v-model:current-page="pagedata.currentPage"
    v-model:page-size="pagedata.pageSize"
    :page-sizes="[3, 4, 5]"
    :background="true"
    layout="prev, pager, next, jumper, -> , sizes, total"
    :total="pagedata.total"
  />
  <detail v-model:isdrawer="isdrawer" :skudetail="skudetail"></detail>
</template>
