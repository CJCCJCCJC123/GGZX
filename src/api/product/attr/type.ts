//定义商品分类返回数据基础类型
interface categoryType {
  code: number;
  message: string;
  ok: boolean;
}
//定义商品一级分类返回数据类型
export interface category1Type extends categoryType {
  data: [];
}
//定义商品二级分类返回数据类型
interface goodtype2 {
  id: number;
  name: string;
  createTime: string;
  updateTime: string;
  category1Id: number;
}
export interface category2Type extends categoryType {
  data: goodtype2[];
}
//定义商品三级分类返回数据类型
interface goodtype3 {
  id: number;
  name: string;
  createTime: string;
  updateTime: string;
  category2Id: number;
}
export interface category3Type extends categoryType {
  data: goodtype3[];
}
//定义商品属性返回数据类型
interface attrType {
  id: number;
  createTime: string;
  updateTime: string;
  valueName: string;
  attrId: number;
}
export interface dataObj {
  id: number;
  createTime: string;
  updateTime: string;
  attrName: string;
  categoryId: number;
  categoryLevel: number;
  attrValueList: attrType[];
}
export interface attrTypeType extends categoryType {
  data: dataObj[];
}
//定义更新请求数据类型
interface attrValueListType {
  id?: number;
  valueName: string;
  attrId?: number;
  isLook?: boolean;
}
export interface updateType {
  id?: number;
  attrName: string;
  attrValueList: attrValueListType[];
  categoryId: number | string;
  categoryLevel: number;
}
