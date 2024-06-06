//基础返回数据类型
interface resType {
  code: number;
  message: string;
  ok: boolean;
}
//SPU数据类型
export interface SPU {
  id?: number;
  spuName: string;
  description: string;
  tmId: number | string;
  category3id: string | number;
  spuImageList: null | spuImage[];
  spuSaleAttrList: null | saleAttrData[];
}
type records = SPU[];
//定义SPU返回数据类型
export interface resSpuType extends resType {
  data: {
    records: records;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}
//定义请求商品列表返回数据类型
export interface trademark {
  id: number;
  tmName: string;
  logoUrl: string;
}
export interface resTrademarkType extends resType {
  data: trademark[];
}
//定义请求商品图片返回数据类型
export interface spuImage {
  id?: number;
  spuId?: number;
  imgName: string;
  imgUrl: string;
}
export interface resImgType extends resType {
  data: spuImage[];
}
//定义请求商品销售属性返回数据类型
interface spuSaleAttrval {
  id?: number;
  spuId?: number;
  baseSaleAttrId: number;
  saleAttrName: string;
  saleAttrValues?: string;
  isChecked?: boolean;
}
export interface resSaleAttrType extends resType {
  data: {
    id?: number;
    spuId?: number;
    baseSaleAttrId: number;
    saleAttrName: string;
    supSaleAttrValueList: spuSaleAttrval[];
  };
}
//全部销售属性返回数据类型
interface saleAttr {
  id: number;
  name: string;
}
type saleAttrData = saleAttr[];
export interface resTotalSaleAttrType extends resType {
  data: saleAttrData;
}
//SKU
export interface SKU {
  category3Id: number | string;
  spuId: number | undefined;
  tmId: number | undefined | string;
  skuName: string | undefined;
  price: number | undefined;
  weight: number | undefined;
  skuDesc: string | undefined;
  skuAttrValueList: [
    {
      attrId: number;
      valueId: number;
    },
  ];
  skuSaleAttrValueList: [
    {
      saleAttrId: number;
      saleAttrValueId: number;
    },
  ];
  skuDefaultImg: string;
}
