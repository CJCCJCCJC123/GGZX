//基础返回类型
interface BaseResponse {
  code: number;
  message: string;
  ok: boolean;
}
//单个用户
export interface User {
  id?: number;
  createTime?: string;
  updateTime?: string;
  username: string;
  password: string;
  name: string;
  phone?: null;
  roleName?: string;
}
//多个用户
export type Users = User[];
//获取用户列表返回数据类型
export interface UserListResponse extends BaseResponse {
  data: {
    records: Users;
    total: number;
    size: number;
    current: number;
    pages: number;
  };
}
//分配用户角色参数类型
export interface AssignRole {
  roleIdList: number[];
  userId: number;
}
