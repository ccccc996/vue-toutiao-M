/*
 * 用户相关的请求模块
 */

import request from '@/utils/request'
import store from '@/store'

export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user',
    // 携带请求头信息
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}
