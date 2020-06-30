<template>
    <div></div>
</template>
<script>
import Const from "@/assets/js/const" 
import { AppJsBridge, hybappObj } from "@/assets/js/hybApp_api.js";
export default {
    data() {
        return {
            redirect:''
        }
    },
    created() {
        this.$toast.loading({
            message: "加载中...",
            forbidClick: true
        });
        this.redirect=this.$utils.GetQueryString("redirect");
        console.log(this.redirect);
        if(this.redirect){
            this.initData({"redirect":this.redirect});
        }else{
            this.initData({});
            this.clickLog();
        }
        document.title="元宝商城";
    },
    methods: {
        // 初始化数据
        initData(dataJson) {
            AppJsBridge.initSignData(dataJson, 954009, param => {
                this.$http({
                    apiType: "2",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    url: "/gateway.do",
                    data: param
                })
                    .then(res => {
                        console.log(res);
                        if (res.reCode == "0") {
                            window.location.replace(res.result);
                        } else {
                            this.$toast(res.reInfo);
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            });
        },
        // 日志
        clickLog(){
            let type = this.$utils.GetQueryString("fromType");
            console.log('元宝商城日志fromType为：'+fromType);
            console.log('isHybAppAndroid:'+this.$utils.isHybAppAndroid());
            let clientType = this.$utils.isHybAppAndroid() ? '0' : this.$utils.isHybAppIos() ? '1': '未知'; //0 安卓  1 IOS
            console.log('客户端类型(0-安卓,1-IOS)为：'+clientType);
            AppJsBridge.initSignData(
                { type: '-2', clientType: clientType },
                954020,
                param => {
                    this.$http({
                        apiType: "2",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        url: "/gateway.do",
                        data: param
                    })
                        .then(res => {
                            console.log(res);
                            this.showLoading = false;
                            if (res.reCode == "0") {
                            } else {
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            );
            
        }
    }
};
</script>
<style></style>