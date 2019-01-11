// 公共api
import request from '@/utils/request'
import url from './url'
// 获取短信验证码
export function get_smscode(target) {
  return request({
    url: url.get_smscode,
    params: target
  })
}
// 获取图片验证码
export function get_verifyCode(target) {
  return request({
    url:url.get_verifyCode,
    params: target
  })
}
