<template>
    <div class="rule-wrapper">
       <div class="rule-box">
           <img src="../../assets/images/task/dingyi@2x.png" alt="">
           <div>元宝是好运宝平台鼓励卡友使用app设定的平台奖励。元宝不可转让，可用于元宝商城兑换相对应的商品、参与元宝商城活动或游戏使用。</div>
       </div>
       <div class="rule-box">
           <img src="../../assets/images/task/huoqu@2x.png" alt="">
           <div>元宝是好运宝平台鼓励卡友使用app设定的平台奖励。元宝不可转让，可用于元宝商城兑换相对应的商品、参与元宝商城活动或游戏使用。元宝是好运宝平台鼓励卡友使用app设定的平台奖励。元宝不可转让，可用于元宝商城兑换相对应的商品、参与元宝商城活动或游戏使用。</div>
       </div>
       <div class="rule-box">
           <img src="../../assets/images/task/shiyong@2x.png" alt="">
           <div>元宝是好运宝平台鼓励卡友使用app设定的平台奖励。元宝不可转让，可用于元宝商城兑换相对应的商品、参与元宝商城活动或游戏使用。</div>
       </div>
    </div>
</template>
<script>
export default {
    created() {
        document.title = '元宝规则';
    },
}
</script>
<style lang="less" scoped>
.rule-wrapper{
    width: 100%;
    height: 100vh;
    background: url("../../assets/images/task/bg@2x.png") no-repeat;
    background-size: 100% 100%;
    padding: 15px 10px;
    box-sizing: border-box;
    .rule-box{
        width: calc(100% - 32px);
        height: auto;
        background:rgba(255,255,255,1);
        border-radius:4px;
        padding: 10px 16px;
        margin-bottom: 16px;
        font-size:16px;
        color:rgba(0,0,0,1);
        line-height:23px;
        img{
            width: 125px;
            height: auto;
            margin-left: -16px;
        }
    }
}
    
</style>