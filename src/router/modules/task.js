//任务模组 task
const task = () => import('@/pages/task/task.vue')
const taskIndex = () => import('@/pages/task/taskIndex.vue') //任务首页
const taskVideoList = ()=> import('@/pages/task/taskVideoList') //新手攻略
const myCurrency = ()=> import('@/pages/task/myCurrency') //我的元宝
const myCurrencyRule = ()=> import('@/pages/task/myCurrencyRule') //我的元宝规则
const dailyTask = ()=> import('@/pages/task/dailyTask') //每日任务

export default [
  {
    path: '/task',
    name: 'task',
    component: task,
    children: [{
        path: 'taskIndex',
        name: 'taskIndex',
        component: taskIndex,
        meta:{
          title:'任务'
        }
      },
      {
        path: 'taskVideoList',
        name: 'taskVideoList',
        component: taskVideoList,
        meta:{
          title:'新手攻略'
        }
      },
      {
        path: 'myCurrency',
        name: 'myCurrency',
        component: myCurrency,
        meta:{
          title:'我的元宝'
        }
      },
      {
        path: 'myCurrencyRule',
        name: 'myCurrencyRule',
        component: myCurrencyRule,
        meta:{
          title:'元宝规则'
        }
      }
      ,
      {
        path: 'dailyTask',
        name: 'dailyTask',
        component: dailyTask,
        meta:{
          title:'每日任务'
        }
      }
    ]
  } 
]