<template>
    <div class="daily-task">
        <div class="task-title" @click="refresh('0')"> 【JS2063】关闭0下拉刷新控件</div>
        <div class="task-title" @click="refresh('1')"> 【JS2063】打开1下拉刷新控件</div>
        <div class="task-title" >默认0-看下下拉刷新： {{count}}</div>
        <!-- 新手任务 -->
        <div class="task-title task-title-new" >新手任务
            <div @click="goVideoList">
                <img class="task-title-new-icon1" src="../../assets/images/task/xinshou@2x.png"> 新手攻略
                <img class="task-title-new-icon2" src="../../assets/images/task/jiantou_you@2x.png">
            </div>
        </div>
         <div class="task-wrapper" v-if="newTaskList1 && newTaskList1.length>0">
            <div v-for="(newItem,index) in newTaskList1" :key="index">
                <div class="task-box">
                    <div class="task-icon">
                        <!-- <img :src="newItem.headImg"> -->
                    </div>
                    <div class="task-main">
                        <div class="task-main-title">
                            <div>{{newItem.taskName}}</div>
                            <div v-if="newItem.miniTagList">
                                <div v-for="(miniTagItem,index) in newItem.miniTagList" :key="index" class="task-main-tag">
                                    <img  :src="miniTagItem">
                                </div>
                            </div>
                        </div>
                        <div class="task-main-info" v-if="newItem.note">{{newItem.note}}</div>
                        <div class="task-main-desc">
                            <img src="../../assets/images/task/xiaoyuanbao@2x.png">
                            <div class="task-main-desc-num">+{{newItem.rewardNum}}</div>
                            <div v-if="newItem.taskNeedSum > 1" class="task-main-desc-text">
                                <span>已完成</span>
                                <span :class="{'red-font':Number(newItem.taskNowSum) > 0}">{{newItem.taskNowSum}}</span><span>/{{newItem.taskNeedSum}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="task-btn-div">
                        <div class="task-btn">
                            <div :class="{'to-do':newItem.status=='0','doing':newItem.status=='1','done':newItem.status=='2',}">{{newItem.taskAction}}</div>
                        </div>
                        <div v-if="newItem.signCardText" class="task-btn-text">
                            <div>{{newItem.signCardText}}</div>
                        </div>
                    </div>
                </div>
                <div v-if="newItem.meansSonTasks">
                    <div class="new-task-card">
                        <div v-for="(meansSonItem,index) in newItem.meansSonTasks" :key="index" >
                            <div class="line-box">
                                <div v-if="meansSonItem.taskStatus == '0'" class="new-task-status-to">
                                    <div>
                                        <div>
                                            <img src="../../assets/images/task/yuanbao_xiao@2x.png">
                                            <div>+{{meansSonItem.rewardNum}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="new-task-status-done">
                                    <div>
                                        <img src="../../assets/images/task/wancheng.png">
                                    </div>
                                </div>
                                <div v-if="index==0" class="short-line line short-a" :class="{'active-line':meansSonItem.taskStatus=='1'}"></div>
                                <div v-if="index==1" class="long-line line long-a" :class="{'active-line':meansSonItem.taskStatus=='1'}"></div>
                                <div v-if="index==1" class="long-line line long-b" :class="{'active-line':meansSonItem.taskStatus=='1'}"></div>
                                <div v-if="index==2" class="short-line line short-b" :class="{'active-line':meansSonItem.taskStatus=='1'}"></div>
                            </div>
                            <div>{{meansSonItem.taskName}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 每日任务 -->
        <div class="task-title">每日任务</div>
        <div class="task-wrapper">
            <transition-group appear name="taskList" tag="div">
            <div v-for="(dailyItem,index) in daliyTaskList" :key="dailyItem.taskId" @click="clickUrl(index,dailyItem.jumpUrl)">
                <div class="task-box">
                    <div class="task-icon">
                        <!-- <img :src="dailyItem.headImg"> -->
                    </div>
                    <div class="task-main">
                        <div class="task-main-title">
                            <div>{{dailyItem.taskName}}</div>
                            <div v-if="dailyItem.miniTagList">
                                <div v-for="(miniTagItem,index) in dailyItem.miniTags" :key="index" class="task-main-tag">
                                    <img  :src="miniTagItem">
                                </div>
                            </div>
                        </div>
                        <div class="task-main-info" v-if="dailyItem.note">{{dailyItem.note}}</div>
                        <div class="task-main-desc">
                            <img src="../../assets/images/task/xiaoyuanbao@2x.png">
                            <div class="task-main-desc-num">+{{dailyItem.rewardNum}}</div>
                            <div v-if="dailyItem.taskNeedSum > 1" class="task-main-desc-text">
                                <span>已完成</span>
                                <span :class="{'red-font':Number(dailyItem.taskNowSum) > 0}">{{dailyItem.taskNowSum}}</span><span>/{{dailyItem.taskNeedSum}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="task-btn-div">
                        <div class="task-btn">
                            <div :class="{'to-do':dailyItem.status=='1','doing':dailyItem.status=='2','done':dailyItem.status=='3',}">{{dailyItem.buttonText}}</div>
                        </div>
                        <div v-if="dailyItem.signCardText" class="task-btn-text">
                            <div>{{dailyItem.signCardText}}</div>
                        </div>
                    </div>
                </div>
            </div>
            </transition-group>
        </div>
    </div>
</template>
<script>
import { AppJsBridge, hybappObj } from "@/assets/js/hybApp_api.js"
import Const from "@/assets/js/const" 
export default {
    data() {
        return {
            count:0,
            hasDaliyTask:true, // 是否有每日任务
            hasNewTask:true, // 是否有新手任务
            daliyTaskList:[],
            newTaskList1:[
                {
                    taskNeedSum:'1',
                    taskNowSum:'1',
                    headImg:require("../../assets/images/task/daka@2x.png"),
                    miniTags:[
                        "https://test-live-ol-cdn.log56.com/nsq/header/20200401/d6a323f7-1665-4b3d-8370-926ae7b80ece.jpg",
                    ],
                    status:'0',
                    taskId:'1',
                    signCardText:'2.5W人已观看',
                    note:'一分钟了解打卡',
                    taskName:'打卡',
                    rewardNum:'50',
                    buttonText:'去完成'
                },
                 {
                    // taskNeedSum:'3',
                    // taskNowSum:'1',
                     taskId:'2',
                    headImg:require("../../assets/images/task/daka@2x.png"),
                    status:'0',
                    // signCardText:'2.5W人已观看',
                    // note:'一分钟了解打卡',
                    taskName:'完善个人资料',
                    rewardNum:'20',
                    buttonText:'去完善',
                    meansSonTasks:[
                        {taskStatus:'0',//0 未完成  1 已完成  2 已领取奖励
                        taskName:'个人信息',
                        rewardNum:'20'},
                         {taskStatus:'1',//0 未完成  1 已完成  2 已领取奖励
                        taskName:'车辆信息',
                        rewardNum:'20'},
                         {taskStatus:'0',//0 未完成  1 已完成  2 已领取奖励
                        taskName:'运输经验',
                        rewardNum:'20'},
                    ]
                },
               
            ],
            newTaskList:[]
        }
    },
    created() {
        console.log('created');
        
    },
    mounted() {
        this.initNewTaskListData();
        setTimeout(() => {
            this.initDaliyTaskListData();
        }, 50);
         window['AppJSApi_BackH5TaskTabClick'] = (_json) => {
            console.log("客户端返回的任务Tab点击通知>>",_json);
            this.initDaliyTaskListData();
        }
    },
    methods: {
        goVideoList(){  //新手任务挑战
            window.location.href=`${Const.APP_RUL}hyb_task_h5/dist/index.html?t=${new Date().getTime()}/#/task/taskVideoList?&NEW_WVW_HYB`;
            // console.log(`${Const.APP_RUL}hyb_task_h5/dist/index.html#/task/taskVideoList?&NEW_WVW_HYB&t=${new Date().getTime()}`);
        },
        refresh(type){
            AppJsBridge.setClientRefresh(type);
        },
        // 新手任务接口
        initNewTaskListData() {
            console.log('-------------initNewTaskListData-------------');
            AppJsBridge.initSignData({}, 954008, param => {
                this.$http({
                apiType: "2",
                headers: {
                    "Content-Type": "application/json"
                },
                url: "/gateway.do",
                data: param
                })
                .then(res => {
                    console.log(33333333333333);
                    // console.log(res);
                    if (res.reCode === "0") {
                        console.log(22222222222);
                        console.log(res.result.length);
                        // alert(res.result.length)
                        if(res.result.length>0){
                            this.newTaskList=res.result;
                            console.log(111111111111111111111111111);
                            
                            console.log(this.newTaskList);
                            
                        }
                    } else {
                    this.$toast(res.reInfo);
                    }
                })
                .catch(e => {
                    console.log(e);
                });
            });
        },
        // 每日任务接口
        initDaliyTaskListData() {
            AppJsBridge.initSignData({}, 954005, param => {
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
                        if(res.result.taskList && res.result.taskList.length > 0){
                            this.daliyTaskList=res.result.taskList;
                        }else{

                        }
                    } else {
                    this.$toast(res.reInfo);
                    }
                })
                .catch(e => {
                    console.log(e);
                });
            });
        },
        // 跳转
        clickUrl(index,url){
            if(index>1 && this.daliyTaskList[index].status == '2'){
                let _obj = this.daliyTaskList[index];
                this.daliyTaskList.splice(index, 1);
                this.daliyTaskList.push(_obj);
                return;
            }
            // if(url=='refresh'){
            //     // 跳转刷一刷tab
            //     AppJsBridge.appBackMainTab('REFRESH');
            // }else if(url=='video'){
            //     // 跳转刷一刷视频详情
            //     AppJsBridge.goVideoTopicDetail('1202017');
            // }else{
            //     window.location.href=url+"?&NEW_WVW_HYB";
            // }
           
        },
    },
}
</script>
<style lang="less" scoped>
.taskList-leave-to {
  opacity: 0;
  transform: translateX(-3.125rem);
}
.taskList-leave-active {
  transition: all 1s ease;
}
.taskList-move{
  transition: all 1s ease;
}
.taskList-leave-active {
  position: absolute;
}
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
    .center(){
        position: absolute;
        // left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
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
    .task-title-new{
        .space-flex(space-between);
        &>div{
            .space-flex(space-between);
            .font(1.0625rem,#999999,1.5625rem);
            font-weight: normal;
            .task-title-new-icon1{
                width: 1.3125rem;
                height: 1.3125rem;
                margin-right: 0.125rem;
                margin-bottom: 0.3125rem;
            }
            .task-title-new-icon2{
                width: 0.6875rem;
                height: 0.6875rem;
                margin: 0 0.6875rem 0.125rem 0.4375rem;
            }
        }
    }

    .task-wrapper{
        width: 100%;
        height: auto;
        background: #ffffff;
        &>div{
            margin-left: 1rem;
            border-bottom:0.0625rem solid #E8E8E8 ;
        }
    }
    .task-box{
        // width: 100%;
        min-height: 5.125rem;
        
        padding-right: 0.625rem;
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
    .new-task-card{
        width: 100%;
        box-sizing: border-box;
        padding: 0 26px 0 10px;
        margin-bottom: 18px;
        text-align: center;
        .space-flex(space-between);
        &>div{
            &>div{
                margin: 0 auto 4px;
            }
        }
        .line-box{
            position: relative;
            .line{
                .center();
                width:170%;
                height:0.125rem;
                background:rgba(232,232,232,1);
                border-radius:0.0625rem;
                z-index: 0;
            }
            .short-line{
                width:50%;
                z-index: 8;
            }
            .short-a{
                left:0.9375rem;
            }
            .short-b{
                right: -1.1875rem;
            }
            .long-line{
                width:6.25rem;
                z-index: 7;
            }
            .long-a{
                left: -17px;
            }
            .long-b{
                left: 86px;
            }
            .active-line{
             background: rgba(134,233,204,1);
        }
        }
        
        .new-task-status-to{
            position: relative;
            z-index: 9;
            width:46px;
            height:46px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(232,232,232,1);
            border-radius:50%;
            box-sizing: border-box;
            margin: 0 auto;
            .space-flex();
            &>div{
                width:42px;
                height:42px;
                background:rgba(232,232,232,1);
                border-radius:50%;
                .space-flex();
                &>div{
                    font-size:14px;
                    line-height: 17px;
                    font-weight:bold;
                    color:rgba(108,108,108,1);
                    & img{
                        width:16px;
                        height:10px;
                    }
                }
            }
        }
        .new-task-status-done{
            position: relative;
            z-index: 9;
            width: 46px;
            height: 46px;
            background: rgba(134,233,204,1);
            border-radius: 50%;
            margin: 0 auto;
            .space-flex();
            &>div{
                width: 42px;
                height: 42px;
                background: rgba(79,211,172,1);
                border-radius: 50%;
                .space-flex();
                &>img{
                    width: 17px;
                    height: 12px;
                }
            }
        }
    }
</style>