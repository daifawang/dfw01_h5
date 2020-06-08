<template>
  <div id="taskIndex" class="wapperTask">
    <loading v-show="loadingFlag"></loading>
    <div v-show="!loadingFlag" class="task-show-wrapper">
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
      <transition name="taskFade">
      <div v-show="showExclusiveList" class="task-main">
        <div class="task-title">
          <span ref="zsGuide" :class="{guideQuan:showGuide === 3}">专属任务</span>
          <div v-if="showGuide === 3" class="task-guide">
            <img class="guide-four-jt" src="../../assets/images/task/task_jian_r1.png" />
            <div class="guide-text"><span v-html="guideObj.text"></span><img src="../../assets/images/task/task_hudie.png" /></div>
            <div class="guide-bttn" @click.stop="guideTo(4)"><img src="../../assets/images/task/task_know.png" /></div>
          </div>
        </div>
        <div class="task-wrapper" v-if="exclusiveList && exclusiveList.length>0">
          <transition-group appear name="taskList" tag="div">
            <div v-for="(item, index) in exclusiveList" :key="item.taskId" class="task-li" @click.stop="clickUrl(index,item.status,item.jumpUrl)">
              <div class="task-li-t">
                <img class="task-t-icon" :src="item.taskHeadImgUrl" />
                <div class="task-t-div">
                  <div class="task-t-name">
                    <span>{{ item.taskName }}</span><img v-for="(item1, index1) in item.miniTagList" :key="index1" :src="item1" />
                  </div>
                  <div v-if="item.taskNote" class="task-t-note">完善证件信息后可结算运费</div>
                  <div class="task-t-currency">
                    <img src="../../assets/images/task/xiaoyuanbao@2x.png" /><span>+{{ item.rewardNum }}</span>
                  </div>
                </div>
              </div>
              <div class="clear-float"></div>
              <div v-if="item.taskType === '1' && item.extra" class="task-li-content">
                <img class="task-comp-img" :src="item.extra.companyImgUrl" />
                <div class="task-li-line">{{ item.extra.showScriptOne }}</div>
                <div class="task-li-line">{{ item.extra.showScriptTwo }}</div>
                <div class="task-li-line">{{ item.extra.showScriptThree }}</div>
              </div>
              <div v-else-if="item.taskType === '2' && item.extra" class="task-li-invitecard">
                <img class="task-invitecard-img" src="../../assets/images/task/task_invite_bg.png" />
                <div class="task-invitecard-name">
                  <img class="task-invitecard-headimg" :src="item.extra.inviteUserImg" />
                  <span>{{ item.extra.inviteUserName }}给您发了一份邀请...</span>
                </div>
                <div class="task-invitecard-bttn" @click.stop="clickUrl(index,item.status,item.jumpUrl)">立即查看</div>
                <div class="task-invitecard-company">{{ item.extra.inviteCompany }}</div>
              </div>
              <div v-else-if="item.taskType === '3' && item.extra" class="task-li-business">
                <img class="task-business-img" :src="item.extra.businessUserImg" />
                <div class="task-business-right">
                  <div class="business-name">
                    <span>{{ item.extra.businessUserName }}</span><img :src="item.extra.businessLevel" />
                  </div>
                  <div class="business-company">{{ item.extra.businessCompany }}</div>
                  <div class="business-note-li"><div v-for="(business, b) in item.extra.businessNoteList" :key="b" class="business-note">{{ business }}</div></div>
                </div>
                <div class="clear-float"></div>
              </div>
              <div v-else-if="item.taskType === '4' && item.extra" class="task-li-oilcard">
                <img class="task-oilcard-img" src="../../assets/images/task/task_oilcard_bg.png" />
                <div class="task-oilcard-last">余额：￥{{ item.extra.lastCount }}</div>
                <div class="task-oilcard-add">最新到账{{ item.extra.onAddCount }}元</div>
              </div>
              <div v-if="item.status === '2' && showFirstGetCury" @click.stop="closeTip()" class="sj-tag">快去领元宝吧 ×</div>
              <div class="right-bttn" :class="{guideQuan2:showGuide === 4 && index === 0}">
                <span v-if="item.status === '0' || item.status === '1'" class="bttn-span" @click.stop="clickRightBttn('1',index)">{{ item.taskAction }}</span>
                <span v-else-if="item.status === '2'" class="bttn-span bttn-success" @click.stop="clickRightBttn('1',index)">领取元宝</span>
              </div>
              <div v-if="item.viewCount" class="task-btn-view">
                <div>{{item.viewCount}}</div>
              </div>
              <div v-if="showGuide === 4 && index === 0" class="right-bttn-guide" >
                <div class="task-guide task-guide-four">
                  <img class="guide-four-jt" src="../../assets/images/task/task_jian_l1.png" />
                  <div class="guide-text"><span v-html="guideObj.text"></span><img src="../../assets/images/task/task_hudie.png" /></div>
                  <div class="guide-bttn" @click.stop="guideTo('')"><img src="../../assets/images/task/task_know.png" /></div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
        <div class="task-wrapper task-server-failed" v-else-if="exclusiveFlag === '0'">
          <van-loading type="spinner" size="24px">专属任务正在全力加载中...</van-loading>
        </div>
        <div class="task-wrapper task-server-failed" v-else-if="exclusiveFlag === '1'">
          <van-loading type="spinner" size="24px">获取专属任务失败，稍后再试试吧~</van-loading>
        </div>
      </div>
      </transition>
      <transition name="taskFade">
      <div v-if="hasNewTask" ref="newComer" class="task-main">
        <div class="tasks-title task-title-new" v-if="newTaskList && newTaskList.length>0">新手任务
          <div @click="goVideoList">
            <img class="task-title-new-icon1" src="../../assets/images/task/xinshou@2x.png"> 新手攻略
            <img class="task-title-new-icon2" src="../../assets/images/task/jiantou_you@2x.png">
          </div>
        </div>
        <div class="task-wrapper" v-if="newTaskList && newTaskList.length>0">
          <transition-group appear name="taskList" tag="div">
          <div class="task-wrapper-div" v-for="(newItem,index) in newTaskList" :key="newItem.taskId" @click.stop="clickUrl(index,newItem.status,newItem.jumpUrl)">
            <div class="task-box">
              <div class="task-icon">
                <img :src="newItem.taskHeadImgUrl">
              </div>
              <div class="tasks-main">
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
                <div v-if="newItem.status === '2' && showFirstGetCury" @click.stop="closeTip()" class="sj-tag">快去领元宝吧 ×</div>
                <div @click.stop="clickRightBttn('2',index)" class="task-btn" :class="{guideQuan2:showGuide === 5 && index === 0}">
                  <div :class="{'to-do':newItem.status=='0' || newItem.status=='1','doing':newItem.status=='2','done':newItem.status=='3',}">{{newItem.taskAction}}</div>
                </div>
                <div v-if="newItem.signCardText" class="task-btn-text">
                  <div>{{newItem.signCardText}}</div>
                </div>
              </div>
              <div v-if="showGuide === 5 && index === 0" class="right-bttn-guide" >
                <div class="task-guide task-guide-four">
                  <img class="guide-four-jt" src="../../assets/images/task/task_jian_l1.png" />
                  <div class="guide-text"><span v-html="guideObj.text"></span><img src="../../assets/images/task/task_hudie.png" /></div>
                  <div class="guide-bttn" @click.stop="guideTo('')"><img src="../../assets/images/task/task_know.png" /></div>
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
                    <div v-if="index==0" class="short-line line short-a" :class="{'active-line':meansSonItem.taskStatus>='1'}"></div>
                    <div v-if="index==1" class="long-line line long-a" :class="{'active-line':meansSonItem.taskStatus>='1'}"></div>
                    <div v-if="index==1" class="long-line line long-b" :class="{'active-line':meansSonItem.taskStatus>='1'}"></div>
                    <div v-if="index==2 && meansSonItem.taskStatus>='1'" class="long-line line long-c" :class="{'active-line':meansSonItem.taskStatus>='1'}"></div>
                    <div v-if="index==2" class="short-line line short-b" :class="{'active-line':meansSonItem.taskStatus>='1'}"></div>
                  </div>
                  <div>{{meansSonItem.taskName}}</div>
                </div>
              </div>
            </div>
          </div>
          </transition-group>
        </div>
        <div class="task-wrapper task-server-failed" v-else-if="newTaskFlag === '0'">
          <van-loading type="spinner" size="24px">新手任务正在全力加载中...</van-loading>
        </div>
        <div class="task-wrapper task-server-failed" v-else-if="newTaskFlag === '1'">
          <van-loading type="spinner" size="24px">获取新手任务失败，稍后再试试吧~</van-loading>
        </div>
      </div>
      </transition>
      <div v-if="hasDailyTask" class="task-main">
        <div class="tasks-title">每日任务</div>
        <div class="task-wrapper" v-if="dailyTaskList && dailyTaskList.length>0">
          <transition-group appear name="taskList" tag="div">
          <div class="task-wrapper-div" v-for="(dailyItem,index) in dailyTaskList" :key="dailyItem.taskId" @click.stop="clickUrl(index,dailyItem.status,dailyItem.jumpUrl)">
            <div class="task-box">
              <div class="task-icon">
                <img :src="dailyItem.headImg">
              </div>
              <div class="tasks-main">
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
                <div v-if="dailyItem.status === '2' && showFirstGetCury" @click.stop="closeTip()" class="sj-tag">快去领元宝吧 ×</div>
                <div @click.stop="clickRightBttn('3',index)" class="task-btn">
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
        <div class="task-wrapper task-server-failed" v-else-if="dailyTaskFlag === '0'">
          <van-loading type="spinner" size="24px">每日任务正在全力加载中...</van-loading>
        </div>
        <div class="task-wrapper task-server-failed" v-else-if="dailyTaskFlag === '1'">
          <van-loading type="spinner" size="24px">获取每日任务失败，稍后再试试吧~</van-loading>
        </div>
      </div>
      <div style="height:1.5rem;"></div>
    </div>
  </div>
</template>
<script>
import Const from "@/assets/js/const" 
import { AppJsBridge, hybappObj } from "@/assets/js/hybApp_api.js";
import loading from "@/components/loading.vue"
export default {
  name: "taskIndex",
  data() {
    return {
      loadingFlag: true,
      showGuideStore: false, //APP本地存储字段-引导页是否展示
      showGuide: '', //本页面是否显示引导页
      guideType: 0, //引导页类型：0.有专属任务的引导；1.无专属任务的引导
      showFirstGetCury: false, //APP本地存储字段-是否展示快去领取元宝提示
      guideObj: {
        text: '关于任务，你想了解的都在这里，快去看看吧！',
        guidePosition: {
          top: 'initial',
          bottom:'initial',
          left: '0'
        }
      },
      exclusiveList1:[ //专属任务列表
        {
          taskId: '11',taskHeadImgUrl: 'https://live-ol.log56.com/sq_server_manage/shq/20200430/478c7ae1-945f-423d-8013-9558c30e3a85.jpg',taskName: '完成接单',
          miniTagList: [
            'http://kydd.log56.com/sq_server/mobile/home_page/img/icon_new.png'
          ],
          taskType: '1',taskAction: '去接单',status: '1',jumpUrl: '',rewardNum: '6',viewCount: '4000人在看',
          extra: {
            companyImgUrl: 'http://kydd.log56.com/sq_server/images/guidance_bg.png',
            showScriptOne: '北京昌平区⇀上海浦东',showScriptTwo: '普货【20吨】',showScriptThree: '1800元【到付】'
          }
        },
        {
          taskId: '12',taskHeadImgUrl: 'http://kydd.log56.com/sq_server/mobile/home_page/img/icon_hz.png',taskName: '货到了，我要运费',
          miniTagList: [
            'http://kydd.log56.com/sq_server/mobile/home_page/img/icon_new.png'
          ],
          taskType: '1',taskAction: '去传回单',status: '2',jumpUrl: '',rewardNum: '10',
          extra: {
            companyImgUrl: 'http://kydd.log56.com/sq_server/images/guidance_bg.png',
            showScriptOne: '北京昌平区2⇀上海浦东1',showScriptTwo: '普货【20吨】',showScriptThree: '1400元【到付】'
          }
        },
        {
          taskId: '19',taskHeadImgUrl: 'https://live-ol.log56.com/sq_server_manage/shq/20200430/478c7ae1-945f-423d-8013-9558c30e3a85.jpg',taskName: '绑卡收运费',
          taskNote: '完善证件信息后可结算运费',miniTagList: [],
          taskType: '5',taskAction: '去绑卡',status: '0',jumpUrl: '',rewardNum: '5',viewCount: '5000人关注',
        },
        {
          taskId: '13',taskHeadImgUrl: 'http://kydd.log56.com/sq_server/mobile/home_page/img/icon_hz.png',taskName: '升级直属运力',
          miniTagList: [
            'http://kydd.log56.com/sq_server/mobile/home_page/img/icon_new.png'
          ],
          taskType: '2',taskAction: '立即查看',status: '0',jumpUrl: '-1',rewardNum: '8',
          extra: {inviteUserImg: 'https://live-ol-cdn.log56.com/nsq/header/20191231/788713f0-303e-4d07-9c82-8cdb90909db7.jpg',inviteUserName: '李大全',inviteCompany: '招商成都物流分公司'}
        },
        {
          taskId: '14',taskHeadImgUrl: 'https://live-ol.log56.com/sq_server_manage/shq/20200430/478c7ae1-945f-423d-8013-9558c30e3a85.jpg',taskName: '发展生意人脉',
          miniTagList: [
            'http://kydd.log56.com/sq_server/mobile/home_page/img/icon_new.png'
          ],
          taskType: '3',taskAction: '去发展',status: '0',jumpUrl: '',rewardNum: '5',
          extra: {
            businessUserImg: 'https://live-ol-cdn.log56.com/nsq/header/20191231/788713f0-303e-4d07-9c82-8cdb90909db7.jpg',businessUserName: '王大全',businessCompany: '招商成都物流分公司',
            businessLevel: 'http://kydd.log56.com/sq_server/images/guidance_bg.png',businessNoteList: ['合作过：1单/10,000元','1个共同人脉']
          }
        },
        {
          taskId: '15',taskHeadImgUrl: 'http://kydd.log56.com/sq_server/mobile/home_page/img/icon_hz.png',taskName: '使用电子油卡',
          miniTagList: [
            'http://kydd.log56.com/sq_server/mobile/home_page/img/icon_new.png'
          ],
          taskType: '4',taskAction: '去使用',status: '0',jumpUrl: '',rewardNum: '5',
          extra: {onAddCount: '2600',lastCount: '6100'}
        }
      ],
      exclusiveList:[ //专属任务列表
      ],
      dailyTaskList:[],//每日任务列表
      newTaskList1:[
        {
          taskNeedSum:'1',
          taskNowSum:'1',
          headImg:require("../../assets/images/task/daka@2x.png"),
          miniTags:[
              "https://test-live-ol-cdn.log56.com/nsq/header/20200401/d6a323f7-1665-4b3d-8370-926ae7b80ece.jpg",
          ],
          status:'2',
          taskId:'111',
          signCardText:'2.5W人已观看',
          note:'一分钟了解打卡',
          taskName:'打卡',
          rewardNum:'50',
          taskAction:'去完成'
        },
        {
          // taskNeedSum:'3',
          // taskNowSum:'1',
          taskId:'112',
          headImg:require("../../assets/images/task/daka@2x.png"),
          status:'0',
          // signCardText:'2.5W人已观看',
          // note:'一分钟了解打卡',
          taskName:'完善个人资料',
          rewardNum:'20',
          taskAction:'去完善',
          meansSonTasks:[
              {taskStatus:0,//0 未完成  1 已完成  2 已领取奖励
              taskName:'个人信息',
              rewardNum:'20'},
                {taskStatus:0,//0 未完成  1 已完成  2 已领取奖励
              taskName:'车辆信息',
              rewardNum:'20'},
                {taskStatus:1,//0 未完成  1 已完成  2 已领取奖励
              taskName:'运输经验',
              rewardNum:'20'},
          ]
        }
      ],//新手任务列表-本地测试用
      newTaskList:[],//新手任务列表
      showExclusiveList: true, //是否有专属任务；判断最后一条专属任务完成时，专属任务栏目整体消失;
      hasNewTask:true, // 是否有新手任务；判断最后一条新手任务完成时，新手任务栏目整体消失;
      hasDailyTask:true, // 是否有每日任务
      exclusiveFlag:'0', //专属列表过渡状态：0在加载提示；1接口获取失败提示
      newTaskFlag:'0', //新手列表过渡状态：0在加载提示；1接口获取失败提示
      dailyTaskFlag:'0' //每日列表过渡状态：0在加载提示；1接口获取失败提示
    }
  },
  components:{
    loading:loading
  },
  created() {
    document.title = '任务';
    //本地模拟数据测试用：----部署时候删除--☆☆☆☆☆☆☆----
    if(process.env.VUE_APP_ENV === 'development'){
      setTimeout(() => {
        this.loadingFlag = false;
        this.exclusiveList = this.exclusiveList1;
        // this.newTaskList = this.newTaskList1;
        this.showFirstGetCury = true;
        // this.exclusiveFlag = '1'
        // this.newTaskFlag = '1';
        // setTimeout(() => {
        //   this.dailyTaskFlag = '1';
        //   this.showGuide = 1;
        //   this.guideType = 0;
        //   this.goGuideApi();
        // }, 1000);
      }, 1000);
    }
    //本地模拟数据测试用：----部署时候删除--☆☆☆☆☆☆☆----
  },
  mounted() {
    // 开启下拉刷新
    AppJsBridge.setClientRefresh('1');
    this.initUserInfo();
    // 初始化专属任务-0
    // this.initExclusiveList('0');
    // setTimeout(() => {
    //   // 初始化每日任务
    //   this.initDailyTaskListData();
    //   // 获取APP本地存储--是否展示快去领取元宝提示
    //   AppJsBridge.getStoreInfo('TASK_GETCURY_KEY',backData => {
    //     console.log('callback-backData>>',backData);
    //     this.showFirstGetCury = backData.data === '1' ? false : true;
    //   });
    // }, 100);

    // 回调获取客户端返回的任务成功信息,taskType：1.专属任务 2.新手任务 3.每日任务---用来刷新哪个任务块
    window['AppJSApi_BackH5TaskOrdersInfo'] = (_json) => {
      console.log("客户端返回的任务成功信息>>",JSON.parse(_json));
      if(_json === "1"){
          this.initExclusiveList();
      }else if(_json === "2"){
          this.initNewTaskListData();
      }else if(_json === "3"){
          this.initDailyTaskListData();
      }
    }
    // 回调获取客户端返回的任务Tab点击通知---用来刷新每日任务块
    window['AppJSApi_BackH5TaskTabClick'] = (_json) => {
      console.log("客户端返回的任务Tab点击通知>>",_json);
      this.initDailyTaskListData();
    }
  },
  methods:{
    //   获取用户信息
    initUserInfo(){
        AppJsBridge.getUserInfo(param =>{
            if(param){
                // 初始化专属任务-0
                this.initExclusiveList('0');
                setTimeout(() => {
                    // 初始化每日任务
                    this.initDailyTaskListData();
                    // 获取APP本地存储--是否展示快去领取元宝提示
                    AppJsBridge.getStoreInfo('TASK_GETCURY_KEY',backData => {
                        console.log('callback-backData>>',backData);
                        this.showFirstGetCury = backData.data === '1' ? false : true;
                    });
                }, 100);
            }else{
                this.$toast("请重新登录");
            }
        })
    },
    // 专属任务接口
    initExclusiveList(isInit){
      AppJsBridge.initSignData({},'954010',param => {
        this.$http({
          apiType: '2',
          headers: {
              "Content-Type": "application/json"
          },
          url: "/gateway.do",
          data:  param
        })
        .then(res => {
          console.log('---ExclusiveList--',res);
          // 初始化新手任务
          if(isInit === '0'){
            this.initNewTaskListData(isInit);
          }
          if (res.reCode === "0") {
            this.exclusiveList = res.result;
            if(this.exclusiveList.length === 0){
              this.showExclusiveList = false;
            }
          } else {
            this.exclusiveFlag = '1';
            console.log(res.reInfo);
          }
        })
        .catch(e => {
          console.log(e);
          this.exclusiveFlag = '1';
          // 初始化新手任务
          if(isInit === '0'){
            this.initNewTaskListData(isInit);
          }
        });
      });
    },
    getGuideStoreApi(){
      // 获取APP本地存储--是否展示新手引导
      AppJsBridge.getStoreInfo('TASK_GUIDE_KEY',backData => {
        console.log('callback-backData>>',backData);
        this.showGuideStore = backData.data === '1' ? false : true;
        if(this.showGuideStore){
          if(this.exclusiveList.length > 0){
            this.showGuide = 1;
            this.guideType = 0;
            this.goGuideApi();
          }else if(this.exclusiveList.length === 0 && this.newTaskList.length > 0){
            this.showGuide = 1;
            this.guideType = 1;
            // console.log("guide newcomer >>>>"+this.$refs.newComer.offsetTop);
            // window.scrollTo(0,this.$refs.newComer.offsetTop);
            this.goGuideApi();
          }
        }
      });
    },
    goGuideApi(){
      AppJsBridge.guideTask(JSON.stringify({
        navMaskShow: '1',
        navBtnEmpty: '0',
        tabMaskShow: '1',
        taskTabBtnEmpty: '1'
      }));
      this.guideObj.text = '好运宝全新改版！<br/>这里是任务板块，你可以通过完成不同任务 来获取元宝奖励，元宝可用来兑换物品哦~';
      this.guideObj.guidePosition.top = 'initial';
      this.guideObj.guidePosition.bottom = '0rem';
    },
    getCurrency(type,index){
      let task_id = type === '1' ? this.exclusiveList[index].taskId : type === '2' ? this.newTaskList[index].taskId : this.dailyTaskList[index].taskId;
      let num = type === '1' ? this.exclusiveList[index].rewardNum : type === '2' ? this.newTaskList[index].rewardNum : this.dailyTaskList[index].rewardNum;
      AppJsBridge.openIngotsReceiveDlg(task_id,num);
      setTimeout(() => {
        this.closeTip();
        if(type === '1'){
          this.exclusiveList.splice(index, 1);
          if(this.exclusiveList.length === 0){
            this.showExclusiveList = false;
          }
        } else if(type == '3' && this.dailyTaskList[index].taskNowSum == this.dailyTaskList[index].taskNeedSum){
          let _obj = this.dailyTaskList[index];
          this.dailyTaskList.splice(index, 1);
          this.dailyTaskList.push(_obj);
          this.dailyTaskList[index].buttonText="已完成";
          this.dailyTaskList[index].status="3";
        } else if(type == '2'){
          this.newTaskList.splice(index, 1);
          if(this.newTaskList.length === 0){
            this.hasNewTask = false;
          }
        }
      }, 4000)
    },
    // 点击任务按钮
    clickRightBttn(type,index){
        console.log('------任务按钮-');
      console.log(type,index);
      if(this.showGuide && this.showGuide >0){
        return;
      }
      let status = type === '1' ? this.exclusiveList[index].status : type === '2' ? this.newTaskList[index].status : this.dailyTaskList[index].status;
      let _url = type === '1' ? this.exclusiveList[index].jumpUrl : type === '2' ? this.newTaskList[index].jumpUrl : this.dailyTaskList[index].jumpUrl;
      let taskId = type === '1' ? this.exclusiveList[index].taskId : type === '2' ? this.newTaskList[index].taskId : this.dailyTaskList[index].taskId;
      if(status === '2'){ //领取元宝
        this.getCurrencyData(taskId,type,index);
      } else if (status === '3') { //已领取-置灰点击没反应
        return;
      } else { //跳转具体任务链接
        this.goTaskUrl(index,_url);
      }
    },
    // 点击整个栏跳转
    clickUrl(index,status,url){
        console.log('------点击整个栏跳转--------');
      console.log(status,url);
      if(this.showGuide && this.showGuide >0){
        return;
      }
      if(status !== '2' && status !== '3'){
         this.goTaskUrl(index,url);
      }
    },
    // 任务跳转处理
    goTaskUrl(index,jump_url){
      console.log('jump_url>>>>'+jump_url);
      if(jump_url){
          if (jump_url =='-1') {
            // 跳转刷一刷tab
            AppJsBridge.appBackMainTab('REFRESH');
          } else if (jump_url =='-2') {
            //   跳转刷一刷视频详情 传帖子id
            let tid = this.dailyTaskList[index].jumpNote;
            console.log(' 跳转刷一刷视频详情 传帖子id===='+tid);
            AppJsBridge.goVideoTopicDetail(tid);
          }else if(jump_url =='-3'){
            //   跳转任务视频详情
            let id = this.newTaskList[index].taskId;
            console.log('跳转任务视频详情id===='+id);
            this.getVideoInfo(id);
          }else{
              if(jump_url.indexOf('?') < 0 ){
                window.location.href=`${jump_url}?ttt=${new Date().getTime()}&NEW_WVW_HYB`;
              }else{
                window.location.href=`${jump_url}&ttt=${new Date().getTime()}&NEW_WVW_HYB`;
              }
          }
      }
    },
    // 获取视频信息接口
    getVideoInfo(taskId){
        AppJsBridge.initSignData({taskId:taskId}, 954004, param => {
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
                    AppJsBridge.taskOpenVideoDetails(res.result[0]);
                } else {
                    this.$toast(res.reInfo);
                }
            })
            .catch(e => {
                console.log(e);
            });
      });
    },
    closeTip(){
      this.showFirstGetCury = false;
      AppJsBridge.storeInfo('TASK_GETCURY_KEY','1');
    },
    guideTo(num){ //新手引导
      if(num === 3 && this.guideType > 0){
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
    },
    goVideoList(){  //新手任务挑战
        window.location.href=`${Const.APP_RUL}hyb_task_h5/dist/index.html?t=${new Date().getTime()}/#/task/taskVideoList?&NEW_WVW_HYB`;
    },
    // 新手任务接口
    initNewTaskListData(isInit) {
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
          console.log('---initNewTaskListData--',res);
          this.loadingFlag = false;
          if (res.reCode === "0") {
            this.newTaskList=res.result;
            if(this.newTaskList.length === 0){
              this.hasNewTask = false;
            }
          } else {
            this.newTaskFlag = '1';
            console.log(res.reInfo);
          }
          if(isInit === '0'){
            this.getGuideStoreApi();
          }
        })
        .catch(e => {
          console.log(e);
          this.loadingFlag = false;
          this.newTaskFlag = '1';
          if(isInit === '0'){
            this.getGuideStoreApi();
          }
        });
      });
    },
    // 每日任务接口
    initDailyTaskListData() {
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
          console.log('---initDailyTaskListData--',res);
          this.loadingFlag = false;
          if (res.reCode == "0") {
            this.dailyTaskList = res.result.taskList;
            if(this.dailyTaskList.length === 0){
              this.hasDailyTask = false;
            }
          } else {
            this.dailyTaskFlag = '1';
            console.log(res.reInfo);
          }
        })
        .catch(e => {
          console.log(e);
          this.loadingFlag = false;
          this.dailyTaskFlag = '1';
        });
      });
    },
    // 领取元宝接口
    getCurrencyData(taskId,type,index){
        // taskType  0 专属  1 新手  2每日
        console.log('taskId:'+taskId+',type:'+type+',index:'+index);
        AppJsBridge.initSignData({taskId:taskId,taskType:Number(type)-1+''}, 954011, param => {
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
                    this.getCurrency(type,index);
                } else {
                    this.$toast(res.reInfo);
                }
            })
            .catch(e => {
                console.log(e);
            });
      });
    }
  }
}
</script>

<style lang="less" scoped>
.wapperTask {
  min-height: 100vh;
  background-color: #E8E8E8;
  overflow: scroll;
}
.wapperTask .van-skeleton {
    margin-top: 1.85rem;
}
.wapperTask .van-skeleton__title {
    height: 1.25rem;
}
.wapperTask .van-skeleton__row {
    width: 90% !important;
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
  .task-server-failed {
    padding: 1.1875rem .875rem;
    width: initial;
  }
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
    transition: all 1s;
    &:nth-last-child(n+2) { 
      border-bottom: .0625rem solid #E8E8E8;
    }
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
            bottom: .1rem;
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
      .bttn-success {
        background: linear-gradient(90deg,rgba(255,94,23,1),rgba(254,52,45,1));
        box-shadow: 0rem .3125rem .625rem 0rem rgba(255,52,47,0.3);
        color: #fff;
      }
    }
    .task-btn-view {
      background: #fff2f2;
      border-radius: 0.125rem;
      text-align: center;
      position: absolute;
      top: 3.75rem;
      right: 0.875rem;
      div {
        font-size: 0.75rem;
        transform: scale(0.9);
        color: #D11414;
        padding: 0 .175rem;
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
        line-height: 1.29rem;
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
            line-height: 1.115rem;
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
  .sj-tag{
    width: 8.375rem;
    height: 1.625rem;
    line-height: 1.5825rem;
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
}
// tf
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
    .tasks-title{
        height: 3.625rem;
        background: rgba(251,251,251,1);
        padding-left: 1rem;
        .font(1.1875rem,#000000,3.625rem);
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
        .task-wrapper-div{
            position: relative;
            margin-left: 1rem;
            border-bottom:0.0625rem solid #E8E8E8 ;
        }
    }
    .task-box{
        min-height: 2.75rem;
        //  padding-right: 0.625rem;
         padding: 1.1875rem 0.625rem 1.1875rem 0;
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
        .task-guide-four{
          top: 50%;
          margin-top: 0.9rem;
        }
        .tasks-main{
            flex: 1;
            .task-main-title{
                .space-flex(flex-start);
                .font(1.125rem, #000000, 1.25rem);
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
            position: relative;
            .task-btn{
                width: 5.1875rem;
                height: 1.9375rem;
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
                text-align: center;
                position: absolute;
                top: 2.25rem;
                right: 0;
                // .font(0.75rem,#D11414,1.0625rem);
                &>div{
                    font-size: 0.75rem;
                    transform: scale(0.9);
                    color: #D11414;
                }
            }
            .sj-tag {
                top: -2.2rem;
                right: 0;
            }
            .guideQuan2 {
              background-color: #fff;
              border-radius: 60%;
              z-index: 9990;
              padding: 0.6875rem;
              right: .225rem;
              // top: 0.8rem;
              top: 50%;
              margin-top: -1.75rem;
              position: absolute;
            }
        }
    }
    .new-task-card{
        width: 100%;
        box-sizing: border-box;
        padding: 0 1.625rem 0 0.625rem;
        margin-bottom: 1.125rem;
        margin-top: -0.6875rem;
        text-align: center;
        .space-flex(space-between);
        &>div{
            &>div{
                margin: 0 auto 0.25rem;
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
                right: -0.9375rem;
            }
            .long-line{
                width:7.5rem;
                z-index: 7;
            }
            .long-a{
                left: -1.9375rem;
            }
            .long-b{
                left: 6.0625rem;
            }
            .long-c{
                left: -1.9375rem;
            }
            .active-line{
             background: rgba(134,233,204,1);
        }
        }
        
        .new-task-status-to{
            position: relative;
            z-index: 9;
            width:2.875rem;
            height:2.875rem;
            background:rgba(255,255,255,1);
            border:1px solid rgba(232,232,232,1);
            border-radius:50%;
            box-sizing: border-box;
            margin: 0 auto;
            .space-flex();
            &>div{
                width:2.625rem;
                height:2.625rem;
                background:rgba(232,232,232,1);
                border-radius:50%;
                .space-flex();
                &>div{
                    font-size:0.875rem;
                    line-height: 1.0625rem;
                    font-weight:bold;
                    color:rgba(108,108,108,1);
                    & img{
                        width:1rem;
                        height:0.625rem;
                    }
                }
            }
        }
        .new-task-status-done{
            position: relative;
            z-index: 9;
            width: 2.875rem;
            height: 2.875rem;
            background: rgba(134,233,204,1);
            border-radius: 50%;
            margin: 0 auto;
            .space-flex();
            &>div{
                width: 2.625rem;
                height: 2.625rem;
                background: rgba(79,211,172,1);
                border-radius: 50%;
                .space-flex();
                &>img{
                    width: 1.0625rem;
                    height: 0.75rem;
                }
            }
        }
    }

</style>
