'use strict'
import axios from "axios"
import Const from "./const" 
import { AppJsBridge } from "@/assets/js/hybApp_api";
// 创建一个axios的对象
// application/x-www-form-urlencoded;charset=utf-8
const Axios = axios.create({
    baseURL: "",//这里不能使用前缀，因为全局项目不一定会访问一个域名
    method: 'post',
    apiType: '',
    timeout: 10000,
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
        if (config.apiType === '1') {
            config.baseURL = Const.micro_base_url;
        } else 
        if (config.apiType === '2') {
            config.baseURL = Const.GATEWAY_BASE_URL;
        } else {
            config.baseURL = Const.SERVER_URL;
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
        if(res.data.reCode == '4' || res.data.reCode == '-4'){
            // 重新登录来获取token
            AppJsBridge.goLogin(res.data.reInfo);
        }else if(res.data.reCode == '5'){
            // 升级客户端
            AppJsBridge.checkAppVersion("1");
        }else{
            return res.data;
        }
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
    install: function (Vue, Option) {
        //使用Object.defineProperty为Vue绑定属性，且不可被修改
        Object.defineProperty(Vue.prototype, "$http", { value: Axios });
    }
};
