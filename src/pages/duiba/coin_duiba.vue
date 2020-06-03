<template>
    <div></div>
</template>
<script>
import Const from "@/assets/js/const" 
import { AppJsBridge, hybappObj } from "@/assets/js/hybApp_api.js";
export default {
    created() {
        this.$toast.loading({
            message: "加载中...",
            forbidClick: true
        });
        this.initData();
        document.title="元宝商城"
    },
    methods: {
        initData() {
            AppJsBridge.initSignData({}, 954009, param => {
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
                            window.location.href=res.result;
                        } else {
                            this.$toast(res.reInfo);
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            });
        }
    }
};
</script>
<style></style>