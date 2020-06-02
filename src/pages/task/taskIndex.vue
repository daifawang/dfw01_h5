<template>
  <div id="taskIndex" class="wapperTask">
    <div class="wapperTaskGuide" :class="{guideBg:showGuide}" @touchmove.prevent>
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
    <van-skeleton title avatar :row="2" avatar-shape="square" :loading="loadingFlag1">
      <transition name="taskFade">
      <div v-show="show_exclusiveList" class="task-main">
        <div class="task-title">
          <span ref="zsGuide" :class="{guideQuan:showGuide === 3}">专属任务</span>
          <div v-if="showGuide === 3" class="task-guide">
            <img class="guide-four-jt" src="../../assets/images/task/task_jian_r1.png" />
            <div class="guide-text"><span v-html="guideObj.text"></span><img src="../../assets/images/task/task_hudie.png" /></div>
            <div class="guide-bttn" @click="guideTo(4)"><img src="../../assets/images/task/task_know.png" /></div>
          </div>
        </div>
        <transition-group appear name="taskList" tag="div">
          <div v-for="(item, index) in exclusiveList" :key="item.taskId" class="task-li">
            <div class="task-li-t">
              <img class="task-t-icon" :src="item.taskHeadImgUrl" />
              <div class="task-t-div">
                <div class="task-t-name">
                  <span>{{ item.taskName }}</span><img v-for="(item1, index1) in item.miniTagList" :key="index1" :src="item1.tagImgUrl" />
                </div>
                <div v-if="item.taskNote" class="task-t-note">完善证件信息后可结算运费</div>
                <div class="task-t-currency">
                  <img src="../../assets/images/task/xiaoyuanbao@2x.png" /><span>+{{ item.reawrdNum }}</span>
                </div>
              </div>
            </div>
            <div class="clear-float"></div>
            <div v-if="item.taskType === '1'" class="task-li-content">
              <img class="task-comp-img" src="../../assets/images/task/dingyi@2x.png" />
              <div class="task-li-line">{{ item.showScriptOne }}</div>
              <div class="task-li-line">{{ item.showScriptTwo }}</div>
              <div class="task-li-line">{{ item.showScriptThree }}</div>
            </div>
            <div v-else-if="item.taskType === '2' && item.inviteInfo" class="task-li-invitecard">
              <img class="task-invitecard-img" src="../../assets/images/task/task_invite_bg.png" />
              <div class="task-invitecard-name">
                <img class="task-invitecard-headimg" :src="item.inviteInfo.inviteUserImg" />
                <span>{{ item.inviteInfo.inviteUserName }}给您发了一份邀请...</span>
              </div>
              <div class="task-invitecard-bttn">立即查看</div>
              <div class="task-invitecard-company">{{ item.inviteInfo.inviteCompany }}</div>
            </div>
            <div v-else-if="item.taskType === '3' && item.businessInfo" class="task-li-business">
              <img class="task-business-img" :src="item.businessInfo.businessUserImg" />
              <div class="task-business-right">
                <div class="business-name">
                  <span>{{ item.businessInfo.businessUserName }}</span><img :src="item.businessInfo.businessLevel" />
                </div>
                <div class="business-company">{{ item.businessInfo.businessCompany }}</div>
                <div class="business-note-li"><div v-for="(business, b) in item.businessInfo.businessNoteList" :key="b" class="business-note">{{ business }}</div></div>
              </div>
              <div class="clear-float"></div>
            </div>
            <div v-else-if="item.taskType === '4' && item.ykInfo" class="task-li-oilcard">
              <img class="task-oilcard-img" src="../../assets/images/task/task_oilcard_bg.png" />
              <div class="task-oilcard-last">余额：￥{{ item.ykInfo.lastCount }}</div>
              <div class="task-oilcard-add">最新到账{{ item.ykInfo.onAddCount }}元</div>
            </div>
            <div v-if="item.status === '2' && showFirstGetCury" @click="closeTip()" class="sj-tag">快去领元宝吧 ×</div>
            <div class="right-bttn" ref="guideFour" :class="{guideQuan2:showGuide === 4 && index === 0}">
              <span v-if="item.status === '0' || item.status === '1'" class="bttn-span" @click="goTaskUrl(item.jumpUrl)">{{ item.taskAction }}</span>
              <span v-else-if="item.status === '2'" class="bttn-span bttn-success" @click="getCurrency('1',index,'10')">领取元宝</span>
            </div>
            <div v-if="showGuide === 4 && index === 0" class="right-bttn-guide" >
              <div class="task-guide task-guide-four">
                <img class="guide-four-jt" src="../../assets/images/task/task_jian_l1.png" />
                <div class="guide-text"><span v-html="guideObj.text"></span><img src="../../assets/images/task/task_hudie.png" /></div>
                <div class="guide-bttn" @click="guideTo('')"><img src="../../assets/images/task/task_know.png" /></div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
      </transition>
    </van-skeleton>
    <van-skeleton title avatar :row="3" avatar-shape="square" :loading="loadingFlag2">
      <div v-if="newTask === 1" ref="newComer" class="task-main">
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
        <!-- <div class="task-li">
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
        </div> -->
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
      </div>
    </van-skeleton>
    <div style="height:1.5rem;"></div>
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
          showGuide: '', //是否显示引导页
          showFirstGetCury: false, //是否有领取过元宝
          clientWid: document.documentElement.clientWidth,
          show_exclusiveList: true,
          guideObj: {
            text: '关于任务，你想了解的都在这里，快去看看吧！',
            guidePosition: {
              top: 'initial',
              bottom:'initial',
              left: '0'
            }
          },
          exclusiveList:[ //专属任务列表
            {
              taskId: '11',taskHeadImgUrl: 'https://live-ol.log56.com/sq_server_manage/shq/20200430/478c7ae1-945f-423d-8013-9558c30e3a85.jpg',taskName: '完成接单',
              miniTagList: [
                {tagImgUrl: 'http://kydd.log56.com/sq_server/mobile/home_page/img/icon_new.png'}
              ],
              taskType: '1',taskAction: '去接单',status: '1',jumpUrl: '',reawrdNum: '6',
              showScriptOne: '北京昌平区⇀上海浦东',showScriptTwo: '普货【20吨】',showScriptThree: '1800元【到付】'
            },
            {
              taskId: '12',taskHeadImgUrl: 'http://kydd.log56.com/sq_server/mobile/home_page/img/icon_hz.png',taskName: '货到了，我要运费',
              miniTagList: [
                {tagImgUrl: 'http://kydd.log56.com/sq_server/mobile/home_page/img/icon_new.png'}
              ],
              taskType: '1',taskAction: '去传回单',status: '2',jumpUrl: '',reawrdNum: '10',
              showScriptOne: '北京昌平区2⇀上海浦东区1',showScriptTwo: '普货【20吨】',showScriptThree: '1400元【到付】'
            },
            {
              taskId: '19',taskHeadImgUrl: 'https://live-ol.log56.com/sq_server_manage/shq/20200430/478c7ae1-945f-423d-8013-9558c30e3a85.jpg',taskName: '绑卡收运费',
              taskNote: '完善证件信息后可结算运费',miniTagList: [],
              taskType: '5',taskAction: '去绑卡',status: '0',jumpUrl: '',reawrdNum: '5'
            },
            {
              taskId: '13',taskHeadImgUrl: 'http://kydd.log56.com/sq_server/mobile/home_page/img/icon_hz.png',taskName: '升级直属运力',
              miniTagList: [
                {tagImgUrl: 'http://kydd.log56.com/sq_server/mobile/home_page/img/icon_new.png'}
              ],
              taskType: '2',taskAction: '立即查看',status: '0',jumpUrl: '',reawrdNum: '8',
              inviteInfo: {inviteUserImg: 'https://live-ol-cdn.log56.com/nsq/header/20191231/788713f0-303e-4d07-9c82-8cdb90909db7.jpg',inviteUserName: '李大全',inviteCompany: '招商成都物流分公司'}
            },
            {
              taskId: '14',taskHeadImgUrl: 'https://live-ol.log56.com/sq_server_manage/shq/20200430/478c7ae1-945f-423d-8013-9558c30e3a85.jpg',taskName: '发展生意人脉',
              miniTagList: [
                {tagImgUrl: 'http://kydd.log56.com/sq_server/mobile/home_page/img/icon_new.png'}
              ],
              taskType: '3',taskAction: '去发展',status: '0',jumpUrl: '',reawrdNum: '5',
              businessInfo: {
                businessUserImg: 'https://live-ol-cdn.log56.com/nsq/header/20191231/788713f0-303e-4d07-9c82-8cdb90909db7.jpg',businessUserName: '王大全',businessCompany: '招商成都物流分公司',
                businessLevel: 'http://kydd.log56.com/sq_server/images/guidance_bg.png',businessNoteList: ['合作过：1单/10,000元','1个共同人脉']
              }
            },
            {
              taskId: '15',taskHeadImgUrl: 'http://kydd.log56.com/sq_server/mobile/home_page/img/icon_hz.png',taskName: '使用电子油卡',
              miniTagList: [
                {tagImgUrl: 'http://kydd.log56.com/sq_server/mobile/home_page/img/icon_new.png'}
              ],
              taskType: '4',taskAction: '去使用',status: '0',jumpUrl: '',reawrdNum: '5',
              ykInfo: {onAddCount: '2600',lastCount: '6100'}
            }
          ],
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
        AppJsBridge.getStoreInfo('TASK_GUIDE_KEY');
        AppJsBridge.getStoreInfo('TASK_GETCURY_KEY');
        this.loadingFlag1 = this.exclusiveList.length > 0 ? false : true;
        this.loadingFlag2 = false;
        this.loadingFlag3 = false;
        this.getStoreInfoBack();
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
        window.location.href=`${Const.APP_RUL}hyb_task_h5/dist/index.html?t=${new Date().getTime()}/#/task/dailyTask?&NEW_WVW_HYB`;
      },
      initMedth(){
        var _data={
          'source':'0',
          'channel':'1'
        }
        AppJsBridge.initSignData(_data,'954000',function(param){
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
        });
      },
      getStoreInfoBack(){
        // 回调获取客户端返回的H5存储的数据
        window['AppJSApi_BackH5Data'] = (_json) => {
          console.log("客户端返回的H5存储的数据>>",JSON.parse(_json));
          var _data = JSON.parse(_json);
          if(_data.key === 'TASK_GUIDE_KEY'){
            if(_data.data === ''){
              this.showGuide = 1;
              console.log('tt>>',this.tt);
              if(this.tt > 2){
                console.log(this.$refs.newComer.offsetTop);
                window.scrollTo(0,this.$refs.newComer.offsetTop);
              }
              AppJsBridge.guideTask(JSON.stringify({
                navMaskShow: '1',
                navBtnEmpty: '0',
                tabMaskShow: '1',
                taskTabBtnEmpty: '1'
              }));
              this.guideObj.text = '好运宝全新改版！<br/>这里是任务板块，你可以通过完成不同任务 来获取元宝奖励，元宝可用来兑换物品哦~';
              this.guideObj.guidePosition.top = 'initial';
              this.guideObj.guidePosition.bottom = '0rem';
            }
          }else if(_data.key === 'TASK_GETCURY_KEY'){
            this.showFirstGetCury = _data.data === '1' ? false : true;
          }
        }
      },
      getCurrency(type,index,num){
        if(this.showGuide && this.showGuide >0){
          return;
        }
        var json_str = JSON.stringify({
          addCount: num,
          taskId:'1001'
        })
        if(typeof(AndroidAppCommonJs)!=='undefined'){
          AndroidAppCommonJs.openIngotsReceiveDlg(json_str)
        }else if(typeof(window.webkit) !== 'undefined'){
          window.webkit.messageHandlers.openIngotsReceiveDlg.postMessage(json_str);
        }
        console.log(index);
        setTimeout(() => {
          if(type === '1'){
            this.closeTip();
            this.exclusiveList.splice(index, 1);
            if(this.exclusiveList.length === 1){
              this.show_exclusiveList = false;
            }
          }
        }, 4000)
      },
      closeTip(){
        this.showFirstGetCury = false;
        AppJsBridge.storeInfo('TASK_GETCURY_KEY','1');
      },
      goTaskUrl(jump_url){
        this.$toast({
          position: 'top',
          message: jump_url,
          duration: 1500
        });
      },
      guideTo(num){
        if(num === 3 && this.tt > 2){
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
          AppJsBridge.storeInfo('TASK_GUIDE_KEY','1');
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
  min-height: 100vh;
  background-color: #E8E8E8;
  overflow: scroll;
}
.wapperTask .van-skeleton {
    margin-top: 1.85rem;
}
.clear-float{
  clear: both;
}
.taskFade-enter-active {
  transition: all .3s ease;
}
.taskFade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.taskFade-enter, .taskFade-leave-to {
  transform: translateX(-1.25rem);
  opacity: 0;
}
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
    right: 1.75rem;
    top: 1rem;
    width: 3.5rem;
    height: auto;
    transform: rotate(-10deg);
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
    font-weight: 600;
    color: rgba(0,0,0,1);
  }
  .task-li {
    padding: 1.1875rem 0.875rem 1.1875rem 0;
    margin-left: 0.875rem;
    position: relative;
    border-bottom: .0625rem solid #E8E8E8;
    transition: all 1s;
    .task-li-t {
      position: relative;
      .task-t-icon {
        display: block;
        width: 1.625rem;
        height: 1.625rem;
        border-radius:.25rem;
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
          font-weight: 600;
          color: rgba(0,0,0,1);
          line-height: 1.25rem;
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
          top: 0.15rem;
          font-size: 1rem;
          font-family: Source Han Sans SC;
          font-weight: 400;
          color: rgba(108,108,108,1);
          line-height: 1.625rem;
        }
        .task-t-currency {
          position: relative;
          top: .325rem;
          line-height: 1.25rem;
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
    .sj-tag{
      width: 8.375rem;
      height: 1.625rem;
      line-height: 1.5625rem;
      position: absolute;
      right: 0.875rem;
      top: -0.85rem;
      clear: both;
      background-color: #F4E3C0;
      border-radius: .8125rem;
      text-align: center;
      font-size: 1rem;
      font-family: Source Han Sans SC;
      font-weight: 400;
      color: rgba(1,1,1,1);
      &:before,&:after{
        content: "";
        display: block;
        border-width: .8125rem;
        border-left-width: .375rem;
        border-right-width: .375rem;
        position: absolute;
        bottom: -1.4375rem;
        left: 6.1875rem;
        border-style: solid dashed dashed;
        border-color: #F4E3C0 transparent transparent;
        font-size: 0;
        line-height: 0;
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
      .bttn-success {
        background: linear-gradient(90deg,rgba(255,94,23,1),rgba(254,52,45,1));
        box-shadow: 0rem .3125rem .625rem 0rem rgba(255,52,47,0.3);
        color: #fff;
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
    .task-li-oilcard,.task-li-invitecard{
      position: relative;
      width: 100%;
      overflow: hidden;
      margin-top: 1.1875rem;
      height: 7.1875rem;
      img {
        position: relative;
        width: 100%;
        height: 7.1875rem;
      }
      .task-oilcard-last{
        position: absolute;
        top: 2.825rem;
        left: .9375rem;
        font-size: 1.25rem;
        font-family: Source Han Sans SC;
        font-weight: bold;
        color: rgba(255,255,255,1);
      }
      .task-oilcard-add{
        position: absolute;
        bottom: .5625rem;
        left: 0;
        padding: 0 .9375rem;
        font-size: 1rem;
        font-family: Source Han Sans SC;
        font-weight: 500;
        color: rgba(255,255,255,1);
        // width: 7.8125rem;
        height: 1.4375rem;
        line-height: 1.5rem;
        background: rgba(247,79,40,1);
        border-radius: 0 .6875rem .6875rem 0;
      }
    }
    .task-li-invitecard {
      height: 9.75rem;
      img {
        height: 9.75rem;
      }
      .task-invitecard-name {
        position: absolute;
        top: 1.1875rem;
        left: 2.1375rem;
        font-size: 1.0625rem;
        font-family: Source Han Sans SC;
        font-weight: 500;
        color: rgba(169,49,58,1);
        height: 2.25rem;
        line-height: 2.25rem;
        img {
          width: 2.25rem;
          height: 2.25rem;
          border-radius: .3125rem;
          float: left;
        }
        span {
          line-height: 2rem;
          display: block;
          position: relative;
          height: 2.25rem;
          float: left;
          left: 1rem;
          border-bottom: .0625rem solid #AA3539;
        }
      }
      .task-invitecard-bttn {
        position: absolute;
        left: 50%;
        margin-left: -4.1875rem;
        bottom: 3.375rem;
        clear: both;
        width: 7.765rem;
        height: 1.8125rem;
        line-height: 1.75rem;
        background: rgba(170,53,57,1);
        border-radius: .875rem;
        font-size: 1.0625rem;
        font-family: Source Han Sans SC;
        font-weight: 500;
        color: rgba(255,255,255,1);
        text-align: center;
      }
      .task-invitecard-company {
        position: absolute;
        right: 0.75rem;
        bottom: 1.875rem;
        clear: both;
        height: 1.3rem;
        line-height: 1.285rem;
        transform: rotate(-15deg);
        font-size: .6875rem;
        color: #A93539;
        padding: 0 0.225rem;
        border: 0.0765rem solid #A93539;
        box-shadow: 0 0 0 0.0625rem #e2bcbc, 0 0 0 0.1rem #A93539;
      }
    }
    .task-li-business {
      position: relative;
      width: 100%;
      overflow: hidden;
      margin-top: 1.1875rem;
      .task-business-img {
        display: block;
        float: left;
        width: 2.25rem;
        height: 2.25rem;
        border-radius: .3125rem;
      }
      .task-business-right {
        position: relative;
        float: left;
        left: 0.5625rem;
        top: -0.25rem;
        .business-name {
          font-size: 1rem;
          font-family: Source Han Sans SC;
          font-weight: 400;
          color: rgba(0,0,0,1);
          img {
            width: 2.5rem;
            height: 1.125rem;
            position: relative;
            left: 0.3125rem;
            top: 0.1875rem;
          }
        }
        .business-company {
          font-size: .9375rem;
          font-family: Source Han Sans SC;
          font-weight: 400;
          color: rgba(107,107,107,1);
          line-height: 1.5625rem;
          margin-bottom: .25rem;
        }
        .business-note-li{
          .business-note {
            font-size: .8125rem;
            font-family: Source Han Sans SC;
            font-weight: 500;
            color: rgba(205,161,103,1);
            height: 1.125rem;
            line-height: 1.0625rem;
            background: rgba(255,255,255,1);
            border: .0625rem solid rgba(205,161,103,1);
            border-radius: .5rem;
            display: table;
            position: relative;
            padding: 0 .3125rem;
            &:nth-child(n+2){
              margin-top: .5rem;
            }
          }
        }
      }
    }
    // &:after {
    //   content: "";
    //   position: absolute;
    //   bottom: 0;
    //   background: #E8E8E8;
    //   width: 100%;
    //   height: .0625rem;
    //   -webkit-transform: scaleY(0.5);
    //   transform: scaleY(0.5);
    //   -webkit-transform-origin: 0 0;
    //   transform-origin: 0 0;
    // }
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
