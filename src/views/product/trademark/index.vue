<script setup>
import { ref, onMounted, nextTick } from "vue";
import {
  reqTrademarkList,
  addOrUpdatereqTrademark,
  delTrademark,
} from "@/api/product/trademark";
import { Edit, Loading } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
const paramasData = ref({
  page: 1,
  limit: 3,
  total: 100,
});
const loading = ref(false);
const trademarkList = ref([]);
const getTrademarkList = async () => {
  loading.value = true;
  const res = await reqTrademarkList(paramasData.value);
  trademarkList.value = res.data.records;
  paramasData.value.total = res.data.total;
  loading.value = false;
};
const changesize = () => {
  paramasData.value.page = 1;
  getTrademarkList();
};
const dialogTableVisible = ref(false);
const trademarkId = ref("");
const dialogData = ref({
  title: "",
  name: "",
  imageUrl: "",
});
const imageUrl = ref(false);
//上传图片
const beforeAvatarUpload = (file) => {
  if (file.type !== "image/jpeg") {
    ElMessage.error("上传图片只能是jpg格式!");
    return;
  } else if (file.size / 1024 > 30) {
    ElMessage.error("上传图片大小不能超过30KB!");
    return;
  }
};
const handleAvatarSuccess = (res, file) => {
  dialogData.value.imageUrl = res.data;
  ElMessage.success("上传成功");
  refForm.value.clearValidate("imageUrl");
};

const cancel = () => {
  dialogTableVisible.value = false;
};
const confirm = async () => {
  await refForm.value.validate();
  const paramsdata = {
    logoUrl: dialogData.value.imageUrl,
    tmName: dialogData.value.name,
  };
  if (trademarkId.value) {
    paramsdata.id = trademarkId.value;
  }
  const res = await addOrUpdatereqTrademark(paramsdata);
  if (paramsdata.id) {
    ElMessage.success("编辑成功");
  } else {
    ElMessage.success("添加成功");
  }
  dialogTableVisible.value = false;
  getTrademarkList();
};
const addTrademark = () => {
  dialogTableVisible.value = true;
  dialogData.value.title = "添加品牌";
  trademarkId.value = "";
  dialogData.value.name = "";
  dialogData.value.imageUrl = "";
  nextTick(() => {
    refForm.value.clearValidate();
  });
};
const editTrademark = (row) => {
  trademarkId.value = row.id;
  dialogTableVisible.value = true;
  dialogData.value.name = row.tmName;
  dialogData.value.imageUrl = row.logoUrl;
  dialogData.value.title = "编辑品牌";
  nextTick(() => {
    refForm.value.clearValidate();
  });
};

//添加校验
const refForm = ref(null);
const rules = {
  name: [
    { required: true, message: "请输入品牌名称", trigger: "blur" },
    { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" },
  ],
  imageUrl: [{ required: true, message: "请上传品牌LOGO", trigger: "click" }],
};
//删除
const del = async (row) => {
  const res = await delTrademark(row.id);
  if (
    paramasData.value.page ===
      paramasData.value.total / paramasData.value.limit &&
    paramasData.value.total % paramasData.value.limit === 0
  ) {
    paramasData.value.page--;
  }
  getTrademarkList();
};
onMounted(() => {
  getTrademarkList();
});
</script>
<template>
  <el-card>
    <template #default>
      <el-button icon="Plus" type="primary" @click="addTrademark"
        >添加品牌</el-button
      >
      <el-table border :data="trademarkList" v-loading="loading">
        <el-table-column
          label="序号"
          width="100px"
          align="center"
          prop="id"
        ></el-table-column>
        <el-table-column label="品牌LOGO" prop="tmName"></el-table-column>
        <el-table-column label="品牌管理">
          <template #="{ row }">
            <img :src="row.logoUrl" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="editTrademark(row)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" @click="del(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="paramasData.page"
        v-model:page-size="paramasData.limit"
        :page-sizes="[2, 3, 4, 5]"
        layout=" pager, prev, jumper, next, ->, sizes, total"
        :total="paramasData.total"
        @size-change="changesize"
        @current-change="getTrademarkList"
      />
      <el-dialog
        v-model="dialogTableVisible"
        :title="dialogData.title"
        width="700"
      >
        <el-form
          label-width="80px"
          style="width: 600px"
          :rules="rules"
          :model="dialogData"
          ref="refForm"
        >
          <el-form-item label="品牌名称" prop="name">
            <el-input v-model="dialogData.name"></el-input>
          </el-form-item>
          <el-form-item label="品牌LOGO" prop="imageUrl">
            <el-upload
              class="avatar-uploader"
              action="/api/admin/product/fileUpload"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              v-model="dialogData.imageUrl"
            >
              <img
                v-if="dialogData.imageUrl"
                :src="dialogData.imageUrl"
                class="avatar"
              />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button type="danger" @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </template>
      </el-dialog>
    </template>
  </el-card>
</template>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-card__body {
  .el-table {
    margin: 20px 0;
  }
  img {
    width: 100px;
    height: 100px;
  }
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
