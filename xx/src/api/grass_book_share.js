// 公共api
import request from '@/utils/request'
import url from './url'
// 获取猜拳用户信息状态game_guess_thumb
export function msginit(target) {
  return request({
    url:url.grass_book_share,
    method:'get',
    params:target
  })
}
