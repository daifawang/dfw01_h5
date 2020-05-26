<template>
    <div class="daily-task">
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
                    <div>一分钟了解打卡</div>
                    <div>
                        <img src="../../assets/images/task/xiaoyuanbao@2x.png">
                        <div>+10</div>
                        <div>已完成3/3</div>
                    </div>
                </div>
                <div class="task-btn">
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
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
        width: 100%;
        min-height: 82px;
        margin-left: 16px;
        border-bottom:1px solid #E8E8E8 ;
        .space-flex()
    }
</style>