<template>
    <div class="daily-task">
        <div class="task-title" @click="openVideoDetail"> 【JS2060】任务-跳转视频详情页</div>
        <div class="task-title">每日任务</div>
        <div class="task-wrapper">
            <div class="task-box">
                <div class="task-icon">
                    <img src="../../assets/images/task/daka@2x.png">
                </div>
                <div class="task-main">
                    <div class="task-main-title">
                        <div>打卡</div>
                        <div>热门</div>
                    </div>
                    <div class="task-main-info">一分钟了解打卡</div>
                    <div class="task-main-desc">
                        <img src="../../assets/images/task/xiaoyuanbao@2x.png">
                        <div class="task-main-desc-num">+10</div>
                        <div class="task-main-desc-text">
                            <span>已完成</span>
                            <span :class="{'red-font':Number(taskNowSum) > 0}">1</span><span>/{{taskNeedSum}}</span>
                        </div>
                    </div>
                </div>
                <div class="task-btn-div">
                    <div class="task-btn">
                        <div :class="{'to-do':status=='0','doing':status=='1','done':status=='2',}">已完成</div>
                    </div>
                    <div class="task-btn-text">
                        <div>2.5W人已观看</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            status:0,
            taskNeedSum:3,
            taskNowSum:1,
        }
    },
    created() {
        // this.openVideoDetail();
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
        height: 58px;
        background: rgba(251,251,251,1);
        padding-left: 16px;
        .font(19px,#000000,58px);
        font-weight: bold;
    }
    .task-wrapper{
        width: 100%;
        height: auto;
        background: #ffffff;
    }
    .task-box{
        // width: 100%;
        min-height: 82px;
        margin-left: 16px;
        padding-right: 10px;
        border-bottom:1px solid #E8E8E8 ;
        position: relative;
        .space-flex();
        .task-icon{
            width: 26px;
            height: 26px;
            margin-right: 11px;
            & img{
                max-width: 100%;
            }
        }
        .task-main{
            flex: 1;
            .task-main-title{
                .space-flex(flex-start);
                .font(18px, #000000, 25px);
                font-weight: bold;
            }
            .task-main-info{
                .font(16px,#6C6C6C,25px)
            }
            .task-main-desc{
                .space-flex(flex-start);
                & img{
                    width: 19px;
                    height: 13px;
                }
                .task-main-desc-num{
                    .font(14px,#FFBD05,25px);
                    margin: 0px 5px 0px 6px;
                }
                .task-main-desc-text{
                    font-size:0px;
                    & span{
                        .font(14px,#6C6C6C,25px);
                    }
                    .red-font{
                        color: #D11414;
                    }
                }
            }
        }
        .task-btn-div{
            .task-btn{
                width: 83px;
                height: 31px;
                // font-size:17px;
                // line-height: 31px;
                text-align: center;
                .font(17px,#000000,31px);
                .done{
                    border: 1px solid rgba(184,184,184,1);
                    border-radius: 200px;
                    color: #A7A7A7;
                    line-height: 29px;
                }
                .doing{
                    background:linear-gradient(90deg,rgba(255,94,23,1),rgba(254,52,45,1));
                    box-shadow:0px 5px 10px 0px rgba(255,52,47,0.3);
                    border-radius: 200px;
                    color: #FFFFFF;
                }
                .to-do{
                    background:linear-gradient(113deg,rgba(248,242,229,1) 0%,rgba(243,225,189,1) 100%);
                    border-radius: 200px;
                }
            }
            .task-btn-text{
                width:90px;
                height:17px;
                background:rgba(255,242,242,1);
                border-radius:2px;
                position: absolute;
                bottom: 2px;
                text-align: center;
                &>div{
                     .font(12px,#D11414,17px);
                    transform: scale(0.9);
                }
            }
        }
    }
</style>