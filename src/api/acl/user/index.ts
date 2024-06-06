import request from "@/utils/request";
import type { UserListResponse, User, AssignRole } from "./type";
enum API {
  USERLIST_URL = "/admin/acl/user/",
  SAVEUSER_URL = "/admin/acl/user/save",
  GETUSER_URL = "/admin/acl/user/get/",
  UPDATEUSER_URL = "/admin/acl/user/update",
  GERROLE_URL = "/admin/acl/user/toAssign/",
  ASSIGNRULE_URL = "/admin/acl/user/doAssignRole",
  DELUSER_URL = "/admin/acl/user/remove/",
  DELUSERS_URL = "/admin/acl/user/batchRemove",
}
//用户列表 by page
export const reqUserList = (page: number, limit: number, keywords: string) => {
  return request.get<any, UserListResponse>(
    API.USERLIST_URL + `${page}/${limit}/?username=${keywords}`,
  );
};
//新增用户
export const reqSaveUser = (data: User) => {
  return request.post<any, any>(API.SAVEUSER_URL, data);
};
//获取用户
export const reqGetUser = (id: number) => {
  return request.get<any, any>(API.GETUSER_URL + id);
};
//修改用户
export const reqUpdateUser = (data: User) => {
  return request.put<any, any>(API.UPDATEUSER_URL, data);
};
//获取角色
export const reqGetRole = (id: number) => {
  return request.get<any, any>(API.GERROLE_URL + id);
};
//分配角色
export const reqassignRole = (data: AssignRole) => {
  return request.post<any, any>(API.ASSIGNRULE_URL, data);
};
//删除角色
export const reqDelUser = (id: number) => {
  return request.delete<any, any>(API.DELUSER_URL + id);
};
//批量删除角色
export const reqDelUsers = (ids: number[]) => {
  return request.delete<any, any>(API.DELUSERS_URL, { data: ids });
};
