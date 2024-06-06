<script setup lang="ts">
import type { SPU, SKU } from "@/api/product/spu/type.ts";
import { reqAttr } from "@/api/product/attr";
import { reqSaleAttrList, reqimgList, reqAddSku } from "@/api/product/spu";
import { ref } from "vue";
import { useCategoryStore } from "@/store/modules/category";
const categoryStore = useCategoryStore();
//state
const SpuData = ref<SPU>();
const ptattrs = ref<any>([]);
const pdattrsvals = ref<any>([]);
const saleattrs = ref<any>([]);
const saleattrsvals = ref<any>([]);
const imgs = ref<any>([]);
//表单数据
const skuName = ref<string>("");
const price = ref<number>();
const weight = ref<number>();
const skuDesc = ref<string>("");
const pramasData = ref<SKU>();
const skuAttrValueList = ref<any>([]);
const skuSaleAttrValueList = ref<any>([]);
const defaultImg = ref<string>("");
const emits = defineEmits(["update:scene", "update:isdisabled"]);
const cancel = () => {
  emits("update:scene", 0);
  emits("update:isdisabled", true);
};
//action
const addAttrval = (attrId: number, id: number, index: number) => {
  skuAttrValueList.value[index] = {
    attrId,
    valueId: id,
  };
};
const addSaleAttrval = (baseSaleAttrId: number, id: number, index: number) => {
  skuSaleAttrValueList.value[index] = {
    saleAttrId: baseSaleAttrId,
    saleAttrValueId: id,
  };
};
const setdefault = (row: any) => {
  defaultImg.value = row.imgUrl;
};
const getSKU = async (spu: SPU, id1: number, id2: number, id3: number) => {
  console.log(spu, id1, id2, id3);
  SpuData.value = spu;
  //获取平台属性
  const res1 = await reqAttr({ id1, id2, id3 });
  ptattrs.value = res1.data;
  console.log(ptattrs.value);
  pdattrsvals.value = ptattrs.value.map(() => {
    return "";
  });
  //获取销售属性
  const res2 = await reqSaleAttrList(spu.id);
  saleattrs.value = res2.data;
  saleattrsvals.value = saleattrs.value.map(() => {
    return "";
  });
  console.log(saleattrs.value);
  //获取图片
  const res3 = await reqimgList(spu.id);
  imgs.value = res3.data;
  console.log(imgs.value);
};
//发请求
const req = async () => {
  pramasData.value = {
    category3Id: categoryStore.id3,
    spuId: SpuData.value ? SpuData.value.id : undefined,
    tmId: SpuData.value?.tmId,
    skuName: skuName.value,
    price: price.value,
    weight: weight.value,
    skuDesc: skuDesc.value,
    skuAttrValueList: skuAttrValueList.value,
    skuSaleAttrValueList: skuSaleAttrValueList.value,
    skuDefaultImg: defaultImg.value,
  };
  console.log(pramasData.value);
  const res = await reqAddSku(pramasData.value);
  console.log(res);
};
defineExpose({
  getSKU,
});
</script>
<template>
  <el-form label-width="90px" label-position="left">
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称" v-model="skuName"></el-input>
    </el-form-item>
    <el-form-item label="价格（元）">
      <el-input
        placeholder="价格（元）"
        v-model="price"
        type="number"
      ></el-input>
    </el-form-item>
    <el-form-item label="重量（g）">
      <el-input
        placeholder="重量（g）"
        v-model="weight"
        type="number"
      ></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input
        placeholder="SKU描述"
        type="textarea"
        v-model="skuDesc"
      ></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form inline>
        <el-form-item
          v-for="(ele, index) in ptattrs"
          :key="ele.id"
          :label="ele.attrName"
          style="margin: 0 20px 10px 0"
        >
          <el-select style="width: 200px" v-model="pdattrsvals[index]">
            <el-option
              v-for="item in ele.attrValueList"
              :key="item.id"
              :value="item.valueName"
              :label="item.valueName"
              @click="addAttrval(item.attrId, item.id, index)"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form inline>
        <el-form-item
          v-for="(ele, index) in saleattrs"
          :key="ele.id"
          :label="ele.saleAttrName"
          style="margin: 0 20px 10px 0"
        >
          <el-select style="width: 200px" v-model="saleattrsvals[index]">
            <el-option
              v-for="item in ele.spuSaleAttrValueList"
              :key="item.id"
              :value="item.saleAttrValueName"
              :label="item.saleAttrValueName"
              @click="addSaleAttrval(item.baseSaleAttrId, item.id, index)"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table :data="imgs" border>
        <el-table-column
          type="selection"
          style="width: 100px"
          align="center"
        ></el-table-column>
        <el-table-column label="图片">
          <template #="{ row }">
            <img :src="row.imgUrl" :alt="row.imgName" style="width: 130px" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #="{ row }">
            <el-button type="primary" @click="setdefault(row)"
              >设置默认</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="req">提交</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
