/*
 * 封装 axios
 */

import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'

const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/', // 基础路径
  transformResponse: [
    function(data) {
      try {
        return JSONbig.parse(data)
      } catch (err) {
        // 非 JSON 格式的字符串，直接返回即可
        return data
      }
    }
  ]
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response
  },
  function(error) {
    const status = error.response.status
    if (status === 400) {
      Toast.fail('客户端请求参数错误')
    } else if (status === 401) {
      // 无效的 TOKEN
      Toast.fail('无效的TOKEN')
    } else if (status === 403) {
      Toast.fail('客户端没有权限')
    } else if (status === 404) {
      Toast.fail('请求资源不存在')
    } else if (status === 405) {
      Toast.fail('请求方法不支持')
    } else if (status >= 500) {
      Toast.fail('服务器抽风了')
    }
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default request
