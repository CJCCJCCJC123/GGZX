//商品管理列表数据请求参数类型
export interface reqTrademarkListForm {
  page: number;
  limit: number;
}
//返回数据类型
interface resForm {
  code: number;
  message: string;
  ok: boolean;
}
//已有品牌的数据类型
interface tradeMark {
  id?: number;
  logoUrl: string;
  tmName: string;
}
//商品管理列表数据返回类型
export interface resTrademarkListForm extends resForm {
  data: {
    records: tradeMark[];
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}
