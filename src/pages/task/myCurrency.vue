<template>
 <div class="my-currency">
    <div class="header">
        <div class="header-top">
            <div @click="goBack" class="back-icon">
                <img src="../../assets/images/task/fanhui_jiantou.png">
            </div>
            <div>我的元宝</div>
            <div @click="goRule" class="rule-icon">
                <img src="../../assets/images/task/wenhao.png">
            </div>
        </div>
        <div class="header-middle">
            <span class="desc">可用元宝</span>
            <span class="num">178789</span>
            <img src="../../assets/images/task/yuanbao.png" class="yb-icon">
        </div>
    </div>
   <div class="currency-detail">
       <div class="total-box" ref="zsGuide">
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
               <div v-for="(item,index) in type" :key="index" :class="{'act-tag':activeTag==item.id}" @click="changeTab(item.id)">{{item.name}}</div>
           </div>
           <div class="coin-detail">
               <div v-for="(item,index) in coinDetail" :key="index" class="coin-detail-wrapper">
                   <div>
                       <div class="goods-name">{{item.goodsName}}</div>
                       <div class="created-time">{{item.createdTime}}</div>
                   </div>
                   <div class="coin-num" :class="{'red-font':Number(item.coinNum)<0}">{{item.coinNum}}</div>
               </div>
               <div>{{loadText}}</div>
           </div>
        </div>
   </div>
    <div class="bottom">已经到底啦~</div>
 </div>
</template>
<script>
import { AppJsBridge, hybappObj } from "@/assets/js/hybApp_api.js"
import Const from "@/assets/js/const" 
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
           headerLoading:true,
           loadText:'加载中~',
           coinDetail:[
               {goodsName:'签到',createdTime:'2019.11.12    12:09:53',coinNum:'+100'},
               {goodsName:'签到',createdTime:'2019.11.12    12:09:53',coinNum:'-100'},
               {goodsName:'签到',createdTime:'2019.11.12    12:09:53',coinNum:'+100'},
               {goodsName:'签到',createdTime:'2019.11.12    12:09:53',coinNum:'+100'},
               {goodsName:'2元话费',createdTime:'2019.11.12    12:09:53',coinNum:'+100'},
               {goodsName:'签到',createdTime:'2019.11.12    12:09:53',coinNum:'+100'},
               {goodsName:'签到',createdTime:'2019.11.12    12:09:53',coinNum:'+100'},
               {goodsName:'签到',createdTime:'2019.11.12    12:09:53',coinNum:'+100'},
               {goodsName:'2元话费',createdTime:'2019.11.12    12:09:53',coinNum:'-100'},
               {goodsName:'签到',createdTime:'2019.11.12    12:09:53',coinNum:'+100'},
               {goodsName:'签到',createdTime:'2019.11.12    12:09:53',coinNum:'+100'},
               {goodsName:'签到',createdTime:'2019.11.12    12:09:53',coinNum:'+100'},
               {goodsName:'签到',createdTime:'2019.11.12    12:09:53',coinNum:'+100'},
               {goodsName:'签到',createdTime:'2019.11.12    12:09:53',coinNum:'+100'},
               {goodsName:'签到',createdTime:'2019.11.12    12:09:53',coinNum:'+100'},
           ]
       }
   },
   created() {
       document.title = '我的元宝';
       AppJsBridge.hidenNavigation();
   },
   mounted(){
       console.log(  this.$refs.zsGuide.getBoundingClientRect());
       
     
   },
   methods: {
       initSignData(dataJson,sid){// 【JS2053】接口签名
        //  dataJson 业务参数 sid 接口  
           var signData = "";
            var _data=JSON.stringify({dataJson})
            var _json=JSON.stringify({
                data:_data,
                sid: sid
            })
            if(typeof(AndroidAppCommonJs)!=='undefined'){
                signData=AndroidAppCommonJs.signRequestBody(_json)
            }else if(typeof(window.webkit) !== 'undefined'){
                window.webkit.messageHandlers.signRequestBody.postMessage(_json);
                window.AppJSApi_BackSignRequestBody=(signData) => {
                    signData=signData;
                }
            }
            setTimeout(() => {
                console.log('signData--',signData);
                var decodeJson=decodeURI(signData);
                return decodeJson;
                // this.goSignData(decodeJson);            
            }, 200);
       },
       changeTab(id){   //切换tab
           this.activeTag=id;
       },
       goBack(){    //返回
            console.log("返回");
            AppJsBridge.close();
       },
       goRule(){    //规则
            console.log("规则");
            window.location.href=`${Const.APP_RUL}hyb_task_h5/dist/index.html#/task/myCurrencyRule?&NEW_WVW_HYB&t=${new Date().getTime()}`;
            console.log(`${Const.APP_RUL}hyb_task_h5/dist/index.html#/task/myCurrencyRule?&NEW_WVW_HYB&t=${new Date().getTime()}`);
            // this.$router.push({ path: '/task/myCurrencyRule' })
       },
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
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.header{
    width: 100%;
    height: 10.625rem; 
    background: url("../../assets/images/task/wdyb_bg.png") no-repeat;
    background-size: cover;
    // background: linear-gradient(0deg,rgba(228,50,46,1) 0%,rgba(255,96,75,1) 100%);
    // border-radius: 0px 0px 200px 200px/0px 0px 40px 40px;
    color: #fff;
}
.header-top{
    // position: fixed;
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    // .space-flex(space-between);
    // padding: 0 0.8125rem;
    & div{
        display: inline-block;
    }
    .back-icon, .rule-icon{
        position: absolute;
        top: 12px;
        & img{
            max-width: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
    }
    .back-icon{
        left: 13px;
        width: 1.25rem;
        height: 1.25rem;
    }
    .rule-icon{
        right: 15px;
        width: 1.125rem;
        height: 1.125rem;
    }
}
.header-middle{
    margin-top: 0.9375rem;
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
    top:8.4375rem;
    left: 0;
    // width: 100%;
    width: calc(100% - 20px);
    padding: 0 0.625rem;
    .total-box{
        margin-bottom: 5px;
        padding: 0 17px;
        .space-flex(space-between);
        width: calc(100% - 34px);
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
        width: calc(100% - 32px);
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
        .coin-detail{
            width: 100%;
            height: calc(100vh - 289px);
            overflow-y: scroll
        }
        .coin-detail-wrapper{
            .space-flex(space-between);
            height: 73px;
            border-bottom: 1px solid #E8E8E8;
            .goods-name{
                .font(18px,#1A1A1A,19px);
                font-weight:bold;
            }
            .created-time{
                .font(15px,#6C6C6C,19px);
                margin-top: 10px;
            }
            .coin-num{
                .font(18px,#50C39C,19px);
                font-weight:bold;
                margin-bottom: 30px;
            }
            .red-font{
                color: #E4322E;
            }
        }
    }
}
.bottom{
    width: 100%;
    height: 41px;
    line-height: 41px;
    background: olivedrab;
    position: absolute;
    bottom: 0px;
    left: 0px;
    text-align: center;
    font-size: 16px;
    color: #CACACA;
}
</style>
