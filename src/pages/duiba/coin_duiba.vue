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
        }
        document.title="元宝商城";
        this.clickLog();
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
                            window.location.replace=res.result;
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
            let type = this.$utils.GetQueryString("type");
            console.log('日志type为：'+type);
            
        }
    }
};
</script>
<style></style>