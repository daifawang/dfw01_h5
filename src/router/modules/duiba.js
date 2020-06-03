//任务模组 duiba
const duiba = () => import('@/pages/duiba/duiba.vue')
const coinDuiba = () => import('@/pages/duiba/coin_duiba.vue')
export default [{
    path: '/duiba',
    name: 'duiba',
    component: duiba,
    children: [{
        path: 'coinDuiba',
        name: 'coinDuiba',
        component: coinDuiba,
        meta: {
            title: '元宝商城'
        }
    }]
}]