<script setup lang="ts">
import { ref, watch } from "vue";
import { useCategoryStore } from "@/store/modules/category";
import type { SPU } from "@/api/product/spu/type.ts";
import skuForm from "./skuForm.vue";
import spuForm from "./spuForm.vue";
import { reqskulist, reqDelSku } from "@/api/product/spu";
const categoryStore = useCategoryStore();
const isdisabled = ref(true);
//设置场景
const scene = ref<number>(0);
const dialogTableVisible = ref(false);
//分页数据
const PaginationData = ref({
  currentPage: 1,
  pageSize: 10,
  total: 50,
});
//对话框数据
const skulist = ref([]);
//操作spuform
const spuform = ref();
const skuform = ref();
//分页事件
const handleSizeChange = () => {
  console.log("每页" + PaginationData.value.pageSize + "条");
};
const handleCurrentChange = () => {
  console.log("当前页" + PaginationData.value.currentPage);
};
//编辑或删除事件
const EditSpu = (row: SPU, _$index: number) => {
  scene.value = 2;
  isdisabled.value = false;
  spuform.value.getSPU(row);
};
const DelSpu = (row: SPU, $index: number) => {
  console.log(row, $index);
  reqDelSku(row.id).then(() => {
    categoryStore.getSPU({
      page: PaginationData.value.currentPage,
      limit: PaginationData.value.pageSize,
      category3Id: categoryStore.id3,
    });
  });
};
const SeaSpu = async (row: SPU, _$index: number) => {
  const res = await reqskulist(row.id);
  dialogTableVisible.value = true;
  skulist.value = res.data;
};
const PlusSpu = (row: SPU, _$index: number) => {
  scene.value = 1;
  isdisabled.value = false;
  skuform.value.getSKU(
    row,
    categoryStore.id1,
    categoryStore.id2,
    categoryStore.id3,
  );
};
const addSpu = () => {
  isdisabled.value = false;
  spuform.value.adSPU();
  scene.value = 2;
};
watch(
  [
    () => PaginationData.value.currentPage,
    () => PaginationData.value.pageSize,
    () => categoryStore.id3,
  ],
  () => {
    if (categoryStore.id3 === -1) return;
    const data = {
      page: PaginationData.value.currentPage,
      limit: PaginationData.value.pageSize,
      category3Id: categoryStore.id3,
    };
    categoryStore.getSPU(data);
  },
);
</script>
<template>
  <TheSelect :isdisabled="isdisabled"></TheSelect>
  <el-card style="margin: 10px 0">
    <div v-show="scene === 0">
      <el-button
        type="primary"
        icon="Plus"
        :disabled="categoryStore.id3 === -1 ? true : false"
        @click="addSpu"
        v-has="`btn.Spu.add`"
        >添加SPU</el-button
      >
      <el-table :data="categoryStore.spulist" border style="margin: 10px 0">
        <el-table-column
          label="序号"
          width="100"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column
          label="SPU名称"
          prop="spuName"
          width="200"
        ></el-table-column>
        <el-table-column
          label="SPU描述"
          prop="description"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              circle
              icon="Edit"
              @click="EditSpu(row, $index)"
              v-has="`btn.Spu.Update`"
            ></el-button>
            <el-button
              type="danger"
              circle
              icon="Delete"
              @click="DelSpu(row, $index)"
              v-has="`btn.Spu.remove`"
            ></el-button>
            <el-button
              circle
              icon="Search"
              @click="SeaSpu(row, $index)"
              v-has="`btn.Spu.skus`"
            ></el-button>
            <el-button
              circle
              type="success"
              icon="Plus"
              @click="PlusSpu(row, $index)"
              v-has="`btn.Spu.addsku`"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="PaginationData.currentPage"
        v-model:page-size="PaginationData.pageSize"
        :page-sizes="[2, 3, 4, 5, 10]"
        layout="prev, pager, next, jumper, ->,sizes, total"
        :total="PaginationData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog v-model="dialogTableVisible" title="SKU列表">
      <el-table :data="skulist">
        <el-table-column
          label="sku名字"
          prop="skuName"
          width="500    "
        ></el-table-column>
        <el-table-column label="sku价格" prop="price"></el-table-column>
        <el-table-column label="sku重量" prop="weight"></el-table-column>
        <el-table-column label="sku图片">
          <template #="{ row }">
            <img :src="row.skuDefaultImg" alt="" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <skuForm
      v-show="scene === 1"
      ref="skuform"
      v-model:scene="scene"
      v-model:isdisabled="isdisabled"
    ></skuForm>
    <spuForm
      v-show="scene === 2"
      ref="spuform"
      v-model:scene="scene"
      v-model:isdisabled="isdisabled"
    ></spuForm>
  </el-card>
</template>
