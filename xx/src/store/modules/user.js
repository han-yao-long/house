import { login } from '@/api/auth'
import { getToken, setToken } from '@/utils/auth'
import {cookie} from "@/utils/cache";
import {MessageBox } from 'mint-ui'

const user = {
  state: {
    token: getToken(),
    userInfo:{},
    sharerUserId:cookie.get('sharerUserId')||'', // 用户id
    bindingPhone:cookie.get('bindingPhone')||'', // 是否绑定手机号
    bindingPublic:cookie.get('bindingPublic')||'', // 是否关注公众号
  },

  mutations: {
    SET_TOKEN: (state, data) => {
      state.token = data.token
      setToken(data.token)
    },
    SET_INFO: (state, data) => {
      state.sharerUserId = data.id
      cookie.set('sharerUserId',data.id)
      state.bindingPhone = data.bindingPhone
      cookie.set('bindingPhone',data.bindingPhone)
      state.bindingPublic = data.bindingPublic
      cookie.set('bindingPublic',data.bindingPublic)
    }
  },

  actions: {
    Login({commit},data) {
      return login(data).then(res => {
        if (res.code == '200') {
          commit('SET_TOKEN', res.data)
          commit('SET_INFO', res.data)
        } else {
          MessageBox.alert(res.message)
          return false
        }
      })
    }
  }
}

export default user
