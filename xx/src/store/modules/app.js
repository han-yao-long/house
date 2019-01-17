import { getCode, setCode } from '@/utils/auth'
import {cookie} from '@/utils/cache'
import {urlMsg,appId,userId,articleId} from '@/utils/common'
import url from '@/api/url'
var u = navigator.userAgent;
var ua = window.navigator.userAgent.toLowerCase();
// 统一版本路径配置
let imgIp=''
if (window.location.hostname == 'test-card.zuanliantech.com'){
    imgIp = url.devIp
}else if(window.location.hostname == 'pre.wehaicao.com'){
    imgIp = url.prodIp
}else{
    imgIp = url.prodIp
};
const app={
  state:{
    isAndroid:u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // 设备机型
    isIOS:!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // 浏览器类型
    isWeChat : ua.match(/MicroMessenger/i) == "micromessenger",  // 是否是微信
    imgIp:imgIp, // 路径配置
    // imgIp:'http://10.3.201.6:8888',
    // appId:appId(),
    // code:urlMsg().code,
    // userId:userId(),
    // articleId:articleId(),
    publicKey:'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+erZj3EmG+FHdOcCGt1JJqpoz7ZPzDGB1ZvmMAMtbGF8RRRwNfglA6no/kF3ZYGmsP+ykT4LzbKdFX0xOUptuKaFm7eHRhYwSQbF7s+QrsD5g+hSmh/Ylpk4jJJvCd1vGGSxlr6tn50zHRZTX0QJt2zp0AymvjpMemwd70VWwpAOtX2tZ7rrLuwV+vgq+xuhMFe9KURedVKGflka8p7dDmhzHqa62EAr6McrGFtOhhYBIIMCafo53Mzp0Dv4DINSfDd6bfu9OJyu5U4ZswNgXyciro2fgK3/PnF7HRcMSGkl85B3kh1TPQI8TevY4f6jb+ovA+hCG/9MrE+T/CABbQIDAQAB' // 全局秘钥
  },
  mutations:{
    SET_CODE(state,code){
      state.code = code
      setCode(code)
    }
  },
  actions:{
    setCode({commit},data){
      commit('SET_CODE',data)
    }
  }
}
export default app
