//登录数据类型
export interface loginForm {
  username: string;
  password: string;
}
//定于全部接口都拥有的ts类型
export interface responseData {
  code: number;
  message: string;
  ok: boolean;
}
//定于登录返回数据类型
export interface loginResponseData extends responseData {
  data: any;
}
//获取用户信息返回数据类型
export interface userInfoResponseData extends responseData {
  data: {
    routes: string[];
    buttons: string[];
    roles: string[];
    name: string;
    avatar: string;
  };
}

export interface InfoForm {
  userId: number;
  avatar: string;
  username: string;
  password: string;
  desc: string;
  roles: string[];
  buttons: string[];
  routes: string[];
  token: string;
}
