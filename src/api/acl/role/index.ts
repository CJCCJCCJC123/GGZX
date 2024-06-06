import request from "@/utils/request";
import type { RoleReqData, RoleData, MenuResponseData } from "./type";

enum API {
  GETRULE_URL = "/admin/acl/role/",
  SAVERULE_URL = "/admin/acl/role/save",
  UPDATEUSER_URL = "/admin/acl/role/update",
  ALLPERMISSTION_URL = "/admin/acl/permission/toAssign/",
  TOASSIGN_URL = "/admin/acl/permission/doAssign",
  DELETEROLE_URL = "/admin/acl/role/remove/",
}

export const reqGetRule = (page: number, limit: number, roleName: string) => {
  return request.get<any, RoleReqData>(
    API.GETRULE_URL + page + "/" + limit + "/?roleName=" + roleName,
  );
};
export const reqSaveOrUpdateRule = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data);
  } else {
    return request.post<any, any>(API.SAVERULE_URL, data);
  }
};
export const retAllPermission = (roleId: number) => {
  return request.get<any, MenuResponseData>(API.ALLPERMISSTION_URL + roleId);
};
export const reqAssgin = (roleId: number, permissionId: number[]) => {
  console.log(roleId, permissionId);
  return request.post<any, any>(
    API.TOASSIGN_URL + `/?roleId=${roleId}&permissionId=${permissionId}`,
  );
};
export const redDelRole = (roleId: number) => {
  return request.delete<any, any>(API.DELETEROLE_URL + roleId);
};
