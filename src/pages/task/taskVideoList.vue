<template>
    <div class="task-video">
        <div class="video-wrapper" v-for="(item,index) in videoList" :key="index"
            :style="{backgroundImage:'url('+item.coverUrl+')'}" @click="openVideoDetails(item)">
            <div class="video-title">{{item.videoTitle}}</div>
            <img src="../../assets/images/task/bofang@2x.png">
            <div class="video-time">{{item.duration | formatSeconds}}</div>
        </div>
       
    </div>
</template>
<script>
import { AppJsBridge, hybappObj } from "@/assets/js/hybApp_api.js";
export default {
    data() {
        return {
            videoList: []
        };
    },
    created() {},
    mounted() {
        this.initData();
        document.title = "新手攻略";
        window.AppJSApi_BackH5TaskOrdersInfo = string => {
            // taskType：1.专属任务 2.新手任务 3.每日任务
            console.log("taskType：1.专属任务 2.新手任务 3.每日任务");
            console.log("----进入AppJSApi_BackH5TaskOrdersIn民-----");
            console.log("string:" + string);
            this.initData();
        };
    },
    computed: {},
    filters: {
        formatSeconds: function(value) {
            let result = parseInt(value);
            let h =
                Math.floor(result / 3600) < 10
                    ? "0" + Math.floor(result / 3600)
                    : Math.floor(result / 3600);
            let m =
                Math.floor((result / 60) % 60) < 10
                    ? "0" + Math.floor((result / 60) % 60)
                    : Math.floor((result / 60) % 60);
            let s =
                Math.floor(result % 60) < 10
                    ? "0" + Math.floor(result % 60)
                    : Math.floor(result % 60);
            if (h > 0) {
                result = `${h}:${m}:${s}`;
            } else {
                result = `${m}:${s}`;
            }
            return result;
        }
    },
    methods: {
        initData() {
            AppJsBridge.initSignData({}, 954004, param => {
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
                            this.videoList = res.result;
                        } else {
                            this.$toast(res.reInfo);
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            });
        },
        openVideoDetails(jsonStr) {
            console.log("视频播放");
            AppJsBridge.taskOpenVideoDetails(jsonStr);
        }
    }
};
</script>
<style lang="less" scoped>
.task-video {
    width: 100%;
    height: auto;
    background: #ffffff;
}
.video-wrapper {
    width: 100%;
    height: 13rem;
    background: rgba(0, 0, 0, 1);
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    margin-bottom: 0.3125rem;
    .video-title {
        font-size: 1.1875rem;
        color: #ffffff;
        position: absolute;
        left: 1rem;
        top: 0.625rem;
    }
    & > img {
        width: 1.8125rem;
        height: 1.8125rem;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .video-time {
        padding: 0px 0.75rem;
        height: 1.3125rem;
        line-height: 1.3125rem;
        text-align: center;
        background: rgba(0, 0, 0, 1);
        opacity: 0.4;
        border-radius: 6.25rem;
        position: absolute;
        right: 0.625rem;
        bottom: 0.625rem;
        font-size: 0.8125rem;
        color: #ffffff;
    }
}
</style>