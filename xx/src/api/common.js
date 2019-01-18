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
// 获取oppen_id
export function wx_token(target) {
    return request({
      url:url.wxtoken,
      params: target
    })
  }
//   获取签名
export function sign(target) {
    return request({
      url: url.sign,
      method: 'post',
      data: target
    })
  }
//   图片上传
export function upload_imagess(target) {
    return request({
      url: url.upload_images,
      method: 'post',
      data: target
    })
  }
//   获取地址
export function addresss(target) {
    return request({
      url: url.address,
      params: target
    })
  }
export function win_prizess(target) {
    return request({
      url: url.win_prizes,
      method: 'post',
      data: target
    })
  }
  export function show_imagess(target) {
    return request({
      url: url.show_images,
      params: target
    })
  }


