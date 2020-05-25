import Vue from 'vue'
import confirm from './Confirm.vue'
const ConfirmConstructor = Vue.extend(confirm)
let instance
export default {
  ConfirmOpen (options = {}) {
    if (!instance) {
      instance = new ConfirmConstructor().$mount(document.createElement('div'))
    }
    instance.show_flag = 1
    instance.type = options.type || 1
    instance.confirm_title_text = options.confirm_title_text
    instance.confirm_text =
      typeof options === 'string'
        ? options
        : options.confirmText || '我是一个弹框'
    instance.confirm_btn_text = options.rightText || '确定'
    instance.cancel_btn_text = options.leftText || '取消'
    instance.is_can_bg_close_flag = options.is_self_close_flag || '1'
    instance.img_url = options.img_url || ''
    instance.textAlign = options.textAlign || ''
    document.body.appendChild(instance.$el)
    instance.confirm = () => {
      document.body.removeChild(instance.$el)
      if (
        typeof options.confirmFn !== 'undefined' &&
        typeof options.confirmFn === 'function'
      ) {
        options.confirmFn()
      } else {
        console.log('弹框确认按钮没有回调按钮')
      }
    }
    instance.cancel = () => {
      document.body.removeChild(instance.$el)
      if (
        typeof options.cancelFn !== 'undefined' &&
        typeof options.cancelFn === 'function'
      ) {
        options.cancelFn()
      } else {
        console.log('弹框取消按钮没有回调按钮')
      }
    }
  },
  ConfirmClose () {
    if (instance) {
      instance.show_flag = 0
    }
  }
}
