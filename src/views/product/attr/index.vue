<script setup lang="ts">
import { nextTick, ref, onBeforeUnmount } from "vue";
import { useCategoryStore } from "@/store/modules/category";
import type { updateType } from "@/api/product/attr/type.ts";
import { requpdateoraddAttr, reqDeleteAttr } from "@/api/product/attr/index.ts";
import { ElMessage } from "element-plus";
import { dataObj } from "@/api/product/attr/type";
const categoryStore = useCategoryStore();
const isEdit = ref(true);
const onadd = () => {
  isEdit.value = !isEdit.value;
  paramsData.value.categoryId = categoryStore.id3;
};
const onEdit = (row: any) => {
  isEdit.value = !isEdit.value;
  Object.assign(paramsData.value, JSON.parse(JSON.stringify(row)));
};
const onSave = () => {
  requpdateoraddAttr(paramsData.value).then((res) => {
    console.log(res);
  });
};
const onCancel = () => {
  isEdit.value = !isEdit.value;
};
const onDel = async (row: any) => {
  await reqDeleteAttr(row.id);
  ElMessage.success("删除成功");
  categoryStore.getAttr();
};
const onBlur = (row: any, index: number) => {
  if (row.valueName === "") {
    ElMessage.error("属性值不能为空");
    paramsData.value.attrValueList.splice(index, 1);
  }
  //不能有重复
  const repate = paramsData.value.attrValueList.find((ele) => {
    if (ele != row) {
      return ele.valueName === row.valueName;
    }
  });
  if (repate) {
    ElMessage.error("属性值不能重复");
    paramsData.value.attrValueList.splice(index, 1);
  }
  row.isLook = !row.isLook;
};
const toEdit = (row: any, $index: any) => {
  row.isLook = !row.isLook;
  nextTick(() => {
    refArr.value[$index].focus();
  });
};
const toDelArr = (_row: any, index: number) => {
  paramsData.value.attrValueList.splice(index, 1);
};
//新增属性值
const addAttr = () => {
  paramsData.value.attrValueList.push({
    valueName: "",
    isLook: true,
  });
  nextTick(() => {
    refArr.value[refArr.value.length - 1].focus();
  });
};
const paramsData = ref<updateType>({
  attrName: "",
  attrValueList: [],
  categoryId: "",
  categoryLevel: 3,
});
const refArr = ref<any>([]);
onBeforeUnmount(() => {
  //@ts-ignore
  categoryStore.attrlist = ref<Array<dataObj>>([]);
});
</script>
<template>
  <TheSelect :isdisabled="isEdit"></TheSelect>
  <el-card>
    <div v-if="isEdit">
      <el-button
        type="primary"
        icon="Plus"
        style="margin-bottom: 10px"
        :disabled="categoryStore.id3 === -1"
        @click="onadd"
        v-has="`btn.Attr.add`"
        >添加属性</el-button
      >
      <el-table border :data="categoryStore.attrlist">
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="属性名称" prop="attrName"></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row }">
            <el-tag v-for="ele in row.attrValueList" style="margin: 5px">{{
              ele.valueName
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #="{ row }">
            <el-button
              @click="onDel(row)"
              type="danger"
              icon="Delete"
              v-has="`btn.Attr.remove`"
              >删除</el-button
            >
            <el-button
              @click="onEdit(row)"
              type="primary"
              icon="Edit"
              v-has="`btn.Attr.update`"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <el-form>
        <el-form-item label="属性名称：">
          <el-input
            placeholder="输入属性的名字"
            style="width: 200px"
            v-model="paramsData.attrName"
          ></el-input>
        </el-form-item>
        <el-button
          type="primary"
          icon="Plus"
          @click="addAttr"
          v-has="`btn.Attr.add`"
          >添加属性值</el-button
        >
        <el-table
          border
          style="margin: 10px 0"
          :data="paramsData.attrValueList"
        >
          <el-table-column
            label="序号"
            type="index"
            width="100"
          ></el-table-column>
          <el-table-column label="属性值">
            <template #="{ row, $index }">
              <el-input
                v-model="row.valueName"
                v-if="row.isLook"
                @blur="onBlur(row, $index)"
                :ref="(vc: any) => (refArr[$index] = vc)"
              ></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button
                icon="Delete"
                circle
                type="danger"
                @click="toDelArr(row, $index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="onSave"
          :disabled="paramsData?.attrValueList.length > 0 ? false : true"
          >保存</el-button
        >
        <el-button @click="onCancel">取消</el-button>
      </el-form>
    </div>
  </el-card>
</template>
