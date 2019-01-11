// 权限信息
import {cookie} from "./cache";

// const authToken = null
// 用户token
export function getToken() {
  return cookie.get('authToken')
}

export function setToken(token) {
  return cookie.set('authToken',token)
}
// 微信code
export function getCode() {
  return cookie.get('code')
}

export function setCode(code) {
  return cookie.set('code',code)
}
