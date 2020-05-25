'use strict'
import axios from "axios"
import Const from "./const" 
// 创建一个axios的对象
// application/x-www-form-urlencoded;charset=utf-8
const Axios = axios.create({
    baseURL: "",//这里不能使用前缀，因为全局项目不一定会访问一个域名
    method: 'post',
    timeout: 15000,
    responseType: "json",
    withCredentials: true, // 是否允许带cookie这些
    headers: {
        "Content-Type": "text/plain"
    }
});
//添加请求拦截器,在请求或响应被 then 或 catch 处理前拦截它们。
Axios.interceptors.request.use(
    config => {
        // 在发送请求之前做某件事
        //1.判断是否需要添加默认域名
        if(config.url.indexOf("http://") >-1|| config.url.indexOf("https://")>-1){
            config.baseURL = ""
        }else{
            //添加默认域名
            config.baseURL = Const.spa_base_http
        }
        return config;
    },
    error => {
      // 对请求错误做些什么,可以抓取错误日志
      console.log();
      return Promise.reject(error.data.error.message);
    }
);
//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
    res => {
        //对响应数据做些事
        return res.data;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);
/***行为日志记录***/
// Axios.ruleLogIfs = (key) => {
//     Axios({
//         url:'/rule/html/get/v1/rulelog?t='+new Date().getTime(),
//         data:{
//           data:{
//             action_id:key
//           }
//         }
//     })
//     .then((response) => {
//        console.log("行为数据返回结果"+key+":"+JSON.stringify(response));
//     })
//     .catch(function (error) {
//         console.log("行为数据异常:"+error);
//     });
// }

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
    install: function (Vue, Option) {
        //使用Object.defineProperty为Vue绑定属性，且不可被修改
        Object.defineProperty(Vue.prototype, "$http", { value: Axios });
        Vue.$http = Axios;
    }
};
