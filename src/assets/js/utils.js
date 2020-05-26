"use strict";

// 正则
const REG_MOBILE_PATTERN = /^(1[38][0-9]|15[0-35-9]|14[5-9]|17[0-8]|166|19[8-9])[0-9]{8}$/
const NUMBER_AMOUNT = /^(\d{1,10}|\d{1,10}\.|\d{1,10}\.\d{1,4})$/;
let Utils = (function() {
  let dp = { ua: navigator.userAgent.toLowerCase() };

  function Utils() {}
  // 卡友app andrid客户端
  Utils.prototype.isKyAppAndroid = () => {
    return dp.ua.indexOf("kydd_android") > -1;
  };
  // 卡友app ios客户端
  Utils.prototype.isKyAppIos = () => {
    return dp.ua.indexOf("kydd_ios") > -1;
  };
  //好运宝司机app andrid客户端
  Utils.prototype.isHybAppAndroid = () => {
    return dp.ua.indexOf("goodsdriver_android") > -1;
  };
  //好运宝司机app ios客户端
  Utils.prototype.isHybAppIos = () => {
    return dp.ua.indexOf("goodsdriver_ios") > -1;
  };
  // 微信客户端
  Utils.prototype.isWeixin = () => {
    return dp.ua.indexOf("micromessenger") > -1;
  };
  //处理错误用户头像地址
  Utils.prototype.filterHeadImg = imgurl => {
    let _img = imgurl || "";
    if (_img.indexOf("http://") === -1 && _img.indexOf("https://") === -1) {
      return "//imgt.log56.com/sq_server/img/v129/images/def_head.png";
    }
    return imgurl;
  };
  // ios版本
  Utils.prototype.getIosVer = () => {
    let ver = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    if (ver && ver.length >= 2) {
      ver = parseInt(ver[1], 10);
    }
    return ver;
  };
  Utils.prototype.isChinese = str => {
    var reg = /^[\u4E00-\u9FA5]+$/;
    if (!reg.test(str)) {
      console.log("不是中文");
      return false;
    } else {
      console.log("中文");
      return true;
    }
  };
  //截取当前URL访问字符串，返回一个数组，通过url变量名获取对应的值，如果只不存在则返回null
  Utils.prototype.urlSearch = () => {
    let url = location.search;
    let qs = url ? url.split("?")[1] : (url.length > 0 ? url.substring(1) : "");
    let args = {};
    let items = qs.length > 0 ? qs.split("&") : [];
    let item = "";
    let name = "";
    let value = "";
    let len = items.length;
    for (var i = 0; i < len; i++) {
        item = items[i].indexOf("=");
        if (item === -1) { continue; }
        name = items[i].substring(0, item);
        if (this.isNotEmpty(name)) { continue; }
        // value = items[i].substring(item+1,items[i].length);
        value = this.isNotEmpty(value = items[i].substring(item + 1, items[i].length)) ? value : null;
        args[name] = value;
    }
    return args;
  }
  //判断密码是否是6位连续重复数字
  Utils.prototype.checkPwd = (num) => {
      let check = /(\d)\1{5}/;
      return check.test(num);
  }
  //判断字符串是否为空
  Utils.prototype.isNotEmpty = (str) => {
      return !(typeof str === 'undefined' || str === null || str.length === 0)
  }
  //判断字符串是否为空
  Utils.prototype.isEmpty = (str) => {
      return (typeof str === 'undefined' || str === null || str.length === 0 || str === "")
  }
  // 身份证校验
  Utils.prototype.checkIdCard = (num) => {
      let check = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/g;
      return check.test(num);
  }
  //手机号验证
  Utils.prototype.isMobileNo = (mob) => {
      return REG_MOBILE_PATTERN.test(mob)
  }
  //手机号验证
  Utils.prototype.isAmount = (num) => {
      return NUMBER_AMOUNT.test(num);
  }
  // 验证是否为数字
  Utils.prototype.isNumber = (val) => {
      let regPos = /^\d+(\.\d+)?$/; //非负浮点数
      return regPos.test(val);
  }
  // 设置cookie
  Utils.prototype.setCookie = (name, value, day) => {
      if (day !== 0) { //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
          let curDate = new Date();
          let curTamp = curDate.getTime();
          let curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;
          let passedTamp = curTamp - curWeeHours;
          let leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
          let leftTime = new Date();
          leftTime.setTime(leftTamp + curTamp);
          document.cookie = name + "=" + escape(value) + ";expires=" + leftTime.toGMTString();
      } else {
          document.cookie = name + "=" + escape(value);
      }
  }
  // 获取cookie
  Utils.prototype.getCookie = (name) => {
      let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      let arr = document.cookie.match(reg);
      if(arr != null && arr !== ""){
          return unescape(arr[2]);
      }else {
          return ""; 
      }
  }
  // 验证cookie
  Utils.prototype.checkCookie = (name) => {
      return new Utils().getCookie(name)!=="";
  }
  // 删除cookie
  Utils.prototype.removeCookie = (name) => {
      new Utils().setCookie(name, "", -1);
  }
  // 判断版本号
  Utils.prototype.Version = (curV, reqV) => {
      var arr1 = curV.toString().split('.');
      if (arr1.length === 4) {
          reqV = reqV + '.0'
      }
      var arr2 = reqV.toString().split('.');
      //将两个版本号拆成数字
      var minL = Math.min(arr1.length, arr2.length);
      var pos = 0; //当前比较位
      var diff = 0; //当前为位比较是否相等
      var flag = false;
      //逐个比较如果当前位相等则继续比较下一位
      while(pos < minL) {
          diff = parseInt(arr1[pos]) - parseInt(arr2[pos]);
          if(diff === 0 || diff === '0') {
              pos++;
              continue;
          } else if(diff > 0) {
              flag = true;
              break;
          } else {
              flag = false;
              break;
          }
      }
      return flag;
  }
  // 获取地址栏参数
  Utils.prototype.GetQueryString = (name) => {
    var search_str = window.location.href;
    var search_str_ind = search_str.indexOf("?");
    if (search_str_ind === -1) {
      return null;
    }
    search_str = search_str.substr(search_str_ind);
    var str_length = search_str.split('?').length;
    if (str_length > 2) {
      //剔除地址中有两个？的情况（微信中仿缓存会多出一个问号）
      search_str = "?" + search_str.split('?')[2];
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = search_str.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    } else {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = search_str.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
  }
  return new Utils();
})(this);

export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, "$utils", { value: Utils });
    Vue.$utils = Utils;
  }
};
