<template>
        <van-skeleton  :row="3" :loading="loading">
    <div class="rule-wrapper">
       <div class="rule-box">
           <img src="../../assets/images/task/dingyi@2x.png" alt="">
           <div>{{defineCoin}}</div>
       </div>
       <div class="rule-box">
           <img src="../../assets/images/task/huoqu@2x.png" alt="">
           <div>{{getCoin}}</div>
       </div>
       <div class="rule-box">
           <img src="../../assets/images/task/shiyong@2x.png" alt="">
           <div>{{useCoin}}</div>
       </div>
    </div>
       </van-skeleton>
</template>
<script>
import { AppJsBridge, hybappObj } from "@/assets/js/hybApp_api.js";
export default {
    data() {
        return {
            loading:true,
            defineCoin:'',
            getCoin:'',
            useCoin:''
        }
    },
    created() {
        document.title = '元宝规则';
        this.initData();
    },
    methods: {
    //数据初始化
    initData() {
      AppJsBridge.initSignData({}, 954002, param => {
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
                this.loading=false;
                this.defineCoin=res.result.defineCoin;
                this.getCoin=res.result.getCoin;
                this.useCoin=res.result.useCoin;
            } else {
              this.$toast(res.reInfo);
            }
          })
          .catch(e => {
            console.log(e);
          });
      });
    },
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