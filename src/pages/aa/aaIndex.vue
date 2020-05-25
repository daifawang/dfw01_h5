<template>
    <div class="success">
        <div class="img-box">
            <img src="https://imgt.log56.com/sq_server/otherimg/pic_zhengchang.png" alt="">
        </div>
        <div class="text-box">
            <h4>哈哈成功 ！</h4>
            <p>感谢卡友的哈哈，工作人员将在1~3天也哈哈</p>
        </div>
        <div @click="goServer()">点试试~</div>
    </div>
</template>
<script>
import Const from "@/config/const" 
export default {
    data() {
        return {
        }
    },
    created() {
        document.title = '哈哈成功'
    },
    methods:{
        goServer(){
          console.log('333');
          this.$http({
              url:'/tsp/ans/html/post/v1/getQuestions?t='+new Date().getTime(),
              data:{
                  data:{}
              }
          })
          .then((res) => {
              console.log(res);
              if(res.result.req_code === Const.serverCode.SUCCESS_CODE_200){
                  console.log('success');
              }else{
                  console.log(res.result.reInfo);
              }
          })
          .catch((error) => {
              console.log("更新数据异常:"+error);
          }); 
        }
    }
}
</script>

<style scoped>
.success {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #fff;
}
.img-box {
  width: 28.6%;
  margin: 60px auto 16px;
}
.img-box img {
  width: 100%;
}
.text-box {
  width: 100%;
  text-align: center;
}
.text-box h4 {
  font-size: 18px;
  font-family: Droid Sans Fallback;
  color: rgba(36, 36, 36, 1);
}
.text-box p {
  font-size: 15px;
  font-family: Droid Sans Fallback;
  color: rgba(108, 108, 108, 1);
  line-height: 35px;
}
</style>
