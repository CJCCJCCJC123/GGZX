import request from "@/utils/request";
import type { menuList, menuParams } from "./type";

enum API {
  GETPERMISSION_URL = "/admin/acl/permission",
  SAVEPERMISSION_URL = "/admin/acl/permission/save",
  UPDATAEPERMISSION_URL = "/admin/acl/permission/update",
  DEL_URL = "/admin/acl/permission/remove/",
}

export const reqgetPermission = () => {
  return request<any, menuList>(API.GETPERMISSION_URL);
};

export const reqsavepermission = (data: menuParams) => {
  return request.post<any, any>(API.SAVEPERMISSION_URL, data);
};

export const requpdataPermission = (data: menuParams) => {
  return request.put<any, any>(API.UPDATAEPERMISSION_URL, data);
};

export const delpermission = (id: number) => {
  return request.delete<any, any>(API.DEL_URL + id);
};
