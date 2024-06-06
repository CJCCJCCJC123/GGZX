<script setup lang="ts">
import {
  reqUserList,
  reqSaveUser,
  reqGetUser,
  reqUpdateUser,
  reqGetRole,
  reqassignRole,
  reqDelUser,
  reqDelUsers,
} from "@/api/acl/user";
import { ref, onMounted, watch } from "vue";
import type { User, Users } from "@/api/acl/user/type.ts";
const pageData = ref({
  currentPage: 1,
  pageSize: 5,
  total: 40,
});
const drawerData = ref({
  isdrawer: false,
  title: "添加用户",
  isadd: true,
});
const drawerData2 = ref({
  isdrawer: false,
  username: "",
  checkBoxes: [],
  allcheckboxes: <any>[],
  userId: 0,
});

const formValue = ref({
  username: "",
  name: "",
  password: "",
});
const keyword = ref("");
const delList = ref<number[]>();
const drawRef = ref<any>();
//用户列表
const userList = ref<Users>([]);
//获取列表
const getUserList = async () => {
  const res = await reqUserList(
    pageData.value.currentPage,
    pageData.value.pageSize,
    keyword.value,
  );
  userList.value = res.data.records;
  pageData.value.total = res.data.total;
};
//点击事件们
const add = () => {
  drawerData.value.isdrawer = true;
  drawerData.value.isadd = true;
  drawerData.value.title = "添加用户";
};
const toFenlei = async (row: User) => {
  const res = await reqGetRole(row.id ? row.id : 0);
  drawerData2.value.userId = row.id ? row.id : 0;
  drawerData2.value.allcheckboxes = res.data.allRolesList;
  drawerData2.value.checkBoxes = res.data.assignRoles;
  drawerData2.value.isdrawer = true;
  drawerData2.value.username = row.username;
};
const toEdit = async (row: User) => {
  drawerData.value.isdrawer = true;
  drawerData.value.isadd = false;
  drawerData.value.title = "编辑用户";
  if (row.id !== undefined) {
    const res = await reqGetUser(row.id);
    formValue.value = res.data;
  }
};
const toDEl = (row: User) => {
  reqDelUser(row.id as number).then(() => {
    getUserList();
  });
};
const confirm = async () => {
  if (drawerData.value.isadd) {
    await reqSaveUser(formValue.value);
    getUserList();
  } else {
    await reqUpdateUser(formValue.value);
    getUserList();
  }
  drawerData.value.isdrawer = false;
  drawRef.value.resetFields();
};
const cancel = async () => {
  //清空表单
  drawRef.value.resetFields();
  drawerData.value.isdrawer = false;
};
const confrim1 = async () => {
  const data = {
    roleIdList: drawerData2.value.checkBoxes.map((ele: any) => ele.id),
    userId: drawerData2.value.userId,
  };
  await reqassignRole(data);
  drawerData2.value.isdrawer = false;
  getUserList();
};
const handler = (val: any) => {
  delList.value = val.map((ele: User) => ele.id);
};
const dels = () => {
  reqDelUsers(delList.value as number[]).then(() => {
    getUserList();
  });
};
onMounted(() => {
  getUserList();
});
watch(
  [
    () => pageData.value.currentPage,
    () => pageData.value.pageSize,
    () => keyword.value,
  ],
  () => {
    getUserList();
  },
);
</script>
<template>
  <el-card style="margin-bottom: 10px">
    <el-form class="top_form">
      <el-form-item label="用户名：">
        <el-input v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <el-button type="primary" @click="add">添加</el-button>
    <el-button type="danger" @click="dels">批量删除</el-button>
    <el-table
      border
      style="margin: 10px 0"
      :data="userList"
      @selection-change="handler"
    >
      <el-table-column
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column type="index" width="50" label="#"></el-table-column>
      <el-table-column label="id" width="50" prop="id"></el-table-column>
      <el-table-column label="用户名字" prop="name"></el-table-column>
      <el-table-column label="用户名称" prop="username"></el-table-column>
      <el-table-column label="用户角色" prop="roleName"></el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
      <el-table-column label="更新时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template #="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="toFenlei(row)"
            icon="User"
            >分类角色</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="toEdit(row)"
            icon="Edit"
            >编辑</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="toDEl(row)"
            icon="Delete"
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
      layout="prev, pager, next, jumper, -> ,total, sizes"
      :total="pageData.total"
    />
  </el-card>
  <el-drawer v-model="drawerData.isdrawer" :title="drawerData.title">
    <template #default>
      <el-form ref="drawRef" :model="formValue">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="formValue.username"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input v-model="formValue.name"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input
            v-model="formValue.password"
            :disabled="!drawerData.isadd"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button type="primary" @click="confirm">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </template>
  </el-drawer>
  <el-drawer v-model="drawerData2.isdrawer" title="分配角色用户">
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input v-model="drawerData2.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色列表">
          <el-checkbox-group v-model="drawerData2.checkBoxes">
            <el-checkbox
              v-for="ele in drawerData2.allcheckboxes"
              :label="ele.roleName"
              :value="ele"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confrim1">确定</el-button>
          <el-button @click="drawerData2.isdrawer = false">取消</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-drawer>
</template>
<style lang="scss" scoped>
.top_form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .asterisk-left {
    margin: 0;
  }
}
.el-card__body {
  padding-bottom: 0;
}
</style>
