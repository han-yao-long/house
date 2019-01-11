// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' // 路由
import store from './store' // 统一信息管理
// import '@/permission' // 权限校验控制
import '@/utils/filter'
// 引入ui插件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/styles/index.less' // 全局 css
import 'swiper/dist/css/swiper.css';
Vue.config.productionTip = false
// console.log(store)
Vue.use(MintUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
