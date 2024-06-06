<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  reqgetPermission,
  reqsavepermission,
  requpdataPermission,
  delpermission,
} from "@/api/acl/permission";
import type { menuParams } from "@/api/acl/permission/type";
//表格数据
const tableData = ref<Array<any>>();

//渲染函数
const getList = async () => {
  const res = await reqgetPermission();
  tableData.value = res.data;
};
//点击事件
const addMeun = (row: any) => {
  dialogData.value.visible = true;
  dialogData.value.title = "添加菜单";
  dialogData.value.formData.pid = row.id;
  dialogData.value.formData.level = row.level + 1;
};
const dialog_confirm = async () => {
  if (dialogData.value.formData.id) {
    const res = await requpdataPermission(dialogData.value.formData);
    console.log(res);
    getList();
    dialogData.value.visible = false;
    return;
  }
  const res = await reqsavepermission(dialogData.value.formData);
  dialogData.value.visible = false;
  console.log(res);
  getList();
};
const Edit = async (row: any) => {
  dialogData.value.visible = true;
  dialogData.value.title = "编辑菜单";
  Object.assign(dialogData.value.formData, row);
};
const Del = async (row: any) => {
  const res = await delpermission(row.id);
  console.log(res);
  getList();
};
//dialog对象
const dialogData = ref({
  visible: false,
  title: "",
  formData: <menuParams>{
    name: "",
    code: "",
    pid: 0,
    level: 0,
  },
});
//生命周期
onMounted(() => {
  getList();
});
</script>
<template>
  <el-table :data="tableData" row-key="id" lazy border>
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="权限值" prop="code"></el-table-column>
    <el-table-column label="修改时间" prop="updateTime"></el-table-column>
    <el-table-column label="操作" align="center">
      <template #="{ row }">
        <el-button
          type="primary"
          size="small"
          :disabled="row.level === 4 ? true : false"
          @click="addMeun(row)"
          >添加菜单</el-button
        >
        <el-button type="primary" size="small" @click="Edit(row)"
          >编辑</el-button
        >
        <el-button type="primary" size="small" @click="Del(row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-dialog :title="dialogData.title" v-model="dialogData.visible" width="30%">
    <el-form>
      <el-form-item>
        <el-input
          v-model="dialogData.formData.name"
          placeholder="请输入菜单名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="dialogData.formData.code"
          placeholder="请输入权限值"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dialog_confirm">确定</el-button>
        <el-button @click="dialogData.visible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
