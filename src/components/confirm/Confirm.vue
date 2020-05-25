<template>
  <div v-if="show_flag">
    <div class="alert-bg" @click="closePop"></div>
    <transition name="confirm-bounce">
      <div class="alert-content-cxt" v-show="show_flag">
        <img
          v-if="img_url.length > 0"
          :src="img_url"
          class="alert-head-bg"
          alt=""
        />
        <img
          v-else
          src="../../assets/images/chaoren@2x.png"
          class="alert-head-bg"
          alt=""
        />
        <div class="alert-content">
          <i v-if="type === 3" class="iconfontetc icon-txchenggong"></i>
          <div v-if="type === 3 || type === 1" class="alert-text-title">
            {{ confirm_title_text }}
          </div>
          <div
            v-if="textAlign === 'left'"
            class="alert-text-content left_content"
            v-html="confirm_text"
          ></div>
          <div
            v-else-if="textAlign === 'right'"
            class="alert-text-content right_content"
            v-html="confirm_text"
          ></div>
          <div v-else class="alert-text-content" v-html="confirm_text"></div>
          <div class="alert-btn-operate">
            <div
              v-if="type === 1 || type === 3"
              class="aler-sure-btnA"
              @click="confirm()"
            >
              {{ confirm_btn_text }}
            </div>
            <div v-if="type === 2">
              <div class="aler-del-btn" @click="cancel()">
                {{ cancel_btn_text }}
              </div>
              <div class="aler-btn-verticalLine"></div>
              <div class="aler-sure-btnB" @click="confirm()">
                {{ confirm_btn_text }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show_flag: 0,
      confirm_text: '我是一个弹框',
      confirm_btn_text: '确定',
      cancel_btn_text: '取消',
      type: 1,
      textAlign: '', // 内容对齐方式
      img_url: '', // 是否需要更换图片,为空则为不需要更换
      is_can_bg_close_flag: '1' // 是否可以点击背景关闭当前窗口，默认是可以
    }
  },
  created () {},
  methods: {
    confirm () {
      console.log('我是点击确认按钮')
    },
    cancel () {
      console.log('我是点击确认按钮')
    },
    closePop () {
      if (this.is_can_bg_close_flag !== '1') {
        return false
      }
      var btn = this.$el.querySelector('.alert-content')
      if (btn) {
        if (!btn.contains(event.target)) {
          this.show_flag = 0
        }
      }
    }
  },
  mounted () {}
}
</script>
<style scoped>
/* 弹框和输入弹框的独立样式start*/
.alert-bg {
  width: 100%;
  height: 200%;
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.7;
  z-index: 9999;
}

.alert-content-cxt {
  text-align: center;
  position: fixed;
  z-index: 10000;
  transform: translate(-50%, -50%) scale(1);
  -webkit-transform: translate(-50%, -50%) scale(1);
  -ms-transform: translate(-50%, -50%) scale(1);
  -moz-transform: translate(-50%, -50%) scale(1);
  top: 46%;
  left: 50%;
  animation: confirm-zoom 0.3s;
}

.alert-head-bg {
  width: 3.375rem;
  position: relative;
  top: 0.875rem;
}

.alert-content {
  width: 20rem;
  /* width: calc(100% - 40px);
  margin-left: 20px; */
  min-height: 6.25rem;
  height: auto;
  background-image: linear-gradient(-78deg, #fff, #f9f9f9);
  background-image: -moz-linear-gradient(-78deg, #fff, #f9f9f9);
  background-image: -webkit-linear-gradient(-78deg, #fff, #f9f9f9);
  border-radius: 0.3125rem;
}

.alert-text-content {
  width: 18.4375rem;
  height: 3.1875rem;
  font-size: 0.9375rem;
  line-height: 1.5rem;
  color: #222;
  text-align: center;
  text-overflow: ellipsis;
  padding: 1rem 0.625rem;
  vertical-align: middle;
  display: table-cell;
  box-sizing: content-box;
}
.left_content {
  text-align: left;
}
.right_content {
  text-align: right;
}

/* 弹框和输入弹框的独立样式end */

/* 弹框和输入弹框的公用样式start */
.alert-btn-operate {
  width: 100%;
  height: 2.625rem;
  border-top: 1px solid #eee;
  line-height: 2.5625rem;
  text-align: center;
  font-size: 1rem;
}

.aler-sure-btnB,
.aler-del-btn {
  width: 48%;
}

.aler-sure-btnB {
  float: right;
  color: orangered;
}

.aler-sure-btnA {
  width: 100%;
  color: orangered;
}

.aler-del-btn {
  float: left;
  color: #9e9e9e;
}

.aler-btn-verticalLine {
  width: 1px;
  height: 2.5625rem;
  float: left;
  background-color: #eee;
}

/* 弹框和输入弹框的公用样式end */
.confirm-bounce-enter {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.7);
}

.confirm-bounce-leave-active {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.9);
}

.iconfontetc {
  color: #f45439;
  font-size: 5.1875rem;
}

.alert-text-title {
  color: #242424;
  font-size: 1.25rem;
  padding-top: 1.25rem;
}
</style>
