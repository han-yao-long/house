import router from './router'
// 引入ui插件
import {
  MessageBox
} from 'mint-ui'
import {
  getToken
} from '@/utils/auth' // 验权
import store from './store' // 统一信息管理
import {
  wxAuth
} from "@/utils/common"
const whiteList = ['/login', '/grass_book_share', '*'] // 不重定向白名单（不需要在微信内打开）
router.beforeEach((to, from, next) => {
  if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    if (store.getters.app.isWeChat) {
      next()
    } else {
      MessageBox.alert('请在微信内打开')
      return false
    }
  }

})

router.afterEach(() => {

})
