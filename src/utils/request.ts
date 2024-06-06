import axios from "axios";
import { useUserStore } from "@/store/modules/user";
import { ElMessage } from "element-plus";
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});

// 添加请求拦截器
request.interceptors.request.use((config) => {
  const userStore = useUserStore();
  config.headers.token = userStore.Token;
  return config;
});
// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let message = "未知错误";
    let status = error.response.status;
    switch (status) {
      case 400:
        message = "请求错误";
        break;
      case 401:
        message = "未授权，请登录";
        break;
      case 403:
        message = "拒绝访问";
        break;
      case 404:
        message = `请求地址出错: ${error.response.config.url}`;
        break;
      case 408:
        message = "请求超时";
        break;
      case 500:
        message = "服务器嗝屁";
        break;
      case 501:
        message = "服务未实现";
        break;
      case 502:
        message = "网关错误";
        break;
      case 503:
        message = "服务不可用";
        break;
      case 504:
        message = "网关超时";
        break;
      case 505:
        message = "HTTP版本不受支持";
        break;
      default:
        break;
    }
    ElMessage.error(message);
    return Promise.reject(error);
  },
);
export default request;
