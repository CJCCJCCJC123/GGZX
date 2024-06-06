//基础返回数据类型
interface baseResData {
  code: number;
  data: any;
  message: string;
}
//角色数据类型
export interface RoleData {
  id?: number;
  roleName: string;
  remark?: string;
  createTime?: string;
  updateTime?: string;
}
//角色列表数据类型
export interface RoleDataList {
  records: RoleData[];
  total: number;
  size: number;
  current: number;
  orders: any[];
  optimizeCountSql: boolean;
  hitCount: boolean;
  countId: null;
  maxLimit: null;
  searchCount: boolean;
  pages: number;
}
//角色列表请求参数数据类型
export interface RoleReqData extends baseResData {
  data: RoleDataList;
}
//菜单与按钮数据的ts类型
export interface MenuData {
  id: number;
  createTime: string;
  updateTime: string;
  pid: string;
  name: string;
  code: string;
  toCode: string;
  type: number;
  status: null;
  level: number;
  children?: MenuList;
  select: boolean;
}
export type MenuList = MenuData[];

//菜单权限与按钮权限数据的ts类型
export interface MenuResponseData extends baseResData {
  data: MenuData[];
}
