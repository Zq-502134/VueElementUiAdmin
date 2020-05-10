/*
 * @Author: Zhang Qing
 * @Date: 2020-04-22 14:35:34
 * @LastEditTime: 2020-05-10 22:48:40
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \VueElementUiAdmin\src\api\goodsManage\list.js
 */
import request from "@/utils/request.js";

/**
 * 获取文章
 * @param params
 * @returns {AxiosPromise}
 */
export function goods(params) {
  return request({
    url: "/goods/goodsList", //如果是绝对路径就不会在使用配置里的url
    method: "post",
    data: params //注意：如果是post请求请使用 data: params
  });
}

export function saveGoods(params) {
	console.log("goods的参数"+params);
  return request({
    url: "/goods/saveGoods", //如果是绝对路径就不会在使用配置里的url
    method: "post",
    data: params //注意：如果是post请求请使用 data: params
  });
}

export function getGoods(params) {
  return request({
     url: "/goods/getGoodsByid", //如果是绝对路径就不会在使用配置里的url
    method: "get",
    params: params //注意：如果是post请求请使用 data: params
  });
}

//修改商品状态
export function updateGoodsState(params) {
  return request({
    url: "/goods/updateState", //如果是绝对路径就不会在使用配置里的url
    method: "post",
    data: params //注意：如果是post请求请使用 data: params
  });
}