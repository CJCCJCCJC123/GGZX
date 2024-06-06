import request from "@/utils/request";
import type {
  resSpuType,
  resTrademarkType,
  resImgType,
  resSaleAttrType,
  resTotalSaleAttrType,
  SKU,
} from "./type";
enum API {
  GETSPULIST = "/admin/product/",
  TRADEMARK_URL = "/admin/product/baseTrademark/getTrademarkList",
  IMG_URL = "/admin/product/spuImageList/",
  SALEATTR_URL = "/admin/product/spuSaleAttrList/",
  TOTALSALEATTR_URL = "/admin/product/baseSaleAttrList",
  ADDSPU_URL = "/admin/product/saveSpuInfo",
  UPDATASPU_URL = "/admin/product/updateSpuInfo",
  ADDSKU_URL = "/admin/product/saveSkuInfo",
  GETSKU_URL = "/admin/product/findBySpuId/",
  DELSKU_URL = "/admin/product/deleteSpu/",
}

export const reqSpuList = (data: any) => {
  const { page, limit, category3Id } = data;
  return request.get<any, resSpuType>(
    API.GETSPULIST + `${page}/${limit}?category3Id=${category3Id}`,
  );
};
export const reqTrademarkList = () => {
  return request.get<any, resTrademarkType>(API.TRADEMARK_URL);
};
export const reqimgList = (id: number | undefined) => {
  return request.get<any, resImgType>(API.IMG_URL + id);
};
export const reqSaleAttrList = (id: number | undefined) => {
  return request.get<any, resSaleAttrType>(API.SALEATTR_URL + id);
};
export const reqTotalSaleAttrList = () => {
  return request.get<any, resTotalSaleAttrType>(API.TOTALSALEATTR_URL);
};
export const reqAddSpu = (data: any) => {
  if (data.id) {
    return request.post<any, any>(API.UPDATASPU_URL, data);
  } else {
    return request.post<any, any>(API.ADDSPU_URL, data);
  }
};
export const reqAddSku = (data: SKU) => {
  console.log(data);
  return request.post<any, any>(API.ADDSKU_URL, data);
};
export const reqskulist = (id: number | undefined) => {
  return request.get<any, any>(API.GETSKU_URL + id);
};
export const reqDelSku = (id: number | undefined) => {
  return request.delete<any, any>(API.DELSKU_URL + id);
};
