import request from "@/utils/request";
import type { reqTrademarkListForm, resTrademarkListForm } from "./type";
//获取品牌列表（分页）
export const reqTrademarkList = (data: reqTrademarkListForm) => {
  const { page, limit } = data;
  return request.get<any, resTrademarkListForm>(
    `/admin/product/baseTrademark/${page}/${limit}`,
  );
};

//编辑和上传新品牌
export const addOrUpdatereqTrademark = (data: any) => {
  if (data.id) {
    return request.put(`/admin/product/baseTrademark/updata`, data);
  } else {
    return request.post(`/admin/product/baseTrademark/save`, data);
  }
};

//删除品牌
export const delTrademark = (id: string) => {
  return request.delete(`/admin/product/baseTrademark/remove/${id}`);
};
