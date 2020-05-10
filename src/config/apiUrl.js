/*
 * @Author: Zhang Qing
 * @Date: 2020-04-20 17:17:51
 * @LastEditTime: 2020-05-10 22:45:08
 * @LastEditors: your name
 * @Description: 各种环境
 * @FilePath: \VueElementUiAdmin\src\config\apiUrl.js
 */
const devApiUrl = "http://192.168.49.97:8088"; //本地开发环境
const buildDevApiUrl = "http://192.168.48.192:9088"; //打包开发环境
const buildTestApiUrl = "http://192.168.48.192:9188"; //打包测试环境
const buildProApiUrl = "https://api.xxx.cn"; //打包正式环境
const serverApiUrl="http://localhost:8080/OnlineShop_Web_exploded/";//请求后端服务器路径

let useApiUrl;

if (process.env.NODE_ENV === "development") {
  useApiUrl = devApiUrl;
} else {
  //production
  switch (process.env.VUE_APP_MODE) {
    case "buildDev":
      useApiUrl = buildDevApiUrl;
      break;
    case "buildTest":
      useApiUrl = buildTestApiUrl;
      break;
    default:
      useApiUrl = buildProApiUrl;
      break;
  }
}

export { useApiUrl,serverApiUrl }; //可以导出更多需要不同环境区分的url
