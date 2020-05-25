import Vue from "vue";
import axios from "axios";
import { SERVER_URL } from "./consts";
// import router from "../../router";

const instance = axios.create();

instance.defaults.baseURL = SERVER_URL;
instance.defaults.timeout = 30000;
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// http请求拦截器
instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// http响应拦截器
instance.interceptors.response.use(
  res => {
    // const reCode = res.data.reCode;
    // const reInfo = res.data.reInfo;
    return res;
  },
  error => {
    console.log(error);
    if (error.config.toastShow !== 0) {
      const { response } = error;
      if (response) {
        Vue.prototype.$toast("网络请求失败，请稍后重试");
      } else {
        if (error.code === "ECONNABORTED") {
          Vue.prototype.$toast("网络请求超时，请检查网络");
        } else {
          Vue.prototype.$toast("网络连接失败，请检查手机网络");
        }
      }
    }
    console.log(error.message);
    return Promise.reject(error);
  }
);

export default {
  install(Vue) {
    Vue.prototype.$http = instance;
    Vue.http = instance;
  },
  $http: instance
};

export const http = instance;
