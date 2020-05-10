import request from "@/utils/request.js";

/**
 * 获取商品类型
 * @param params
 * @returns {AxiosPromise}
 */
export function goodsTypeList(params) {
  return request({
    // closeLoading: true,
    // closeInterceptors: true,
    url: "/goodsType/list", //如果是绝对路径就不会在使用配置里的url
    method: "get",
    params: params //注意：如果是get请求请使用 params: params
  });
}
/*
 * 获取添加商品类型
 * @param params
 * @returns {AxiosPromise}
 */
export function addGoodsType(params) {
  return request({
    // closeLoading: true,
    // closeInterceptors: true,
    url: "/goodsType/add", //如果是绝对路径就不会在使用配置里的url
    method: "post",
    data: params //注意：如果是get请求请使用 params: params
  });
}