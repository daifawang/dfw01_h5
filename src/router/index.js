import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/pages/HelloWorld.vue'
import task from './modules/task' /*task模组引入*/
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: '',
    component: HelloWorld
  },
  ...task
]
const router = new VueRouter({
  routes,
  // 在点击浏览器的“前进/后退”，或者切换导航的时候触发
  // to：要进入的目标路由对象，到哪里去
  // from：离开的路由对象，哪里来
  // savePosition：会记录滚动条的坐标，点击前进/后退的时候记录值{x:?,y:?}
  scrollBehavior(to, from, savedPosition) {
      // keep-alive 返回缓存页面后记录浏览位置
      if (savedPosition && to.meta.keepAlive) {
        return savedPosition;
      }
      // 异步滚动操作
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ x: 0, y: 1 });
        }, 0);
      });
  }
})
/****
 * 路由加载前回调函数处理场景问题
 */
router.beforeEach((to, from, next) => {
  next();
})
router.beforeResolve((to, from, next) => {
  next();
})
export default router
