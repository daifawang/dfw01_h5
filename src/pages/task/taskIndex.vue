<template>
    <div id="taskTemp" class="wapperTask">
    <div id="taskTemp" class="wapperTask" :class="{guideBg:showGuide}">
      <div v-if="showGuide === '1'" class="task-guide">
        <div class="guide-text">完成任务领取的元宝在这里~</div>
        <div class="guide-bttn" @click="guideTo('1')">知道啦</div>
      </div>
      <van-skeleton title avatar :row="2" avatar-shape="square" :loading="loadingFlag1">
        <div class="task-main">
          <div class="task-title" ref="zsGuide" :class="{guideQuan:showGuide === '1'}">专属任务</div>
          <div class="task-li">
            <div class="task-li-t">
              <img class="task-t-icon" src="../../assets/images/task/daka@2x.png" />
              <div class="task-t-div">
                <div class="task-t-name">
                  <span>完成接单</span><img src="../../assets/images/task/huoqu@2x.png" />
                </div>
                <!-- <div class="task-t-note">完善证件信息后可结算运费</div> -->
                <div class="task-t-currency">
                  <img src="../../assets/images/task/xiaoyuanbao@2x.png" /><span>+5</span>
                </div>
              </div>
              <div class="right-bttn">
                <span class="bttn-span" ref="guideFour">去接单</span>
              </div>
            </div>
            <div class="task-li-content">
              <img class="task-comp-img" src="../../assets/images/task/dingyi@2x.png" />
              <div class="task-li-line">北京昌平区⇀上海浦东区</div>
              <div class="task-li-line">普货【30吨】</div>
              <div class="task-li-line">1800元【到付】</div>
            </div>
          </div>
        </div>
      </van-skeleton>
      <van-skeleton title avatar :row="3" avatar-shape="square" :loading="loadingFlag2">
        <div class="task-main">
          <div class="task-title">新手任务</div>
          <div class="task-li">
            <div class="task-li-t">
              <img class="task-t-icon" src="../../assets/images/task/daka@2x.png" />
              <div class="task-t-div">
                <div class="task-t-name">
                  <span>完成接单</span><img src="../../assets/images/task/huoqu@2x.png" />
                </div>
                <div class="task-t-note">完善证件信息后可结算运费</div>
                <div class="task-t-currency">
                  <img src="../../assets/images/task/xiaoyuanbao@2x.png" /><span>+5</span>
                </div>
              </div>
              <div class="right-bttn">
                <span class="bttn-span" ref="guideFour">去接单</span>
              </div>
            </div>
          </div>
        </div>
      </van-skeleton>
      <van-skeleton title avatar :row="4" avatar-shape="square" :loading="loadingFlag3">
        <div class="task-main">
          <div class="task-title" @click="GoDaily">每日任务</div>
          <div class="task-li">
            <div class="task-li-t">
              <img class="task-t-icon" src="../../assets/images/task/daka@2x.png" />
              <div class="task-t-div">
                <div class="task-t-name">
                  <span>完成接单</span><img src="../../assets/images/task/huoqu@2x.png" />
                </div>
                <div class="task-t-currency">
                  <img src="../../assets/images/task/xiaoyuanbao@2x.png" /><span>+5</span>
                </div>
              </div>
              <div class="right-bttn">
                <span class="bttn-span" ref="guideFour">去接单</span>
              </div>
            </div>
          </div>
        </div>
      </van-skeleton>
    </div>
    </div>
</template>
<script>
import Const from "@/assets/js/const" 
import { AppJsBridge, hybappObj } from "@/assets/js/hybApp_api.js";
export default {
    data() {
        return {
          loadingFlag1: true,
          loadingFlag2: true,
          loadingFlag3: true,
          showGuide: '1'
        }
    },
    created() {
        document.title = '任务';
        this.initMedth();
    },
    mounted() {
      setTimeout(() => {
        this.loadingFlag1 = false;
        this.loadingFlag2 = false;
        this.loadingFlag3 = false;
      }, 1000)
    },
    methods:{
      GoDaily(){
         this.$router.push({ path: '/task/dailyTask' })
      },
      initMedth(){
        var signData = "";
        var _data=JSON.stringify({
          'source':'0',
          'channel':'1'
        })
        var _json=JSON.stringify({
          data:_data,
          sid: '954000'
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
          var decodeJson=decodeURI(signData)
          this.goSignData(decodeJson);            
        }, 200);
      },
      goSignData(decodeJson){
        console.log('decodeJson--',decodeJson);
        var param = JSON.parse(decodeJson);
        console.log('---param---',param);
        this.$http({
            apiType: '2',
            headers: {
                "Content-Type": "application/json"
            },
            url: "/gateway.do",
            data:  param
          })
          .then(res => {
            console.log(res);
          })
          .catch(e => {
            console.log(e);
          });
      },
      guideTo(num){
        this.showGuide = num;
        if(num === '2'){
          AppJsBridge.guideTask(JSON.stringify({
            navMaskShow: '1',
            navBtnEmpty: '1',
            tabMaskShow: '0',
            taskTabBtnEmpty: '0'
          }));
        }else if(num === '3'){
          AppJsBridge.guideTask(JSON.stringify({
            navMaskShow: '0',
            navBtnEmpty: '0',
            tabMaskShow: '1',
            taskTabBtnEmpty: '1'
          }));
        }else if(num === '4'){
          AppJsBridge.guideTask(JSON.stringify({
            navMaskShow: '1',
            navBtnEmpty: '0',
            tabMaskShow: '1',
            taskTabBtnEmpty: '0'
          }));
        }else if(num === ''){
          AppJsBridge.guideTask(JSON.stringify({
            navMaskShow: '0',
            navBtnEmpty: '0',
            tabMaskShow: '0',
            taskTabBtnEmpty: '0'
          }));
        }
      },
      toastD(){
        console.log(2);
        this.$toast({
          position: 'top',
          message: 'toastdddddd',
          duration: 1500
        });
      }
  }
}
</script>

<style lang="scss" scoped>
.wapperTask {
  height: 100vh;
  box-sizing: border-box;
  background-color: #E8E8E8;
  overflow: scroll;
}
.wapperTask .van-skeleton {
    margin-top: 1.85rem;
}
.guideBg{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  z-index: 9990;
}
.task-guide {
  position: absolute;
  /* top: 20px; */
  z-index: 9900;
  .guide-text {
    position: relative;
    left: 8%;
    width: 84%;
    /* height: 52px; */
    border: 1px dashed rgba(255,255,255,1);
    border-radius: 10px;
    color: rgba(255,255,255,1);
    line-height: 23px;
    font-size: 15px;
    font-family: Source Han Sans CN;
    padding: 3px;
  }
  .guide-bttn {
    width: 83px;
    height: 32px;
    line-height: 1.8125rem;
    border: .0625rem solid #fff;
    border-radius: 1rem;
    color: #fff;
    position: absolute;
    bottom: -2.875rem;
    right: 8%;
    background-color: #eb5e3d;
    text-align: center;
  }
}
.task-guide3{
    position: absolute;
    z-index: 9900;
    bottom: 4.1875rem;
}
.task-main {
  margin-bottom: .3125rem;
  background-color: #fff;
  .task-title {
    height: 3.625rem;
    line-height: 3.625rem;
    padding-left: .875rem;
    background: rgba(251,251,251,1);
    font-size: 1.1875rem;
    font-family: Source Han Sans SC;
    font-weight: 500;
    color: rgba(0,0,0,1);
  }
  .task-li {
    padding: 1.1875rem 0.875rem;
    position: relative;
    overflow: hidden;
    .task-li-t {
      position: relative;
      overflow: hidden;
      .task-t-icon {
        display: block;
        width: 1.625rem;
        height: auto;
        float: left;
      }
      .task-t-div {
        position: relative;
        float: left;
        left: .5625rem;
        top: -0.0625rem;
        .task-t-name {
          font-size: 1.125rem;
          font-family: Source Han Sans SC;
          font-weight: 500;
          color: rgba(0,0,0,1);
          line-height: 0;
          img {
            height: 1.0625rem;
            width: 1.8125rem;
            position: relative;
            left: .3125rem;
            top: .1875rem;
          }
        }
        .task-t-note {
          position: relative;
          top: 0.375rem;
          font-size: 1rem;
          font-family: Source Han Sans SC;
          font-weight: 400;
          color: rgba(108,108,108,1);
        }
        .task-t-currency {
          position: relative;
          top: .375rem;
          line-height: 1.375rem;
          img {
            width: 1.3125rem;
            height: auto;
          }
          span {
            font-size: .875rem;
            font-family: Source Han Sans SC;
            font-weight: 500;
            color: rgba(255,189,5,1);
            position: relative;
            left: .1875rem;
          }
        }
      }
      .right-bttn {
        position: absolute;
        right: 0;
        clear: both;
        font-size: 1.0625rem;
        font-family: Source Han Sans SC;
        font-weight: 400;
        color: rgba(0,0,0,1);
        .bttn-span {
          width: 5.1875rem;
          height: 1.9375rem;
          line-height: 1.9375rem;
          background: linear-gradient(113deg,rgba(248,242,229,1) 0%,rgba(243,225,189,1) 100%);
          border-radius: 1rem;
          display: inline-block;
          text-align: center;
        }
      }
    }
    .task-li-content {
      position: relative;
      margin-top: .875rem;
      .task-comp-img {
        width: 8rem;
        height: 1.625rem;
      }
      .task-li-line {
        font-size: 1.0625rem;
        font-family: Source Han Sans SC;
        font-weight: 400;
        color: rgba(0,0,0,1);
        line-height: 1.5625rem;
      }
    }
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      background: #dddddd;
      width: 100%;
      height: .0625rem;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
    }
  }
}

</style>
