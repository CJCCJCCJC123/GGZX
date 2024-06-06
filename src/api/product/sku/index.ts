import request from "@/utils/request.ts";

enum API {
  SKULIST_URL = "/admin/product/list/",
  DELSKU_URL = "/admin/product/deleteSku/",
  SALESKU_URL = "/admin/product/onSale/",
  OFFSKU_URL = "/admin/product/cancelSale/",
  GETSKU_URL = "/admin/product/getSkuInfo/",
}

export const getskulist = (page: number, limit: number) => {
  return request.get<any, any>(API.SKULIST_URL + page + "/" + limit);
};

export const reqdelsku = (id: number) => {
  return request.delete<any, any>(API.DELSKU_URL + id);
};
export const reqSalesku = (id: number) => {
  return request.get<any, any>(API.SALESKU_URL + id);
};
export const reqOffsku = (id: number) => {
  return request.get<any, any>(API.OFFSKU_URL + id);
};
export const reqGetsku = (id: number) => {
  return request.get<any, any>(API.GETSKU_URL + id);
};
