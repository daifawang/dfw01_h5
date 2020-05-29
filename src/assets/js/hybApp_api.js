'use strict'
import Vue from 'vue';
/**
 * 客户端js接口相关
 */
let hybappObj = {};

window.AppJSApi_BackBunderVersion= (json) => {
    // 获取版本号
    try {
        if (typeof hybappObj.AppJSApi_BackBunderVersion === 'function') {
            hybappObj.AppJSApi_BackBunderVersion(json);
        }
        console.log("AppJSApi_BackBunderVersion=" + json);
        localStorage.setItem("AppJSApi_BackBunderVersion", json);
    } catch (error) {
        console.log(JSON.stringify(error));
    }
}

let AppJsBridge = {
    //打开客户端登录页面
    appGotoLogin() {
        try {
            if (typeof (AndroidAppGoodsJs) !== 'undefined') {
				AndroidAppGoodsJs.gotoLogin()
			} else if (typeof (window.webkit) !== 'undefined') {
				window.webkit.messageHandlers.gotoLogin.postMessage("");
			}
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    },
    // 获取当前版本号
    appGetVersion(){
        try {
            if(typeof(AndroidAppGoodsJs)!=='undefined'){
               let appVersion= AndroidAppGoodsJs.getAppVersion()
               return appVersion;
            }else if(typeof(window.webkit) !== 'undefined'){
                window.webkit.messageHandlers.getAppVersion.postMessage("");
            }
        } catch (error) {
            console.log(JSON.stringify(error));
        }
        return "";
        //此处需要回调AppJSApi_BackBunderVersion
    },
    // 跳转底部TAB
    appBackMainTab(menuCode){
        let _json= JSON.stringify({
            'menuCode':menuCode
        });
        try {
            if(typeof(AndroidAppGoodsJs)!=='undefined'){
                AndroidAppCommonJs.backMainTab(_json)
            }else if(typeof(window.webkit) !== 'undefined'){
                window.webkit.messageHandlers.backMainTab.postMessage(_json);    
            }     
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    },
    // 新手引导调试
    guideTask(json_str){
        try {
            if(typeof(AndroidAppGoodsJs) !== 'undefined'){
                AndroidAppGoodsJs.showTaskMask(json_str)
            }else if(typeof(window.webkit) !== 'undefined'){
                window.webkit.messageHandlers.showTaskMask.postMessage(json_str);
            }     
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    },
    // 【JS1011】h5关闭当前窗口
    close(){
        try {
            if(typeof(AndroidAppGoodsJs) !== 'undefined'){
                AndroidAppGoodsJs.finish()
            }else if(typeof(window.webkit) !== 'undefined'){
                window.webkit.messageHandlers.finish.postMessage("");
            }     
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    },
    //  【JS2018】隐藏原生头部
    hidenNavigation(){
        try {
            if(typeof(AndroidAppGoodsJs) !== 'undefined'){
                AndroidAppCommonJs.hidenNavigationView()
            }else if(typeof(window.webkit) !== 'undefined'){
                window.webkit.messageHandlers.hidenNavigationView.postMessage('');
            }     
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    },
    // 【JS2063】H5是否使用客户端下拉刷新控件
    setClientRefresh(type){
        let _json= JSON.stringify({
            'isOpenRefreshView':type
        });
        console.log(_json);
        
        try {
            if(typeof(AndroidAppGoodsJs) !== 'undefined'){
                AndroidAppCommonJs.setWebUseClientRefresh(_json)
            }else if(typeof(window.webkit) !== 'undefined'){
                window.webkit.messageHandlers.setWebUseClientRefresh.postMessage(_json);
            }     
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    },
    // 【JS2053】接口签名
    initSignData(dataJson,sid,callback){
        let signData = "";
        let _data=JSON.stringify(dataJson)
        let _json=JSON.stringify({
            data:_data,
            sid: sid
        })
        console.log(_json);
        try {
            if(typeof(AndroidAppGoodsJs) !== 'undefined'){
                signData=AndroidAppCommonJs.signRequestBody(_json);
                return signData;
            }else if(typeof(window.webkit) !== 'undefined'){
                let decodeJson = "";
                window.webkit.messageHandlers.signRequestBody.postMessage(_json);
                window.AppJSApi_BackSignRequestBody=(signData) => {
                    console.log('AppJSApi_BackSignRequestBody');
                    signData=signData;
                    console.log(signData);
                    console.log(111111);
                    // if( typeof callback === 'function' )
                    return signData; 
                    
                    setTimeout(() => {
                        decodeJson=decodeURI(signData);
                        // console.log(JSON.parse(decodeJson));
                    }, 50);
                } 
            }    
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    },
}
export {
    AppJsBridge,
    hybappObj
}
