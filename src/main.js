import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./plugins/vant.js";
import './assets/font/iconfont.css'
import FastClick from 'fastclick'
import Confirm from '@/components/confirm'
import './assets/js/rem'
import Utils from './assets/js/utils'
import Server from './assets/js/ajax'
import "vant/lib/index.css";

Vue.use(Utils)
// 绑定axios组件
Vue.use(Server)
Vue.$confirm = Vue.prototype.$confirm = Confirm.ConfirmOpen
Vue.config.productionTip = false
FastClick.attach(document.body)
FastClick.prototype.focus = function (targetElement) {
  let length
  if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length
    targetElement.focus()
    targetElement.setSelectionRange(length, length)
  } else {
    targetElement.focus()
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

if (process.env.VUE_APP_ENV !== 'testing' && process.env.VUE_APP_ENV !== 'production') {
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

