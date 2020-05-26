<template>
 <div class="my-currency">
   <div class="header">
        <div class="header-top">
            <img src="../../assets/images/task/fanhui_jiantou.png" class="back-icon">
            <div>我的元宝</div>
            <img src="../../assets/images/task/wenhao.png" class="rule-icon">
        </div>
        <div class="header-middle">
            <span class="desc">可用元宝</span>
            <span class="num">178789</span>
            <img src="../../assets/images/task/yuanbao.png" class="yb-icon">
        </div>
   </div>
   <div class="currency-detail">
       <div class="total-box">
            <div>
                <div class="total-desc">总获取</div>
                <div class="had-num">178789</div>
            </div>
            <div >
                <div class="total-desc">已使用</div>
                <div class="used-num">789</div>
            </div>
        </div>
        <div class="coin-list">
           <div class="cl-tag">
               <div v-for="(item,index) in type" :key="index" :class="{'act-tag':activeTag==item.id}">{{item.name}}</div>
           </div>
           <div class="coin-detail">
               <div v-for="(item,index) in coinDetail" :key="index" class="coin-detail-wrapper">
                   <div>
                       <div>{{item.goodsName}}</div>
                       <div>{{item.createdTime}}</div>
                   </div>
                   <div>{{item.coinNum}}</div>
               </div>
           </div>
        </div>
   </div>
 </div>
</template>
<script>
export default {
   name: "myCurrency",
   data() {
       return {
           type:[
               {name:'全部',id:'0'},
               {name:'已获取',id:'1'},
               {name:'已使用',id:'2'}
           ],
           activeTag:0, //全部 已获取 已使用 被选中状态
           coinDetail:[
               {goodsName:'签到',createdTime:'2019.11.12    12:09:53',coinNum:'+100'},
               {goodsName:'签到',createdTime:'2019.11.12    12:09:53',coinNum:'-100'},
               {goodsName:'签到',createdTime:'2019.11.12    12:09:53',coinNum:'+100'},
               {goodsName:'签到',createdTime:'2019.11.12    12:09:53',coinNum:'+100'},
               {goodsName:'签到',createdTime:'2019.11.12    12:09:53',coinNum:'+100'},
               {goodsName:'签到',createdTime:'2019.11.12    12:09:53',coinNum:'+100'},
               {goodsName:'签到',createdTime:'2019.11.12    12:09:53',coinNum:'+100'},
               {goodsName:'签到',createdTime:'2019.11.12    12:09:53',coinNum:'+100'},
           ]
       }
   },
}
</script>
<style type="text/less" lang="less"  scoped>
.background(@url,@repeat) {
    background-image: url(@url);
    background-size: cover;
    background-position: center;
    background-repeat: @repeat;
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
.my-currency{
    font-size: 1.125rem;
}
.header{
    width: 100%;
    height: 11.0625rem; 
    background: linear-gradient(0deg,rgba(228,50,46,1) 0%,rgba(255,96,75,1) 100%);
    border-radius: 0px 0px 200px 200px/0px 0px 40px 40px;
    color: #fff;
}
.header-top{
    .space-flex(space-between);
    height: 2.8125rem;
    padding: 0 0.8125rem;
    .back-icon{
        width: 1.25rem;
        height: 1.25rem;
    }
    .rule-icon{
        width: 1.125rem;
        height: 1.125rem;
    }
}
.header-middle{
    margin-top: 1.75rem;
    padding-left: 1.625rem;
    .desc{
        font-size: 1rem;
    }
    .num{
        font-size: 31px;
        font-weight: bold;
        margin: 0 11px 0 16px;
    }
    .yb-icon{
        width: 1.25rem;
        height: auto;
    }
}
.currency-detail{
    position: absolute;
    top:18.53%;
    left: 0;
    width: 100%;
    padding: 0 0.625rem;
    
}
.total-box{
    margin-bottom: 5px;
    padding: 0 17px;
    .space-flex(space-between);
    width: calc(100% - 54px);
    height:99px;
    background:rgba(255,255,255,1);
    border-radius:8px;
    text-align: left;
    .used-num{
        text-align: right;
    }
    .total-desc{
        font-size: 16px;
        color: rgba(153,153,153,1);
        line-height: 25px;
    }
    .had-num{
        font-size: 24px;
        font-weight: bold;
        color: rgba(0,0,0,1);
    }
    .used-num{
        font-size:24px;
        font-weight:bold;
        color:rgba(153,153,153,1);
    }
}
.coin-list{
    width: calc(100% - 20px);
    background:rgba(255,255,255,1);
    border-radius:0.5rem;
    padding:19px 16px 0px;
    .cl-tag{
        .space-flex(flex-start);
        margin-bottom:0.1875rem;
        font-size:1rem;
        color:rgba(153,153,153,1);
        & div{
            margin-right:25px;
        }
        .act-tag{
            border: 0.0625rem solid rgba(228,50,46,1);
            border-radius: 6.25rem;
            padding: 0rem 0.8125rem;;
            color:#E4322E;
        }
    }
    .coin-detail-wrapper{
        .space-flex(space-between);
    }
}
</style>
