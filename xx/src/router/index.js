import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/countDown',
      component: () => import('@/views/countDown/index')
    }, //这里是猜拳
    {
      path: '/init',
      component: () => import('@/views/init/index')
    },
    {
      path: '/gassgame',
      component: () => import('@/views/gassGame/index')
    },
    {
      path: '*',
      component: () => import('@/views/404')
    }, // 404页面
  ]
})
