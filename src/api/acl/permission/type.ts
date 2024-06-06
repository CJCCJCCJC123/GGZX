//基础返回数据类型
export interface base {
  code: number;
  message: string;
  ok: boolean;
}
//菜单类型
export interface menu {
  id?: number;
  createTime?: string;
  updateTime?: string;
  pid: number;
  name: string;
  code: null;
  toCode: null;
  type: number;
  status: null;
  level: number;
  children?: menu[];
}
//请求菜单返回数据类型
export interface menuList extends base {
  data: menu[];
}
//请求菜单参数数据类型
export interface menuParams {
  id?: number;
  code: string;
  name: string;
  pid: number;
  level: number;
}
