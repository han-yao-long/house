// 公共api
import request from '@/utils/request'
import url from './url'
// 加团支付
export function join_group_pay(target) {
  return request({
    url: url.join_group_pay,
    method: 'post',
    data: target
  })
}
// 加团
export function join_group(target) {
  return request({
    url: url.join_group,
    method: 'post',
    data: target
  })
}
//   猜拳团长信息
export function roup_leader(target) {
  return request({
    url: url.game_group_leader,
    method: 'get',
    params: target
  })
}
// 获取拼团详情页面信息
export function join_get_group_manage(target) {
  return request({
    url: url.join_get_group_manage,
    method: 'get',
    params: target
  })
}
