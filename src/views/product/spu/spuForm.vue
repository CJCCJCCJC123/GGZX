<script setup lang="ts">
import type { SPU } from "@/api/product/spu/type.ts";
import {
  reqTrademarkList,
  reqimgList,
  reqSaleAttrList,
  reqTotalSaleAttrList,
  reqAddSpu,
} from "@/api/product/spu/index.ts";
import { ref, computed, nextTick } from "vue";
import { useCategoryStore } from "@/store/modules/category";
import { ElMessage } from "element-plus";
const category = useCategoryStore();
//SPU表单
const selected1 = ref("");
const selected2 = ref("");
const spuName = ref("");
const spuDesc = ref("");
const tmId = ref<any>();
const spuId = ref<number>();
const remAttr = ref<any>([]);
const refArr = ref<any>([]);
const placeholder = computed(() => {
  if (remAttr.value.length === 0) {
    return "暂无可选销售属性";
  }
  return `${remAttr.value.length}个销售属性未绑定`;
});
defineProps({
  scene: Number,
});
const emits = defineEmits(["update:scene", "update:isdisabled"]);
//点击事件
const onSave = async () => {
  //建立spu请求数据
  const data = {
    id: spuId.value ? spuId.value : undefined,
    spuName: spuName.value,
    description: spuDesc.value,
    tmId: tmId.value,
    category3Id: category.id3,
    spuImageList: imglist.value.map((ele: any) => {
      return {
        imgName: ele.name,
        imgUrl: (ele.response && ele.response.data) || ele.url,
      };
    }),
    spuSaleAttrList: saleAttrlist.value,
  };
  console.log(data);
  const res = await reqAddSpu(data);
  console.log(res);
  emits("update:scene", 0);
  emits("update:isdisabled", true);
};
const onCancel = () => {
  emits("update:scene", 0);
  emits("update:isdisabled", true);
};
const Del = (row: any, $index: number) => {
  console.log(row);
  saleAttrlist.value.splice($index, 1);
  getremattr();
};
const dialogVisible = ref(false);
const dialogImageUrl = ref("");
const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};
const addAttr = () => {
  const [name, id] = selected2.value.split(":");
  console.log(name, id);
  saleAttrlist.value.push({
    baseSaleAttrId: id,
    saleAttrName: name,
    spuId: spuId.value,
    flag: false,
    spuSaleAttrValueList: [],
  });
  selected2.value = "";
  getremattr();
};
const addattrval = (row: any, $index: number) => {
  //把新属性值添加进入数组
  saleAttrlist.value[$index].spuSaleAttrValueList.push({
    baseSaleAttrId: row.baseSaleAttrId,
    saleAttrValueName: row.newarrtvalue,
  });
  if (row.newarrtvalue === "") {
    ElMessage.error("属性值不能为空");
    saleAttrlist.value[$index].spuSaleAttrValueList.pop();
  }
  const repate = saleAttrlist.value[$index].spuSaleAttrValueList.filter(
    (ele: any) => {
      if (ele.saleAttrValueName === row.newarrtvalue) {
        return ele;
      }
    },
  );
  console.log(repate.length);
  if (repate.length > 1) {
    ElMessage.error("属性值不能重复");
    saleAttrlist.value[$index].spuSaleAttrValueList.pop();
  }
  row.newarrtvalue = "";
  row.isLook = false;
};
const selectpp = (id: number) => {
  tmId.value = id;
};
const green = (row: any, _$index: number) => {
  row.isLook = true;
  row.newarrtvalue = "";
  nextTick(() => {
    refArr.value[refArr.value.length - 1].focus();
  });
};
//获取完整spu数据
const trademarklist = ref<any>([]);
const imglist = ref<any>([]);
const saleAttrlist = ref<any>([]);
const totalSaleAttrlist = ref<any>([]);
const getremattr = () => {
  const newsaleAttrlist = saleAttrlist.value.map((ele: any) => {
    return ele.saleAttrName;
  });
  remAttr.value = totalSaleAttrlist.value.filter((ele: any) => {
    return !newsaleAttrlist.includes(ele.name);
  });
};
const getSPU = async (row: SPU) => {
  spuName.value = row.spuName;
  spuDesc.value = row.description;
  tmId.value = row.tmId;
  if (row.id) {
    spuId.value = row.id;
  }
  const res1 = await reqTrademarkList();
  trademarklist.value = res1.data;
  selected1.value =
    trademarklist.value.find((ele: any) => ele.id === tmId.value)?.tmName || "";
  if (row.id) {
    const res2 = await reqimgList(row.id);
    imglist.value = res2.data.map((ele) => {
      return {
        name: ele.imgName,
        url: ele.imgUrl,
      };
    });
    const res3 = await reqSaleAttrList(row.id);
    saleAttrlist.value = res3.data;
  }
  const res4 = await reqTotalSaleAttrList();
  totalSaleAttrlist.value = res4.data;
  getremattr();
};
const adSPU = async () => {
  spuName.value = "";
  spuDesc.value = "";
  tmId.value = "";
  selected1.value = "";
  spuId.value = undefined;
  imglist.value = [];
  saleAttrlist.value = [];
  const res = await reqTotalSaleAttrList();
  totalSaleAttrlist.value = res.data;
  const res1 = await reqTrademarkList();
  trademarklist.value = res1.data;
  getremattr();
};
defineExpose({
  getSPU,
  adSPU,
});
</script>
<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入SPU名称" v-model="spuName"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="selected1" style="width: 240px">
        <el-option
          v-for="ele in trademarklist"
          :key="ele.id"
          :label="ele.tmName"
          :value="ele.tmName"
          @click="selectpp(ele.id)"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        text="textarea"
        placeholder="请输入SPU描述"
        v-model="spuDesc"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU图标">
      <el-upload
        v-model:file-list="imglist"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img w-full alt="Preview Image" :src="dialogImageUrl" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        v-model="selected2"
        :placeholder="placeholder"
        style="width: 240px; margin-right: 10px"
      >
        <el-option
          v-for="ele in remAttr"
          :key="ele.id"
          :label="ele.name"
          :value="`${ele.name}:${ele.id}`"
        ></el-option>
      </el-select>
      <el-button
        type="primary"
        icon="Plus"
        @click="addAttr"
        :disabled="remAttr.length === 0 || selected2 === ''"
        >添加属性</el-button
      >
      <el-table border :data="saleAttrlist" style="margin: 10px 0">
        <el-table-column
          label="序号"
          type="index"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          label="销售属性名字"
          width="150"
          prop="saleAttrName"
          align="center"
        ></el-table-column>
        <el-table-column label="销售属性值">
          <template #="{ row, $index }">
            <el-tag
              type="primary"
              v-for="ele in row.spuSaleAttrValueList"
              :key="ele.id"
              style="margin: 0 10px"
              >{{ ele.saleAttrValueName }}</el-tag
            >
            <el-input
              style="width: 80px"
              v-model="row.newarrtvalue"
              v-if="row.isLook"
              @blur="addattrval(row, $index)"
              :ref="(vc: any) => (refArr[$index] = vc)"
            ></el-input>
            <el-button
              type="success"
              icon="Plus"
              size="small"
              @click="green(row, $index)"
              v-else
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #="{ row, $index }">
            <el-button @click="Del(row, $index)" icon="Delete" type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-button @click="onSave" type="primary">保存</el-button>
    <el-button @click="onCancel" type="primary">取消</el-button>
  </el-form>
</template>
