<template>
  <div id="taskIndex" class="wapperTask">
    <div class="wapperTaskGuide" :class="{guideBg:showGuide}">
      <div v-if="showGuide === 1 || showGuide === 2" class="task-guide" :style="{top:guideObj.guidePosition.top,bottom:guideObj.guidePosition.bottom}">
        <div class="guide-jian" :class="{guideJian1:showGuide === 1,guideJian2:showGuide === 2}">
          <img v-if="showGuide === 1" src="../../assets/images/task/task_jian_l2.png" />
          <img v-if="showGuide === 2" src="../../assets/images/task/task_jian_r2.png" />
        </div>
        <div class="guide-text" :class="{guideText1:showGuide === 1,guideText2:showGuide === 2}"><span v-html="guideObj.text"></span><img src="../../assets/images/task/task_hudie.png" /></div>
        <img v-if="showGuide === 2" class="guide-jt-2" src="../../assets/images/task/task_jian_l2.png" />
        <div v-if="showGuide === 2" class="guide-text guide-text2"><span v-html="guideObj.text2"></span><img src="../../assets/images/task/task_hudie.png" /></div>
        <div class="guide-bttn" @click="guideTo(showGuide+1)" :style="{bottom:guideObj.guidePosition.bottom,marginTop:guideObj.guidePosition.marginTop}">
          <img src="../../assets/images/task/task_know.png" />
        </div>
      </div>
    </div>
    <!-- <div v-if="showGuide" class="guideBg"></div> -->
    <van-skeleton title avatar :row="2" avatar-shape="square" :loading="loadingFlag1">
      <div class="task-main">
        <div class="task-title">
          <span ref="zsGuide" :class="{guideQuan:showGuide === 3}">专属任务</span>
          <div v-if="showGuide === 3" class="task-guide">
            <img class="guide-four-jt" src="../../assets/images/task/task_jian_r1.png" />
            <div class="guide-text"><span v-html="guideObj.text"></span><img src="../../assets/images/task/task_hudie.png" /></div>
            <div class="guide-bttn" @click="guideTo(4)"><img src="../../assets/images/task/task_know.png" /></div>
          </div>
        </div>
        <div class="task-li" :class="{guideLi:showGuide}">
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
          </div>
          <div class="right-bttn" ref="guideFour" :class="{guideQuan2:showGuide === 4}" @click="storeInfo()">
            <span class="bttn-span">去接单</span>
          </div>
          <div v-if="showGuide === 4" class="right-bttn-guide" >
            <div class="task-guide task-guide-four">
              <img class="guide-four-jt" src="../../assets/images/task/task_jian_l1.png" />
              <div class="guide-text"><span v-html="guideObj.text"></span><img src="../../assets/images/task/task_hudie.png" /></div>
              <div class="guide-bttn" @click="guideTo('')"><img src="../../assets/images/task/task_know.png" /></div>
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
      <div v-if="newTask === 1" ref="newComer" class="task-main">
        <div class="task-title">新手任务</div>
        <div class="task-li" :class="{guideLi:showGuide}">
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
          </div>
          <div class="right-bttn" :class="{guideQuan2:showGuide === 5}">
            <span class="bttn-span" @click="getCurrency('10')">领取元宝</span>
          </div>
          <div v-if="showGuide === 5" class="right-bttn-guide" >
            <div class="task-guide task-guide-four">
              <img class="guide-four-jt" src="../../assets/images/task/task_jian_l1.png" />
              <div class="guide-text"><span v-html="guideObj.text"></span><img src="../../assets/images/task/task_hudie.png" /></div>
              <div class="guide-bttn" @click="guideTo('')"><img src="../../assets/images/task/task_know.png" /></div>
            </div>
          </div>
        </div>
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
          </div>
          <div class="right-bttn">
            <span class="bttn-span" @click="getCurrency('10')">领取元宝</span>
          </div>
        </div>
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
          </div>
          <div class="right-bttn">
            <span class="bttn-span" @click="getCurrency('10')">领取元宝</span>
          </div>
        </div>
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
          </div>
          <div class="right-bttn">
            <span class="bttn-span" @click="getCurrency('10')">领取元宝</span>
          </div>
        </div>
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
          </div>
          <div class="right-bttn">
            <span class="bttn-span" @click="getCurrency('10')">领取元宝</span>
          </div>
        </div>
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
          </div>
          <div class="right-bttn">
            <span class="bttn-span" @click="getCurrency('10')">领取元宝</span>
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
          </div>
          <div class="right-bttn" @click="getStoreInfo()">
            <span class="bttn-span">取数据</span>
          </div>
        </div>
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
          </div>
          <div class="right-bttn" @click="getStoreInfo()">
            <span class="bttn-span">取数据</span>
          </div>
        </div>
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
          </div>
          <div class="right-bttn" @click="getStoreInfo()">
            <span class="bttn-span">取数据</span>
          </div>
        </div>
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
          </div>
          <div class="right-bttn" @click="getStoreInfo()">
            <span class="bttn-span">取数据</span>
          </div>
        </div>
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
          </div>
          <div class="right-bttn" @click="getStoreInfo()">
            <span class="bttn-span">取数据</span>
          </div>
        </div>
      </div>
    </van-skeleton>
  </div>
</template>
<script>
import Const from "@/assets/js/const" 
import { AppJsBridge, hybappObj } from "@/assets/js/hybApp_api.js";
export default {
    name: "taskIndex",
    data() {
        return {
          loadingFlag1: true,
          loadingFlag2: true,
          loadingFlag3: true,
          showGuide: '',
          clientWid: document.documentElement.clientWidth,
          guideObj: {
            text: '关于任务，你想了解的都在这里，快去看看吧！',
            guidePosition: {
              top: 'initial',
              bottom:'initial',
              left: '0'
            }
          },
          tt: Math.floor(Math.random()*10),
          newTask: 1
        }
    },
    created() {
        document.title = '任务';
        // this.initMedth();
    },
    mounted() {
      setTimeout(() => {
        this.loadingFlag1 = false;
        this.loadingFlag2 = false;
        this.loadingFlag3 = false;
        setTimeout(() => {
          console.log('tt>>',this.tt);
          if(this.tt > 5){
            console.log(this.$refs.newComer.offsetTop);
            document.getElementById('taskIndex').scrollTop = this.$refs.newComer.offsetTop;
            window.scrollTo({
                top: this.$refs.newComer.offsetTop - 46,
                behavior: 'smooth'
            })
          }
          this.showGuide = 1;
          AppJsBridge.guideTask(JSON.stringify({
            navMaskShow: '1',
            navBtnEmpty: '0',
            tabMaskShow: '1',
            taskTabBtnEmpty: '1'
          }));
          this.guideObj.text = '好运宝全新改版！<br/>这里是任务板块，你可以通过完成不同任务 来获取元宝奖励，元宝可用来兑换物品哦~';
          this.guideObj.guidePosition.top = 'initial';
          this.guideObj.guidePosition.bottom = '0rem';
        }, 100)
        this.getStoreInfo();
        // 回调获取客户端返回的任务成功信息,taskType：1.专属任务 2.新手任务 3.每日任务
        window['AppJSApi_BackH5TaskOrdersInfo'] = (_json) => {
            console.log("客户端返回的任务成功信息>>",JSON.parse(_json));
        }
        // 回调获取客户端返回的任务Tab点击通知
        window['AppJSApi_BackH5TaskTabClick'] = (_json) => {
            console.log("客户端返回的任务Tab点击通知>>",_json);
        }
      }, 1000)

    },
    methods:{
      GoDaily(){
        //  this.$router.push({ path: '/task/dailyTask' })
         window.location.href=`${Const.APP_RUL}hyb_task_h5/dist/index.html#/task/dailyTask?&NEW_WVW_HYB&t=${new Date().getTime()}`;
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
      storeInfo(){
        var json_str = JSON.stringify({
          type: '1',
          key: 'TASK_GUIDE_KEY',
          data: '1'
        })
        if(typeof(AndroidAppCommonJs)!=='undefined'){
          AndroidAppCommonJs.manageH5Data(json_str)
        }else if(typeof(window.webkit) !== 'undefined'){
          window.webkit.messageHandlers.manageH5Data.postMessage(json_str);
        }
      },
      getStoreInfo(){
        var json_str = JSON.stringify({
          type: '2',
          key: 'TASK_GUIDE_KEY',
          data: ''
        })
        if(typeof(AndroidAppCommonJs)!=='undefined'){
          AndroidAppCommonJs.manageH5Data(json_str)
        }else if(typeof(window.webkit) !== 'undefined'){
          window.webkit.messageHandlers.manageH5Data.postMessage(json_str);
        }
        setTimeout(() => {
          // 回调获取客户端返回的H5存储的数据
          window['AppJSApi_BackH5Data'] = (_json) => {
              alert(_json);
              console.log("客户端返回的H5存储的数据>>",_json);
          }
        }, 80)
      },
      getCurrency(num){
        var json_str = JSON.stringify({
          addCount: num,
          taskId:'1001'
        })
        if(typeof(AndroidAppCommonJs)!=='undefined'){
          AndroidAppCommonJs.openIngotsReceiveDlg(json_str)
        }else if(typeof(window.webkit) !== 'undefined'){
          window.webkit.messageHandlers.openIngotsReceiveDlg.postMessage(json_str);
        }
        setTimeout(() => {
          this.newTask = 0;
        }, 1800)
      },
      guideTo(num){
        if(num === 3 && this.tt > 3){
          num = 5;
        }
        this.showGuide = num > 5 ? '' : num;
        if(num === 2){
          AppJsBridge.guideTask(JSON.stringify({
            navMaskShow: '1',
            navBtnEmpty: '1',
            tabMaskShow: '1',
            taskTabBtnEmpty: '0'
          }));
          this.guideObj.text = '完成任务领取的元宝在这里~';
          this.guideObj.text2 = '这里是元宝商城，想了解元宝可以用来做什么，进来看看就知道啦~ ';
          this.guideObj.guidePosition.top = '0';
          this.guideObj.guidePosition.marginTop = '1.5rem';
          this.guideObj.guidePosition.bottom = 'initial';
        }else if(num === 3 || num === 4 || num === 5){
          AppJsBridge.guideTask(JSON.stringify({
            navMaskShow: '1',
            navBtnEmpty: '0',
            tabMaskShow: '1',
            taskTabBtnEmpty: '0'
          }));
          this.guideObj.text = num === 3 ? '这里是发货方派发的一些任务<br/>例如接单、传回单等，需要您及时完成哦~' : '关于任务，你想了解的都在这里，快去看看吧';
        }else if(num > 5 || num === ''){
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
  z-index: 9990;
  width: 100%;
  top: 3rem;
  left: 0;
  .guide-jt-2{
    position: absolute;
    right: 1.5rem;
    top: 1rem;
    width: 3.5rem;
    height: auto;
  }
  .guide-jian {
    position: relative;
    top: 0;
    left: 5.9375rem;
    display: inline-block;
    img {
      width: 2.5rem;
      height: auto;
    }
  }
  .guideJian1 {
    left: 2.75rem;
    bottom: 0.5rem;
    top: initial;
    position: absolute;
  }
  .guideJian2 {
    top: 0;
    left: 3rem;
    display: block;
    img {
      width: 1.375rem;
    }
  }
  .guide-four-jt{
    position: relative;
    display: block;
    top: 0;
    left: 5.9375rem;
    width: 2.5rem;
    height: 2.525rem;
    z-index: 9990;
  }
  .guide-text {
    position: relative;
    left: 7%;
    width: 84%;
    border: .0785rem dashed rgba(255,255,255,1);
    border-radius: .625rem;
    color: rgba(255,255,255,1);
    line-height: 1.375rem;
    font-size: 1rem;
    font-family: Source Han Sans CN;
    font-weight: 500;
    padding: 0.5rem 0.125rem 0.5rem 0.375rem;
    margin-top: .5rem;
    img {
      position: absolute;
      width: 1.25rem;
      height: auto;
      top: -0.5625rem;
      right: -0.6875rem;
    }
  }
  .guide-text2{
    margin-top: 1rem;
    padding: 0.75rem 0.25rem 0.75rem 0.5rem;
  }
  .guideText1{
    bottom: 4.5rem;
    text-align: center;
  }
  .guideText2{
    left: 1.75rem;
    top: -0.25rem;
    margin-top: 0;
    width: initial;
    display: inline-block;
    padding: 1rem 0.525rem 1rem 0.5rem;
  }
  .guide-bttn {
    position: absolute;
    bottom: -5.875rem;
    right: 8%;
    img {
      width: 5.125rem;
      height: auto;
    }
  }
}
.task-guide-four{
  top: 3.5rem;
  left: 0;
  .guide-four-jt {
    position: absolute;
    top: 0;
    right: 6.25rem;
    left: initial;
  }
  .guide-text {
    top: 2.25rem;
    margin-top: 0.5rem;
  }
  .guide-bttn {
    bottom: -6.875rem;
  }
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
    }
    .right-bttn {
      position: absolute;
      right: .875rem;
      top: 1.425rem;
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
    .guideQuan2{
      background-color: #fff;
      border-radius: 60%;
      z-index: 9990;
      padding: 0.6875rem;
      right: .225rem;
      top: 0.6rem;
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
  .guideLi{
    overflow: initial;
  }
  .guideQuan {
    background-color: #fff;
    border-radius: 60%;
    position: relative;
    top: 0;
    left: -0.6125rem;
    z-index: 9990;
    padding: .6875rem;
  }
}

</style>
