import request from "@/utils/request";
import type {
  category1Type,
  category2Type,
  category3Type,
  attrTypeType,
  updateType,
} from "./type";
enum API {
  C1_URL = "/admin/product/getCategory1",
  C2_URL = "/admin/product/getCategory2/",
  C3_URL = "/admin/product/getCategory3/",
  ATTR_URL = "/admin/product/attrInfoList/",
  SAVEORUPDATENEW_URL = "/admin/product/saveAttrInfo",
  DELETE_URL = "/admin/product/deleteAttr/",
}

export const reqCategory1 = () => {
  return request.get<any, category1Type>(API.C1_URL);
};

export const reqCategory2 = (category1Id: number) => {
  return request.get<any, category2Type>(API.C2_URL + category1Id);
};

export const reqCategory3 = (category2Id: number) => {
  return request.get<any, category3Type>(API.C3_URL + category2Id);
};

export const reqAttr = (ids: any) => {
  const { id1, id2, id3 } = ids;
  console.log(id1, id2, id3);
  console.log(API.ATTR_URL + id1 + "/" + id2 + "/" + id3);
  return request.get<any, attrTypeType>(
    API.ATTR_URL + id1 + "/" + id2 + "/" + id3,
  );
};

export const requpdateoraddAttr = (data: updateType) => {
  return request.post<any, any>(API.SAVEORUPDATENEW_URL, data);
};

export const reqDeleteAttr = (id: number) => {
  return request.delete<any, any>(API.DELETE_URL + id);
};
