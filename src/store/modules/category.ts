import { defineStore } from "pinia";
import { ref } from "vue";
import {
  reqCategory1,
  reqCategory2,
  reqCategory3,
  reqAttr,
} from "@/api/product/attr";
import { reqSpuList } from "@/api/product/spu";
import type { SPU } from "@/api/product/spu/type";
import { attrTypeType, dataObj } from "@/api/product/attr/type";
export const useCategoryStore = defineStore("category", () => {
  const category1 = ref<Array<any>>([]);
  const category2 = ref<Array<any>>([]);
  const category3 = ref<Array<any>>([]);
  const id1 = ref<number>(-1);
  const id2 = ref<number>(-1);
  const id3 = ref<number>(-1);
  const attrlist = ref<Array<dataObj>>([]);
  const spulist = ref<Array<SPU>>([]);
  const getCategory1 = async () => {
    const res = await reqCategory1();
    category1.value = res.data;
  };
  const getCategory2 = async (id: number) => {
    const res = await reqCategory2(id);
    category2.value = res.data;
  };
  const getCategory3 = async (id: number) => {
    const res = await reqCategory3(id);
    category3.value = res.data;
  };
  const getAttr = async () => {
    const ids = {
      id1: id1.value,
      id2: id2.value,
      id3: id3.value,
    };
    const res: attrTypeType = await reqAttr(ids);
    attrlist.value = res.data;
  };
  const getSPU = async (data: any) => {
    const res = await reqSpuList(data);
    spulist.value = res.data.records;
    console.log(spulist.value);
  };
  return {
    category1,
    category2,
    category3,
    id1,
    id2,
    id3,
    attrlist,
    spulist,
    getCategory1,
    getCategory2,
    getCategory3,
    getAttr,
    getSPU,
  };
});
