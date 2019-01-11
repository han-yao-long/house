import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/finger_guss',
      component: () => import('@/views/finger_guss/index')
    }, //这里是猜拳
    {
      path: '/init',
      component: () => import('@/views/init/index')
    },
    {
      path: '/joinNew',
      component: () => import('@/views/hp_pull_new/joinNew')
    }, // 拉新注册页面
    {
      path: '/orderShare',
      component: () => import('@/views/hp_pull_new/orderShare')
    }, // 订单分享（分享）
    {
      path: '/readShare',
      component: () => import('@/views/hp_pull_new/readShare')
    }, // 阅读分享（分享）
    {
      path: '*',
      component: () => import('@/views/404')
    }, // 404页面
    {
      path: '/hp_pull_new_wxpay',
      component: () => import('@/views/hp_pull_new/hp_pull_new_wxpay.vue')
    }, //这是海拼邀新购物拼得一分钱支付
    {
      path: '/hp_anther_isScuess',
      component: () => import('@/views/hp_pull_new/hp_anther_isScuess.vue')
    }, //这是海拼邀新购物拼得一分钱支付
    {
      path: '/hp_read_share',
      component: () => import('@/views/hp_pull_new/hp_read_share.vue')
    },
    //草书分享
    {
      path: '/grass_book_share',
      component: () => import('@/views/grass_book_share/index.vue')
    }
  ]
})
