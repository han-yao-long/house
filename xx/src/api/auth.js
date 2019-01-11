// 权限认证api
import request from '@/utils/request'
import url from './url'
// 登录获取token
export function login(keywords) {
  let data = keywords
  return request({
    url: url.login,
    data,
    method: 'post',
  })
}

// 获取用户信息
export function get_user(keywords) {
  let data = {

  }
  return request({
    url: url.get_user,
    data,
    method: 'post',
  })
}

// 获取账户详情
export function get_account(keywords) {
  let data={
  }
  return request({
    url:url.get_account,
    data,
    method:'post'
    })
}

//
