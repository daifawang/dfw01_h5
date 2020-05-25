import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/font/iconfont.css'
import FastClick from 'fastclick'
import Confirm from '@/components/confirm'
import './assets/js/rem'
import Utils from './assets/js/utils'

Vue.use(Utils)
Vue.$confirm = Vue.prototype.$confirm = Confirm.ConfirmOpen
Vue.config.productionTip = false
FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

if (process.env.VUE_APP_ENV !== 'production') {
  require.ensure([], function (require) {
    const Consolea = require('vconsole/dist/vconsole.min.js')
    new Consolea()
  })
  setTimeout(() => {
    console.log(location.href)
  }, 3000)
}

if (process.env.VUE_APP_ENV === 'development') {
  document.cookie =
    'token=E2A63658C5B61D3EF404175429381C760C0A363B0F8571CFF050C93BAD8D296F'
}

router.beforeEach(function (to, from, next) {
  console.log('store.state.routerFlag', store.state.routerFlag)
  if (!store.state.routerFlag) {
    // 禁用路由返回，保存到vuex内的
    next(false)
  } else {
    next()
  }
})
