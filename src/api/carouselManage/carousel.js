/*
 * @Author: Zhang Qing
 * @Date: 2020-04-29 14:11:49
 * @LastEditTime: 2020-05-10 22:54:55
 * @LastEditors: your name
 * @Description: 轮播图相关配置
 * @FilePath: \VueElementUiAdmin\src\api\carouselManage\carousel.js
 */
import request from "@/utils/request.js";

/**
 * 获取文章
 * @param params
 * @returns {AxiosPromise}
 */
export function carouselList(params) {
  return request({
    url: "/carousel/getList", //如果是绝对路径就不会在使用配置里的url
    method: "get",
    params: params //注意：如果是post请求请使用 data: params
  });
}

