import axios from 'axios'
import store from '@/store'
import { MessageBox, Message } from 'element-ui'
import SettingMer from './settingMer'
const service = axios.create({
  baseURL: SettingMer.apiBaseURL,
  timeout: 60000 // 过期时间
})

service.interceptors.request.use((config) => {
  // 发送请求之前做的
  const token = !store.getters.token ? sessionStorage.getItem('token') : store.getters.token
  if (token) {
    config.headers['Authori-zation'] = token
  }
  if (/get/i.test(config.method)) {
    config.params = config.params || {}
    config.params.temp = Date.parse(new Date()) / 1000// 时间戳
  }
  return config
},
error => {
  return Promise.reject(error)
})

/**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

/**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 401) {
      MessageBox.confirm('您已经登出，您可以取消停留在这个页面，或重新登录', '退出', {
        confirmButtonText: '或重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }
    if (res.code !== 200 && res.code !== 401) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject()
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.data
    }
  }
)

export default service
