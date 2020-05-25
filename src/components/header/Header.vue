<template>
  <div class="header_box">
    <div style="padding-top: 2.8125rem;">
      <div class="header">
        <div class="back" @click="back" v-if="showBack">
          <i class="iconfont icon-arrow-left"></i>
        </div>
        <p class="title">{{ title }}</p>
        <div class="btn_right"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {}
  },
  props: {
    title: {
      default: '卡友地带'
    },
    backFn: {
      type: Function
    },
    showBack: {
      type: Boolean,
      default: true
    }
  },
  mounted () {},
  methods: {
    back () {
      if (this.backFn) {
        this.backFn()
      } else {
        this.$router.back()
      }
    }
  }
}
</script>

<style lang="scss">
.header_box {
  .header {
    position: fixed;
    top: 0;
    height: 2.8125rem;
    display: flex;
    justify-content: space-between;
    line-height: 2.8125rem;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #e3e3e3;
    .back {
      width: 2.375rem;
      padding-left: 0.8125rem;
      .iconfont {
        font-size: 1.25rem;
        color: #313233;
      }
    }
    .title {
      font-size: 1.0625rem;
      color: #313233;
    }
    .btn_right {
      width: 2.375rem;
      padding-right: 0.8125rem;
    }
  }
}
</style>
