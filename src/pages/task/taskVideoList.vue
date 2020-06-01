<template>
  <div class="task-video">
    <div class="video-wrapper" v-for="(item,index) in videoList" :key="index"
      :style="{backgroundImage:'url('+item.coverUrl+')'}">
      <div class="video-title">快速玩转任务了</div>
      <img src="../../assets/images/task/bofang@2x.png">
      <div class="video-time">3:00</div>
    </div>
  </div>
</template>
<script>
import { AppJsBridge, hybappObj } from "@/assets/js/hybApp_api.js";
export default {
  data() {
    return {
      videoList: [
        {
          coverUrl:
            "https://live-ol-cdn.log56.com/nsq/topics/20191115/e682abae-e1e7-4732-a10c-394e0221fa15.jpg"
        },
        {
          coverUrl:
            "https://live-ol-cdn.log56.com/nsq/topics/20191115/e682abae-e1e7-4732-a10c-394e0221fa15.jpg"
        },
        {
          coverUrl:
            "https://live-ol-cdn.log56.com/nsq/topics/20191115/e682abae-e1e7-4732-a10c-394e0221fa15.jpg"
        }
      ]
    };
  },
  created() {},
  mounted() {
      this.initData();
  },
  methods: {
    initData() {
      AppJsBridge.initSignData({}, 954004, param => {
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
};
</script>
<style lang="less" scoped>
.task-video {
  width: 100%;
  height: auto;
  background: #ffffff;
}
.video-wrapper {
  width: 100%;
  height: 13rem;
  background: rgba(0, 0, 0, 1);
  background-size: cover;
  position: relative;
  margin-bottom: 0.3125rem;
  .video-title {
    font-size: 1.1875rem;
    color: #ffffff;
    position: absolute;
    left: 1rem;
    top: 0.625rem;
  }
  & > img {
    width: 1.8125rem;
    height: 1.8125rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .video-time {
    width: 2.9375rem;
    height: 1.3125rem;
    line-height: 1.3125rem;
    text-align: center;
    background: rgba(0, 0, 0, 1);
    opacity: 0.4;
    border-radius: 6.25rem;
    position: absolute;
    right: 0.625rem;
    bottom: 0.625rem;
    font-size: 0.8125rem;
    color: #ffffff;
  }
}
</style>