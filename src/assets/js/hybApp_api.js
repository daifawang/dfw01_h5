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
            if(typeof(AndroidAppCommonJs) !== 'undefined'){
                AndroidAppCommonJs.showTaskMask(json_str)
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
    // 【JS2058】H5数据存取---存数据
    storeInfo(key,value){
        let _json = JSON.stringify({
            type: '1',
            key: key, //key：数据的key,命名以KEY结尾 例如：TASK_GUIDE_KEY
            data: value
        })
        console.log(_json);
        try {
            if(typeof(AndroidAppCommonJs)!=='undefined'){
                AndroidAppCommonJs.manageH5Data(_json)
            }else if(typeof(window.webkit) !== 'undefined'){
                window.webkit.messageHandlers.manageH5Data.postMessage(_json);
            }
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    },
    // 【JS2058】H5数据存取---取数据 ---注意需要回调获取数据
    getStoreInfo(key,callback){
        let _json = JSON.stringify({
            type: '2',
            key: key,
            data: ''
        })
        console.log(_json);
        try {
            if(typeof(AndroidAppCommonJs)!=='undefined'){
                AndroidAppCommonJs.manageH5Data(_json)
            }else if(typeof(window.webkit) !== 'undefined'){
                window.webkit.messageHandlers.manageH5Data.postMessage(_json);
            }
            // 回调获取客户端返回的H5存储的数据
            // window['AppJSApi_BackH5Data'] = (json) => {
            //     console.log("AppJSApi_BackH5Data>>",JSON.parse(json));
            //     var _data = JSON.parse(json);
            //     if(_data.key === key && typeof callback === 'function'){
            //         callback(_data);
            //     }
            // }
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    },
    // 【JS2053】接口签名
    initSignData(dataJson,sid,callback){
        let signData = "";
        let param = '';
        let _data=JSON.stringify(dataJson)
        let _json=JSON.stringify({
            data:_data,
            sid: sid
        })
        console.log(_json);
        try {
            if(typeof(AndroidAppGoodsJs) !== 'undefined'){
                signData=AndroidAppCommonJs.signRequestBody(_json);
                console.log(signData);
                param = JSON.parse(decodeURI(signData));
                if( typeof callback === 'function' ){
                    callback(param);
                }
            }else if(typeof(window.webkit) !== 'undefined'){
                window.webkit.messageHandlers.signRequestBody.postMessage(_json);
                window.AppJSApi_BackSignRequestBody=(signData) => {
                    // console.log('AppJSApi_BackSignRequestBody>>'+signData);
                    param = JSON.parse(decodeURI(signData));
                    if( typeof callback === 'function' ){
                        callback(param);
                    }
                } 
            }    
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    },
    // 【JS2060】任务-跳转视频详情页
    taskOpenVideoDetails(jsonStr){
        console.log('【JS2060】任务-跳转视频详情页');
        let _json= JSON.stringify(jsonStr);
        console.log(_json);
        try {
            if(typeof(AndroidAppGoodsJs) != 'undefined'){
                console.log('----进入AndroidAppCommonJs.taskOpenVideoDetails----');
                AndroidAppCommonJs.taskOpenVideoDetails(_json)
            }else if(typeof(window.webkit) !== 'undefined'){
                console.log('----进入window.webkit.messageHandlers.taskOpenVideoDetails.postMessage----');
                window.webkit.messageHandlers.taskOpenVideoDetails.postMessage(_json);  
            }
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    },
    //【JS2043】h5消息页点击视频贴的评论、回复消息，拉起原生的视频详情界面 --- 任务跳转刷一刷视频详情
    goVideoTopicDetail(tid){
        console.log('【JS2043】h5消息页点击视频贴的评论、回复消息，拉起原生的视频详情界面');
        let _json= JSON.stringify({
            'topicsId':tid,
            // 'commentId':"",
            // 'replyId':""
        });
        console.log(_json);
        try {
            if(typeof(AndroidAppGoodsJs) != 'undefined'){
                console.log('--Android--进入goVideoTopicDetail--任务跳转刷一刷视频详情--');
                AndroidAppCommonJs.goVideoTopicDetail(_json)
            }else if(typeof(window.webkit) !== 'undefined'){
                console.log('--ios--进入goVideoTopicDetail--任务跳转刷一刷视频详情--');
                window.webkit.messageHandlers.goVideoTopicDetail.postMessage(_json);  
            }
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    },
    // 【JS2056】弹出登录界面
    goLogin(info){
        // info用服务器返回的
        console.log('【JS2056】弹出登录界面');
        let _json= JSON.stringify({ "reInfo":info});
        console.log(_json);
        try {
            if(typeof(AndroidAppGoodsJs) != 'undefined'){
                AndroidAppCommonJs.goLogin(json)(_json)
            }else if(typeof(window.webkit) !== 'undefined'){
                window.webkit.messageHandlers.goLogin.postMessage(_json);  
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
