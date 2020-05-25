//xx模组
const aa = () => import('@/pages/aa/aa.vue')
const aaIndex = () => import('@/pages/aa/aaIndex.vue')
export default [
  {
    path: '/aa',
    name: 'aa',
    component: aa,
    children: [{
        path: 'aaIndex',
        name: 'aaIndex',
        component: aaIndex,
        meta:{
          title:'aa-index'
        }
      }
    ]
  } 
]