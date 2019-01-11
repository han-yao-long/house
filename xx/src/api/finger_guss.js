// 公共api
import request from '@/utils/request'
import url from './url'
// 获取猜拳用户信息状态game_guess_thumb
export function guess_status(target) {
  return request({
    url:url.game_guess_status,
    method:'get',
    params:target
  })
}
// 猜拳点赞
export function guess_thumb(target) {
    return request({
      url:url.game_guess_thumb,
      method:'get',
      params:target
    })
  }

