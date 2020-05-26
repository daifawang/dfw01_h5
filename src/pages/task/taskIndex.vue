<template>
    <div id="taskTemp" class="wapperTask">
      <van-skeleton title avatar :row="2" avatar-shape="square" :loading="loadingFlag1">
        <div>任务列表1...</div>
        <div @click="toastD()">ddd</div>
      </van-skeleton>
      <van-skeleton title avatar :row="3" avatar-shape="square" :loading="loadingFlag2">
        <div>任务列表2...</div>
        <div @click="toastD()">ddd</div>
      </van-skeleton>
      <van-skeleton title avatar :row="4" avatar-shape="square" :loading="loadingFlag3">
        <div>任务列表3...</div>
        <div @click="toastD()">ddd</div>
      </van-skeleton>
    </div>
</template>
<script>
import Const from "@/assets/js/const" 
export default {
    data() {
        return {
          loadingFlag1: true,
          loadingFlag2: true,
          loadingFlag3: true
        }
    },
    created() {
        document.title = '哈哈成功';
        this.initMedth();
    },
    mounted() {
      setTimeout(() => {
        this.loadingFlag1 = false;
      }, 2000)
    },
    methods:{
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
      goServer(){
        console.log('333');
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
#taskTemp {
  height: 100vh;
  box-sizing: border-box;
  background-color: #E8E8E8;
  overflow: scroll;
}
#taskTemp .van-skeleton {
    margin-top: 1.85rem;
}
</style>
