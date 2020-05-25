"use strict";

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
  // 关闭h5页面
  Utils.prototype.closeH5 = () => {
    console.info("关闭");
    if (dp.ua.indexOf("kydd_android") > -1) {
      console.info("Android关闭");
      AppFinish.finish("");
    } else if (dp.ua.indexOf("kydd_ios") > -1) {
      console.info("ios关闭");
      window.webkit.messageHandlers.finish.postMessage("");
    }
  };
  // H5获取客户端设备是否支持录屏功能
  Utils.prototype.deviceSreenRecordIsAvailable = json => {
    console.log("H5获取客户端设备是否支持录屏功能deviceSreenRecordIsAvailable");
    if (typeof AndroidAppJsShequ != "undefined") {
      console.log("安卓");
      let dsriaJson = AndroidAppJsShequ.deviceSreenRecordIsAvailable(
        JSON.stringify(json)
      );
      window.AppJSApi_deviceSreenRecordIsAvailableCallBack(dsriaJson);
    } else if (typeof window.webkit != "undefined") {
      console.log("ios");
      window.webkit.messageHandlers.deviceSreenRecordIsAvailable.postMessage(
        JSON.stringify(json)
      );
    }
  };
  // 获取录屏权限 安卓不调用这个接口
  Utils.prototype.applyScreenRecordPermission = json => {
    console.log("获取录屏权限applyScreenRecordPermission");
    if (typeof window.webkit != "undefined") {
      console.log("ios");
      window.webkit.messageHandlers.applyScreenRecordPermission.postMessage(
        JSON.stringify(json)
      );
    }
  };
  // 调用客户端，开始录屏 安卓有个回调，等待安卓回调再进行操作，ios不受影响
  Utils.prototype.startScreenRecord = json => {
    console.log("调用客户端，开始录屏startScreenRecord");
    if (typeof AndroidAppJsShequ != "undefined") {
      console.log("安卓");
      AndroidAppJsShequ.startScreenRecord(JSON.stringify(json));
    }
    if (typeof window.webkit != "undefined") {
      console.log("ios");
      window.webkit.messageHandlers.startScreenRecord.postMessage(
        JSON.stringify(json)
      );
    }
  };
  // 调用客户端，结束录屏
  Utils.prototype.endScreenRecord = json => {
    console.log("调用客户端，结束录屏endScreenRecord");
    if (typeof AndroidAppJsShequ != "undefined") {
      console.log("安卓");
      AndroidAppJsShequ.endScreenRecord(JSON.stringify(json));
    }
    if (typeof window.webkit != "undefined") {
      console.log("ios");
      window.webkit.messageHandlers.endScreenRecord.postMessage(
        JSON.stringify(json)
      );
    }
  };
  // 调用客户端，跳转实名认证
  Utils.prototype.gotoAuthenticate = _type => {
    if (typeof window.webkit != "undefined") {
      window.webkit.messageHandlers.gotoAuthenticate.postMessage(
        JSON.stringify({ type: _type })
      );
    } else if (typeof AndroidAppJsShequ != "undefined") {
      AndroidAppJsShequ.gotoAuthenticate(JSON.stringify({ type: _type }));
    }
  };
  // 【K22】H5操作之后刷新原生首页指定tab
  Utils.prototype.needToRefreshNativePage = json => {
    if (typeof window.webkit != "undefined") {
      window.webkit.messageHandlers.needToRefreshNativePage.postMessage(
        JSON.stringify(json)
      );
    } else if (typeof AppLookPhoto != "undefined") {
      AppLookPhoto.needToRefreshNativePage(JSON.stringify(json));
    }
  };
  // 【K99】标记返回到当前h5页面时，是否要刷新页面
  Utils.prototype.backRefreshFlag = json => {
    console.log("调用客户端返回刷新方法backRefreshFlag");
    if (
      typeof AndroidAppJsShequ !== "undefined" &&
      typeof AndroidAppJsShequ.backRefreshFlag === "function"
    ) {
      AndroidAppJsShequ.backRefreshFlag(JSON.stringify(json));
    } else if (
      typeof window.webkit !== "undefined" &&
      typeof window.webkit.messageHandlers.backRefreshFlag !== "undefined"
    ) {
      window.webkit.messageHandlers.backRefreshFlag.postMessage(
        JSON.stringify(json)
      );
    }
  };
  // 【K90】通知所有webview执行指定的js函数
  Utils.prototype.notifyAllWebExecuteJs = json => {
    console.log("通知所有webview执行指定的js函数notifyAllWebExecuteJs");
    if (typeof AndroidAppJsShequ != "undefined") {
      AndroidAppJsShequ.notifyAllWebExecuteJs(JSON.stringify(json));
    } else if (typeof window.webkit != "undefined") {
      window.webkit.messageHandlers.notifyAllWebExecuteJs.postMessage(
        JSON.stringify(json)
      );
    }
  };

  return new Utils();
})(this);

export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, "$utils", { value: Utils });
    Vue.$utils = Utils;
  }
};
