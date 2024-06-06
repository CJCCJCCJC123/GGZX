<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import {
  reqGetRule,
  reqSaveOrUpdateRule,
  retAllPermission,
  reqAssgin,
  redDelRole,
} from "@/api/acl/role";
import type { RoleData } from "@/api/acl/role/type.ts";
//state
const searchValue = ref("");
const pageData = ref({
  currentPage: 1,
  pageSize: 10,
  total: 20,
});

const drawerData = ref({
  id: 0,
  ids: <any>[],
  visible: false,
  title: "分配权限",
  assigndata: <any>[],
  selectData: <any>[],
});
//递归函数
const renderTree = (data: Array<any>) => {
  return data.map((ele: any) => {
    let obj = {
      id: ele.id,
      name: ele.name,
      select: ele.select,
      level: ele.level,
      children: <any>[],
    };
    if (ele.children.length > 0) {
      obj.children = renderTree(ele.children);
    }
    return obj;
  });
};
const renderTree2 = (data: Array<any>) => {
  data.forEach((ele: any) => {
    if (ele.select && ele.level === 4) {
      drawerData.value.selectData.push(ele.id);
    }
    if (ele.children.length > 0) {
      renderTree2(ele.children);
    }
  });
};
//action
const reset = () => {
  searchValue.value = "";
  renderList();
};
const Edit = (id: number) => {
  dialogData.value.id = id;
  dialogData.value.title = "编辑角色";
  dialogData.value.visible = true;
};
const Add = () => {
  dialogData.value.id = 0;
  dialogData.value.title = "添加角色";
  dialogData.value.visible = true;
};
const Delete = async (id: number) => {
  const res = await redDelRole(id);
  console.log(res);
  renderList();
};
const cancel = () => {
  dialogData.value.visible = false;
};
const confrim = async () => {
  const res = await reqSaveOrUpdateRule({
    id: dialogData.value.id,
    roleName: dialogData.value.name,
  });
  console.log(res);
  dialogData.value.visible = false;
  renderList();
};
const assign = async (row: any) => {
  drawerData.value.id = row.id;
  drawerData.value.visible = true;
  drawerData.value.title = `分配权限-${row.roleName}`;
  const res = await retAllPermission(row.id);

  drawerData.value.assigndata = renderTree(res.data);
  console.log(drawerData.value.assigndata);
  drawerData.value.selectData = [];
  renderTree2(res.data);
  console.log(drawerData.value.selectData);
};
const handleNodeClick = (_e: any, a: any) => {
  console.log(a);
  drawerData.value.ids = [...a.checkedKeys, ...a.halfCheckedKeys];
};
const confirm_assign = async () => {
  const res = await reqAssgin(drawerData.value.id, drawerData.value.ids);
  console.log(res);
  drawerData.value.visible = false;
};
//table
const tableData = ref<RoleData[]>();
//dialog
const dialogData = ref({
  id: 0,
  visible: false,
  title: "",
  name: "",
  ids: [],
});
//渲染函数
const renderList = async () => {
  const res = await reqGetRule(
    pageData.value.currentPage,
    pageData.value.pageSize,
    searchValue.value,
  );
  tableData.value = res.data.records;
  pageData.value.total = res.data.total;
};
//生命周期
onMounted(() => {
  renderList();
});
//监视器
watch(
  [
    () => pageData.value.currentPage,
    () => pageData.value.pageSize,
    () => searchValue.value,
  ],
  () => {
    renderList();
  },
);
</script>
<template>
  <!-- card头部 -->
  <el-card>
    <el-form class="el-form">
      <el-form-item label="角色名称：" class="el-form-item">
        <el-input
          placeholder="角色名称"
          style="width: 200px"
          v-model="searchValue"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <!-- card身体 -->
  <el-card style="margin-top: 10px">
    <el-button type="primary" icon="Plus" @click="Add">添加角色</el-button>
    <el-table border style="margin: 10px 0" :data="tableData">
      <el-table-column align="center" type="index" label="#"></el-table-column>
      <el-table-column align="center" label="id" prop="id"></el-table-column>
      <el-table-column
        align="center"
        label="角色名称"
        prop="roleName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="创建时间"
        prop="createTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        align="center"
        label="更新时间"
        prop="updateTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="center" label="操作" width="400">
        <template #="{ row }">
          <el-button type="primary" icon="User" @click="assign(row)"
            >分配权限</el-button
          >
          <el-button type="primary" icon="Edit" @click="Edit(row.id)"
            >编辑</el-button
          >
          <el-button type="primary" icon="Delete" @click="Delete(row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageData.currentPage"
      v-model:page-size="pageData.pageSize"
      :page-sizes="[3, 5, 10]"
      background
      layout="total, sizes,->, prev, pager, next"
      :total="pageData.total"
    />
  </el-card>
  <el-dialog :title="dialogData.title" v-model="dialogData.visible">
    <el-form>
      <el-form-item label="角色名称">
        <el-input v-model="dialogData.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confrim">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- //权限抽屉 -->
  <el-drawer :title="drawerData.title" v-model="drawerData.visible">
    <el-tree
      :data="drawerData.assigndata"
      :props="{ label: 'name', children: 'children' }"
      node-key="id"
      show-checkbox
      :default-expanded-keys="drawerData.selectData"
      :default-checked-keys="drawerData.selectData"
      @check="handleNodeClick"
    />
    <el-button type="primary" @click="confirm_assign">确定</el-button>
    <el-button @click="drawerData.visible = false">取消</el-button>
  </el-drawer>
</template>
<style lang="scss" scoped>
.el-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
