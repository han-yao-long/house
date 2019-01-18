import axios from 'axios'
import { getToken, setToken, removeToken } from '@/utils/auth'
import {wxAuth} from "@/utils/common"
// 引入ui插件
import {Toast} from 'mint-ui'
// code字典配置
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  400: '请求出现语法错误,一般是请求参数不对。',
  401: '未授权，请重新登录',
  403: '资源不可用',
  404: '无法找到指定位置的资源',
  405: '请求方法未允许',
  408: '请求超时',
  500: '服务器内部错误,请联系Java后台开发人员!!!',
  501: '网络未实现。',
  502: '网络错误',
  503: '服务不可用',
  504: '网络超时',
  505: 'http版本不支持该请求'
};
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 20000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
  config.headers={
    'Content-Type':'application/json;charset=UTF-8',
    'token':getToken() // 入参统一添加token
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const code = response.status
    if (code !== 200) {
      Toast(codeMessage[response.status]||`连接错误${response.status}`)
    } else {
      if (response.data.code == 200) {
        // 获取验证码图片单独处理
        if(response.headers.verifycodekey){
          response.data.verifyCodeKey=response.headers.verifycodekey
        }
        return response.data
      } else {
        if(response.data.code=='9017035'||response.data.code=='9017033'){
          // this.$toast({
          //   message: '您需要先前往APP进行提现认证'
          // });
        }else {
          switch (response.data.code){
            case 700||701||700:
              //    微信在其他地方登陆
              setTimeout(function(){
                // wxAuth();
                console.log('获取微信code')
              },3000)
              break;
          }
          Toast(response.data.msg)
        }
        // return false
        return response.data
      }
    }
  },
  error => {
    error.message=codeMessage[error.response.status]||`连接错误${error.response.status}`
    console.log('err' + error)// for debug
    return Promise.reject(error)
  }
)

export default service
