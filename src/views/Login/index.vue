<script setup>
import { Lock, User } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useUserStore } from "@/store/modules/user";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { nowtime } from "@/utils/time";
const $router = useRouter();
const $route = useRoute();
const isLoading = ref(false);
const formValue = ref({
  username: "admin",
  password: "111111",
});
const userStore = useUserStore();
const login = async () => {
  await formRef.value.validate();
  isLoading.value = true;
  try {
    await userStore.userLogin(formValue.value);
    if ($route.query.redirect) {
      $router.push({ path: $route.query.redirect });
    } else {
      $router.push("/");
    }

    ElNotification({
      title: "登录成功",
      message: nowtime().time + "，欢迎回来",
      type: "success",
    });
    isLoading.value = false;
    userStore.getUserInfo();
  } catch (error) {
    isLoading.value = false;
    Promise.reject(error);
  }
};

//表单校验
const formRef = ref(null);
const rules = ref({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 5, message: "长度不小于5个字符", trigger: "blur" },
    //必须为纯英文
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "长度不小于6个字符", trigger: "blur" },
  ],
});
</script>
<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24" class="el_col_right">
        <el-form
          class="login_form"
          :rules="rules"
          :model="formValue"
          ref="formRef"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input
              v-model="formValue.username"
              size="large"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="formValue.password"
              size="large"
              :prefix-icon="Lock"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="large"
              style="width: 100%"
              @click="login"
              :loading="isLoading"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;
  .el_col_right {
    height: 100vh;
    position: relative;
    .login_form {
      background: url("@/assets/images/login_form.png");
      width: 70%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      padding: 30px;
      padding-bottom: 15px;
      h1 {
        font-size: 50px;
        color: #fff;
      }
      h2 {
        font-size: 30px;
        color: #fff;
        margin: 20px 0;
      }
    }
  }
}
</style>
