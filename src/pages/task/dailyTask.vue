<template>
    <div class="daily-task">
        <div class="task-title" @click="openVideoDetail"> 【JS2060】任务-跳转视频详情页</div>
        <div class="task-title" @click="refresh('0')"> 【JS2063】关闭0下拉刷新控件</div>
        <div class="task-title" @click="refresh('1')"> 【JS2063】打开1下拉刷新控件</div>
        <div class="task-title" >默认0-看下下拉刷新： {{count}}</div>
        
        <div class="task-title">每日任务</div>
        <div class="task-wrapper">
            <div class="task-box" v-for="(dailyItem,index) in daliyTaskList" :key="index">
                <div class="task-icon">
                    <!-- <img src="../../assets/images/task/daka@2x.png"> -->
                    <img :src="dailyItem.taskHeadImgUrl">
                </div>
                <div class="task-main">
                    <div class="task-main-title">
                        <div>{{dailyItem.taskName}}</div>
                        <div v-if="dailyItem.miniTagList">
                            <div v-for="(miniTagItem,index) in dailyItem.miniTagList" :key="index" class="task-main-tag">
                                <img  :src="miniTagItem">
                            </div>
                        </div>
                    </div>
                    <div class="task-main-info" v-if="dailyItem.taskNote">{{dailyItem.taskNote}}</div>
                    <div class="task-main-desc">
                        <img src="../../assets/images/task/xiaoyuanbao@2x.png">
                        <div class="task-main-desc-num">+{{dailyItem.reawrdNum}}</div>
                        <div v-if="dailyItem.taskNeedSum" class="task-main-desc-text">
                            <span>已完成</span>
                            <span :class="{'red-font':Number(dailyItem.taskNowSum) > 0}">1</span><span>/{{dailyItem.taskNeedSum}}</span>
                        </div>
                    </div>
                </div>
                <div class="task-btn-div">
                    <div class="task-btn">
                        <div :class="{'to-do':dailyItem.status=='0','doing':dailyItem.status=='1','done':dailyItem.status=='2',}">{{dailyItem.taskAction}}</div>
                    </div>
                    <div v-if="dailyItem.viewCount" class="task-btn-text">
                        <div>{{dailyItem.viewCount}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { AppJsBridge, hybappObj } from "@/assets/js/hybApp_api.js"
export default {
    data() {
        return {
           
            count:0,
            daliyTaskList:[
                {
                    // taskNeedSum:'3',
                    // taskNowSum:'1',
                    taskHeadImgUrl:require("../../assets/images/task/daka@2x.png"),
                    miniTagList:[
                        "https://test-live-ol-cdn.log56.com/nsq/header/20200401/d6a323f7-1665-4b3d-8370-926ae7b80ece.jpg",
                    ],
                    status:'0',
                    viewCount:'2.5W人已观看',
                    taskNote:'一分钟了解打卡',
                    taskName:'打卡',
                    reawrdNum:'50',
                    taskAction:'去完成'
                },
                 {
                    taskNeedSum:'3',
                    taskNowSum:'1',
                    taskHeadImgUrl:require("../../assets/images/task/daka@2x.png"),
                    status:'0',
                    viewCount:'2.5W人已观看',
                    taskNote:'一分钟了解打卡',
                    taskName:'刷一刷',
                    reawrdNum:'20',
                    taskAction:'去完成'
                },
                {
                    taskNeedSum:'3',
                    taskNowSum:'1',
                    taskHeadImgUrl:require("../../assets/images/task/daka@2x.png"),
                    status:'0',
                    viewCount:'',
                    taskName:'转发文章',
                    reawrdNum:'20',
                    taskAction:'去转发'
                }, {
                    taskNeedSum:'3',
                    taskNowSum:'1',
                    taskHeadImgUrl:require("../../assets/images/task/daka@2x.png"),
                    status:'0',
                    viewCount:'',
                    taskName:'点赞文章',
                    reawrdNum:'20',
                    taskAction:'去点赞'
                } ,{
                    taskNeedSum:'3',
                    taskNowSum:'1',
                    taskHeadImgUrl:require("../../assets/images/task/daka@2x.png"),
                    status:'0',
                    viewCount:'',
                    taskName:'评论文章',
                    reawrdNum:'20',
                    taskAction:'去评论'
                }
            ]
        }
    },
    created() {
        // this.openVideoDetail();
    //    setInterval(() => {
    //        this.count++;
    //    }, 2000);
    },
    methods: {
        taskOpenVideoDetails(jsonStr){
            console.log('【JS2060】任务-跳转视频详情页');
            let _json= JSON.stringify({jsonStr});
            console.log(_json);
            try {
                if(typeof(AndroidAppGoodsJs) != 'undefined'){
                    console.log('----进入AndroidAppCommonJs.taskOpenVideoDetails----');
                    AndroidAppCommonJs.taskOpenVideoDetails(_json)
                }else if(typeof(window.webkit) !== 'undefined'){
                    console.log('----进入window.webkit.messageHandlers.taskOpenVideoDetails.postMessage----');
                    window.webkit.messageHandlers.taskOpenVideoDetails.postMessage(_json);  
                }
                window.AppJSApi_BackH5TaskOrdersInfo=(string) => {
                    // taskType：1.专属任务 2.新手任务 3.每日任务
                    console.log('----进入AppJSApi_BackH5TaskOrdersInfo----');
                    console.log('string:'+string);
                }
            } catch (error) {
                console.log(JSON.stringify(error));
            }
        },
        openVideoDetail(){
            console.log('openVideoDetail');
            this.taskOpenVideoDetails({});
        },
        refresh(type){
            AppJsBridge.setClientRefresh(type);
        }
    },
}
</script>
<style lang="less" scoped>
    .font(@sise,@color,@lh) {
        font-size: @sise;
        color: @color;
        line-height: @lh;
    }
    .space-flex(@flex:center) {
        display: -webkit-flex;
        display: flex;
        -webkit-align-items: center;
        align-items: center;
        -webkit-justify-content: @flex;
        justify-content: @flex;
    }
    .daily-task{
        width: 100%;
        height: auto;
    }
    .task-title{
        height: 3.625rem;
        background: rgba(251,251,251,1);
        padding-left: 1rem;
        .font(1.1875rem,#000000,58px);
        font-weight: bold;
    }
    .task-wrapper{
        width: 100%;
        height: auto;
        background: #ffffff;
    }
    .task-box{
        // width: 100%;
        min-height: 5.125rem;
        margin-left: 1rem;
        padding-right: 0.625rem;
        border-bottom:0.0625rem solid #E8E8E8 ;
        position: relative;
        .space-flex();
        .task-icon{
            width: 1.625rem;
            height: 1.625rem;
            margin-right: 0.6875rem;
            & img{
                max-width: 100%;
            }
        }
        .task-main{
            flex: 1;
            .task-main-title{
                .space-flex(flex-start);
                .font(1.125rem, #000000, 1.5625rem);
                font-weight: bold;
                .task-main-tag{
                    width: fit-content;
                    height: 1.0625rem;
                    overflow: hidden;
                    width: auto;
                    margin:0 0.3125rem;
                    &>img{
                        max-height: 100%;
                    }
                }
            }
            .task-main-info{
                .font(1rem,#6C6C6C,1.5625rem)
            }
            .task-main-desc{
                .space-flex(flex-start);
                & img{
                    width: 1.1875rem;
                    height: 0.8125rem;
                }
                .task-main-desc-num{
                    .font(0.875rem,#FFBD05,1.5625rem);
                    margin: 0rem 0.3125rem 0rem 0.375rem;
                }
                .task-main-desc-text{
                    font-size:0rem;
                    & span{
                        .font(0.875rem,#6C6C6C,1.5625rem);
                    }
                    .red-font{
                        color: #D11414;
                    }
                }
            }
        }
        .task-btn-div{
            .task-btn{
                width: 5.1875rem;
                height: 1.9375rem;
                // font-size:17px;
                // line-height: 31px;
                text-align: center;
                .font(1.0625rem,#000000,1.9375rem);
                .done{
                    border: 0.0625rem solid rgba(184,184,184,1);
                    border-radius: 12.5rem;
                    color: #A7A7A7;
                    line-height: 1.8125rem;
                }
                .doing{
                    background:linear-gradient(90deg,rgba(255,94,23,1),rgba(254,52,45,1));
                    box-shadow:0rem 0.3125rem 0.625rem 0rem rgba(255,52,47,0.3);
                    border-radius: 12.5rem;
                    color: #FFFFFF;
                }
                .to-do{
                    background:linear-gradient(113deg,rgba(248,242,229,1) 0%,rgba(243,225,189,1) 100%);
                    border-radius: 12.5rem;
                }
            }
            .task-btn-text{
                width:5.625rem;
                height:1.0625rem;
                background:rgba(255,242,242,1);
                border-radius:0.125rem;
                position: absolute;
                bottom: 0.125rem;
                text-align: center;
                // .font(0.75rem,#D11414,1.0625rem);
                &>div{
                    font-size: 0.75rem;
                    transform: scale(0.9);
                    color: #D11414;
                }
            }
        }
    }
</style>